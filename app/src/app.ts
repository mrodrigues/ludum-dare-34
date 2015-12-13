class App {
    constructor() {
        this.game = new Phaser.Game(
            800, 400, Phaser.AUTO, 'content', {
                preload: this.preload,
                create: this.create,
                update: this.update,
                render: this.render
            });
    }

    game: Phaser.Game;
    logo: Phaser.Sprite;
    plant: Plant;
    orbit: Orbit;
    enemies: Array<Phaser.Sprite>;

    preload() {
        this.game.load.image('logo', 'app/lib/phaser/docs/img/phaser.png');
        this.game.load.image('plant', 'img/plant.jpg');
    }

    create() {
        
        this.enemies = [];
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        
        // this.game.physics.p2.applyDamping = false;
        // this.game.physics.p2.applyGravity = false;
        // this.game.physics.p2.applySpringForces = false;

        let logo = this.game.add.sprite(0, 0, 'logo');
        this.logo = logo;
        logo.inputEnabled = true;
        this.enemies.push(logo);

        this.game.physics.arcade.enable(logo);

        this.orbit = new Orbit(logo, 400, 100);
        this.orbit.startRotation();

        window['game'] = this;

        this.plant = new Plant(this.game, this.game.world.centerX, this.game.world.centerY);
    }

    update() {
        for (let enemy of this.enemies) {
            this.plant.collideEnemy(enemy);
        }
    }

    render() {
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
    }
}

window.onload = () => {
    var game = new App();
};