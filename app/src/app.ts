class App {
    constructor() {
        this.game = new Phaser.Game(
            800, 600, Phaser.AUTO, 'content', {
                preload: this.preload,
                create: this.create,
                update: this.update
            });
    }

    game: Phaser.Game;
    logo: Phaser.Sprite;
    orbit: Orbit;

    preload() {
        this.game.load.image('logo', 'app/lib/phaser/docs/img/phaser.png');
    }

    create() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        var logo = this.game.add.sprite(this.game.world.centerX, this.game.world.height, 'logo');
        this.logo = logo;
        
        this.game.physics.arcade.enable(logo);
        
        this.orbit = new Orbit(logo, 400, 100);
        this.orbit.startRotation();
        
        window['orbit'] = this.orbit;
    }
    
    update() {
    }
}

window.onload = () => {
    var game = new App();
};