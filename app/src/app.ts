class App {
    constructor() {
        this.game = new Phaser.Game(
            800, 600, Phaser.AUTO, 'content', {
                preload: this.preload,
                create: this.create,
                update: this.update,
                render: this.render
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
        
        // this.game.physics.p2.applyDamping = false;
        // this.game.physics.p2.applyGravity = false;
        // this.game.physics.p2.applySpringForces = false;

        var logo = this.game.add.sprite(this.game.world.centerX, this.game.world.height, 'logo');
        this.logo = logo;
        logo.inputEnabled = true;
        
        this.game.physics.arcade.enable(logo);
        
        this.orbit = new Orbit(logo, 400, 100);
        this.orbit.startRotation();
        
        window['orbit'] = this.orbit;
    }
    
    update() {
    }
    
    render() {
        this.game.debug.pointer(this.game.input.activePointer);
        this.game.debug.spriteInputInfo(this.logo, 32, 32);
        this.game.debug.spriteCoords(this.logo, 32, 128);
        this.game.debug.spriteInfo(this.logo, 32, 200);
        this.game.debug.spriteBounds(this.logo);
        this.game.debug.body(this.logo);
    }
}

window.onload = () => {
    var game = new App();
};