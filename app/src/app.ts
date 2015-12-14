// TODO:
// * Deploy
// * Publish
// * Drag cloud with the sky
// * Enemies AI
// * Grow plant
// * Balance game
// * Sounds
// * Music
// * Enemies animation
// * GUI
// * Splash screen and credits
// * Improve movement physics

class App {
    constructor() {
        this.game = new Phaser.Game(
            1200, 600, Phaser.AUTO, 'content', {
                preload: this.preload,
                create: this.create,
                update: this.update,
                render: this.render,
                checkCollisions: this.checkCollisions
            });
    }

    game: Phaser.Game;
    cow: Enemy;
    plant: Plant;
    orbit: Orbit;
    enemies: Array<Phaser.Sprite>;
    day: Period;
    night: Period;
    player: Player;
    pivot: Phaser.Point;
    cloud: Phaser.Sprite;

    preload() {
        this.game.load.image('cow', 'img/cow.jpg');
        this.game.load.image('plant', 'img/plant.jpg');
        this.game.load.image('day', 'img/day.png');
        this.game.load.image('night', 'img/night.png');
        this.game.load.image('cloud', 'img/cloud.png');
        this.game.load.image('ground', 'img/ground.png');
    }

    create() {
        this.pivot = new Phaser.Point(this.game.world.centerX, this.game.world.height);
        this.enemies = [];
        this.game.physics.startSystem(Phaser.Physics.P2JS);
        
        this.game.physics.p2.applyGravity = false;
        this.game.physics.p2.applyDamping = false;
        this.game.physics.p2.applySpringForces = false;

        this.day = new Period(this.game, 'day', 0, 0, 0, 50);
        this.day.body.debug = true;
        // this.day.anchor.setTo(1, 0.5);
        this.night = new Period(this.game, 'night', 0, 0, 0, 50);
        this.night.body.angle = 180;
        // this.night.anchor.setTo(1, 0.5);
        // this.night.body.position.setTo(200, 100);
        this.night.body.debug = true;
        
        let ground = this.game.add.sprite(0, 0, 'ground');
        ground.position.setTo(this.pivot.x - ground.width / 2, this.pivot.y - ground.height / 2);

        this.player = new Player(this.game, this.day, this.night);
        
        this.cloud = new Cloud(this.game, this.pivot, 250, 1);

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

        let cow = new Enemy(this.game, 'cow', 1000, 100);
        cow.body.debug = true;
        this.cow = cow;
        // cow.scale.setTo(0.5);
        // cow.inputEnabled = true;
        this.enemies.push(cow);

        window['game'] = this;
        this.game.physics.p2.setPostBroadphaseCallback(this.checkCollisions, this);
        // this.game.physics.p2.on

        this.plant = new Plant(this.game, this.game.world.centerX, this.game.world.centerY + 100);
    }

    checkCollisions(obj1: Phaser.Physics.P2.Body, obj2: Phaser.Physics.P2.Body) {
        if (obj1.sprite == this.cloud && obj2.sprite == this.plant) {
            this.plant.collidedRain();
        }
        
        // Allow any object to overlap
        return false;
    }

    update() {
        this.player.update();

        let dayPolygon = new BoundingPolygon(this.day);
        let nightPolygon = new BoundingPolygon(this.night);

        if (dayPolygon.containSprite(this.plant)) {
            this.plant.collidedDay();
        } else if (nightPolygon.containSprite(this.plant)) {
            this.plant.collidedNight();
        }
        
        // console.log('angle: ' + this.day.body.angle + ', x: ' + this.day.body.x + ', y: ' + this.day.body.y);
        // for (let enemy of this.enemies) {
        //     this.plant.collideEnemy(enemy);
        // }
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

        this.game.debug.text("Energy: " + this.plant.energy, 700, 32);
        this.game.debug.text("Water: " + this.plant.water, 700, 64);
        this.game.debug.text("Growth: " + this.plant.growth, 700, 96);

        let dayPolygon = new BoundingPolygon(this.day);
        let plantPolygon = new BoundingPolygon(this.plant);
        
        // this.game.debug.geom(plantPolygon.polygon, 'red', true);
        
        for (let i = 1; i < dayPolygon.points.length - 1; i++) {
            let point = dayPolygon.points[i];
            let previousPoint = dayPolygon.points[i - 1];
            this.game.debug.geom(new Phaser.Line(point.x, point.y, previousPoint.x, previousPoint.y), 'green');
        }
        
        dayPolygon.points.forEach((point) => {
            this.game.debug.geom(new Phaser.Circle(point.x, point.y, 10), 'blue', true);
            this.game.debug.text('(' + point.x + ',' + point.y + ')', point.x - 20, point.y - 20, 'white');
        });

        plantPolygon.points.forEach((point) => {
            let color = dayPolygon.polygon.contains(point.x, point.y) ? 'green' : 'red';
            this.game.debug.geom(new Phaser.Circle(point.x, point.y, 10), color, true);
            this.game.debug.text('(' + point.x + ',' + point.y + ')', point.x - 20, point.y - 20, 'white');
        });
    }
}

window.onload = () => {
    var game = new App();
};