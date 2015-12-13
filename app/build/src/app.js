var App = (function () {
    function App() {
        this.game = new Phaser.Game(800, 400, Phaser.AUTO, 'content', {
            preload: this.preload,
            create: this.create,
            update: this.update,
            render: this.render
        });
    }
    App.prototype.preload = function () {
        this.game.load.image('cow', 'img/cow.jpg');
        this.game.load.image('plant', 'img/plant.jpg');
    };
    App.prototype.create = function () {
        this.enemies = [];
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        var logo = this.game.add.sprite(0, 0, 'cow');
        this.logo = logo;
        logo.scale.setTo(0.5);
        logo.inputEnabled = true;
        this.enemies.push(logo);
        this.game.physics.arcade.enable(logo);
        this.orbit = new Orbit(logo, 1000, 100);
        this.orbit.startRotation();
        window['game'] = this;
        this.plant = new Plant(this.game, this.game.world.centerX, this.game.world.centerY);
    };
    App.prototype.update = function () {
        for (var _i = 0, _a = this.enemies; _i < _a.length; _i++) {
            var enemy = _a[_i];
            this.plant.collideEnemy(enemy);
        }
    };
    App.prototype.render = function () {
        this.game.debug.pointer(this.game.input.activePointer);
        this.game.debug.spriteInputInfo(this.logo, 32, 32);
        this.game.debug.spriteCoords(this.logo, 32, 128);
        this.game.debug.spriteInfo(this.logo, 32, 200);
        this.game.debug.spriteBounds(this.logo);
        this.game.debug.body(this.logo);
        this.game.debug.spriteBounds(this.plant);
        this.game.debug.body(this.plant);
        this.game.debug.text("Energy: " + this.plant.energy, 700, 32);
        this.game.debug.text("Water: " + this.plant.water, 700, 64);
    };
    return App;
})();
window.onload = function () {
    var game = new App();
};
