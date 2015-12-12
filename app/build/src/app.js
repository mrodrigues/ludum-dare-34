var App = (function () {
    function App() {
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', {
            preload: this.preload,
            create: this.create,
            update: this.update
        });
    }
    App.prototype.preload = function () {
        this.game.load.image('logo', 'app/lib/phaser/docs/img/phaser.png');
    };
    App.prototype.create = function () {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        var logo = this.game.add.sprite(this.game.world.centerX, this.game.world.height, 'logo');
        this.logo = logo;
        this.game.physics.arcade.enable(logo);
        this.orbit = new Orbit(logo, 400, 100);
        this.orbit.startRotation();
        window['orbit'] = this.orbit;
    };
    App.prototype.update = function () {
    };
    return App;
})();
window.onload = function () {
    var game = new App();
};
