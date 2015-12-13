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
    pivot: Phaser.Point;

    preload() {
        this.game.load.image('cow', 'img/cow.jpg');
        this.game.load.image('plant', 'img/plant.jpg');
        this.game.load.image('day', 'img/day.png');
        this.game.load.image('night', 'img/night.png');
    }

    create() {
        this.pivot = new Phaser.Point(this.game.world.centerX, this.game.world.centerY);
        this.enemies = [];
        this.game.physics.startSystem(Phaser.Physics.P2JS);
        // this.game.physics.box2d.gravity.y = 0;
        
        this.game.physics.p2.applyGravity = false;
        this.game.physics.p2.applyDamping = false;
        this.game.physics.p2.applySpringForces = false;

        this.day = new Period(this.game, 'day', 100, 100, 0, 50);
        this.day.body.debug = true;
        // this.day.anchor.setTo(1, 0.5);
        this.night = new Period(this.game, 'night', 100, 100, 0, 50);
        this.night.body.angle = 180;
        // this.night.anchor.setTo(1, 0.5);
        // this.night.body.position.setTo(200, 100);
        this.night.body.debug = true;
        
        // this.plant = new Plant(this.game, 100, 100);

        // let player = this.game.add.sprite(0, 0);

        // player.position.setTo(200, 100);
        // player.addChild(this.day.body);
        // player.addChild(this.night);
        // // player.scale.setTo(20);
        // this.player = player;
        // player.body.static = true;
        // this.day.body.static = true;
        // this.night.body.static = true;

        // window['orbit'] = new Orbit(player, 0, 1);
        // player.position.setTo(400, 200);
        // player.anchor.set(1, 0.5);
        
        // this.night.body.clearShapes();
        // (<Phaser.Physics.P2.Body> this.day.body).setRectangleFromSprite(this.night);
        // player.position.set(this.game.world.width / 2, this.game.world.height);
        // player.position.set(this.game.world.centerX, this.game.world.centerY);

        // let cow = new Enemy(this.game, 'cow', 1000, 100);
        // this.cow = cow;
        // cow.scale.setTo(0.5);
        // cow.inputEnabled = true;
        // this.enemies.push(cow);

        window['game'] = this;
        console.log(teste);
        this.game.physics.p2.setPostBroadphaseCallback(allowPassThrough, this);
        this.game.input.onDown.add(teste, this);
        
        function allowPassThrough() { return false; }
    
        function teste() {
            console.log(this.day);
            // this.day.body.rotateLeft(10);
            // this.night.body.rotateLeft(10);
        }

        // this.plant = new Plant(this.game, 300, 100);//this.game.world.centerX, this.game.world.centerY);
    }

    update() {
        // for (let enemy of this.enemies) {
        //     this.plant.collideEnemy(enemy);
        // }
        // this.plant.collideDay(this.day);
        // let radius = this.day.width / 2;
        // this.day.body.angle += 1;
        // this.day.body.x = this.pivot.x + radius * Math.cos((<any> this.game.math).degToRad(this.day.body.angle));
        // this.day.body.y = this.pivot.y + radius * Math.sin((<any> this.game.math).degToRad(this.day.body.angle));
        
        // radius = this.night.width / 2;
        // this.night.body.angle += 1;
        // this.night.body.x = this.pivot.x + radius * Math.cos((<any> this.game.math).degToRad(this.night.body.angle));
        // this.night.body.y = this.pivot.y + radius * Math.sin((<any> this.game.math).degToRad(this.night.body.angle));
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
        // this.game.debug.body(this.player, 'red');
        // this.game.debug.spriteBounds(this.player);
        // this.game.debug.body(this.night, 'green');
        // this.game.debug.spriteBounds(this.day);
        // this.game.debug.body(this.day, 'green');

        // this.game.debug.text("Energy: " + this.plant.energy, 700, 32);
        // this.game.debug.text("Water: " + this.plant.water, 700, 64);
    }
}

window.onload = () => {
    var game = new App();
};