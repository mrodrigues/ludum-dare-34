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
    cow: Enemy;
    plant: Plant;
    orbit: Orbit;
    enemies: Array<Phaser.Sprite>;
    day: Period;
    night: Period;
    player: Phaser.Sprite;

    preload() {
        this.game.load.image('cow', 'img/cow.jpg');
        this.game.load.image('plant', 'img/plant.jpg');
        this.game.load.image('day', 'img/day.png');
        this.game.load.image('night', 'img/night.png');
    }

    create() {
        this.enemies = [];
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        
        this.day = new Period(this.game, 'day', 0, 50);
        this.night = new Period(this.game, 'night', 180, 50);
        this.night.angle = 180;
        
        let player = this.game.add.sprite(0, 0);
        
		this.game.physics.arcade.enable(player);
        player.addChild(this.day);
        player.addChild(this.night);
        player.scale.setTo(20);
        this.player = player;
        
        new Orbit(player, 0, 50);
        player.position.setTo(400, 200);
		player.anchor.set(1, 0.5);
        
        player.position.set(this.game.world.width / 2, this.game.world.height);

        // let cow = new Enemy(this.game, 'cow', 1000, 100);
        // this.cow = cow;
        // cow.scale.setTo(0.5);
        // cow.inputEnabled = true;
        // this.enemies.push(cow);

        window['game'] = this;

        // this.plant = new Plant(this.game, this.game.world.centerX, this.game.world.centerY);
    }

    update() {
        for (let enemy of this.enemies) {
            this.plant.collideEnemy(enemy);
        }
    }

    render() {
        // this.game.debug.pointer(this.game.input.activePointer);
        // this.game.debug.spriteInputInfo(this.cow, 32, 32);
        // this.game.debug.spriteCoords(this.cow, 32, 128);
        // this.game.debug.spriteInfo(this.cow, 32, 200);
        // this.game.debug.spriteBounds(this.cow);
        // this.game.debug.body(this.cow);
        // this.game.debug.spriteBounds(this.plant);
        // this.game.debug.body(this.plant);
        
        // this.game.debug.spriteBounds(this.player);
        this.game.debug.body(this.player);

        // this.game.debug.text("Energy: " + this.plant.energy, 700, 32);
        // this.game.debug.text("Water: " + this.plant.water, 700, 64);
    }
}

window.onload = () => {
    var game = new App();
};