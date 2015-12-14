class App {
    constructor() {
        this.game = new Phaser.Game(
            800, 400, Phaser.AUTO, 'content', {
                preload: this.preload,
                create: this.create,
                update: this.update,
                render: this.render,
                checkCollisions: this.checkCollisions,
                checkCollisionsForPlant: this.checkCollisionsForPlant
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

        this.player = new Player(this.game, this.day, this.night);

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
        this.game.physics.p2.setPostBroadphaseCallback(this.checkCollisions, this);
        // this.game.physics.p2.on

        this.plant = new Plant(this.game, this.game.world.centerX, this.game.world.centerY);
        this.plant.body.angle = 45;
    }

    checkCollisions(obj1: Phaser.Physics.P2.Body, obj2: Phaser.Physics.P2.Body) {
        if (obj1.sprite == this.plant) {
            this.checkCollisionsForPlant(obj2.sprite);
        } else if (obj2.sprite == this.plant) {
            this.checkCollisionsForPlant(obj2.sprite);
        }
        
        // Allow any object to overlap
        return false;
    }

    checkCollisionsForPlant(object: Phaser.Sprite) {
        if (object == this.day) {
            console.log('day');
            // this.plant.collidedDay();
        } else if (object == this.night) {
            // this.plant.collidedNight();
        }
    }

    update() {
        this.player.update();
        // let speed = 5;
        // if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
        //     this.day.orbit.addSpeed(-speed);
        //     this.night.orbit.addSpeed(-speed);
        // } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
        //     this.day.orbit.addSpeed(speed);
        //     this.night.orbit.addSpeed(speed);
        // }
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




        let points = rotatePoints(this.plant.body.rotation, this.plant, extractPoints(this.plant));

        let dayPoints = rotatePoints(this.day.body.rotation, this.day, extractPoints(this.day));
        let dayPolygon = new Phaser.Polygon(dayPoints);
        
        this.game.debug.geom(dayPolygon, 'black', true);
        
        console.log(containSprite(this.day, this.plant));
        
        dayPoints.forEach((point) => {
            this.game.debug.geom(new Phaser.Circle(point.x, point.y, 10), 'green', true);
        });
        
        points.forEach((point) => {
            let color = dayPolygon.contains(point.x, point.y) ? 'blue' : 'red';
            this.game.debug.geom(new Phaser.Circle(point.x, point.y, 10), color, true);
        });
        
        function containSprite(container: Phaser.Sprite, contained: Phaser.Sprite) {
            let containedPoints = rotatedPoints(contained);
            let containerPolygon = new Phaser.Polygon(rotatedPoints(container));
            return containedPoints.every((point) => containerPolygon.contains(point.x, point.y));
        }
        
        function rotatedPoints(sprite: Phaser.Sprite) {
            return rotatePoints(sprite.body.rotation, sprite, extractPoints(sprite));
        }

        function extractPoints(sprite: Phaser.Sprite) {
            let tl = new Phaser.Point(sprite.body.x - sprite.width / 2, sprite.body.y - sprite.height / 2);
            let bl = new Phaser.Point(sprite.body.x - sprite.width / 2, sprite.body.y + sprite.height / 2);
            let tr = new Phaser.Point(sprite.body.x + sprite.width / 2, sprite.body.y - sprite.height / 2);
            let br = new Phaser.Point(sprite.body.x + sprite.width / 2, sprite.body.y + sprite.height / 2);
            return [tl, bl, tr, br];
        }

        function rotatePoints(rotation: number, sprite: Phaser.Sprite, points: Array<Phaser.Point>) {
            let center = new Phaser.Point(sprite.x, sprite.y);
            return points.map((point) => rotatePoint(point, center, rotation));
        }

        function rotatePoint(point: Phaser.Point, center: Phaser.Point, rotation: number) {
            // let radius = Math.sqrt(Math.pow(point.x, 2) + Math.pow(point.y, 2));
            // point.x = point.x + radius * Math.cos(rotation);
            // point.y = point.y + radius * Math.sin(rotation);
            
            let tempX = point.x - center.x;
            let tempY = point.y - center.y;

            // now apply rotation
            let rotatedX = tempX * Math.cos(rotation) - tempY * Math.sin(rotation);
            let rotatedY = tempX * Math.sin(rotation) + tempY * Math.cos(rotation);

            // translate back
            point.x = rotatedX + center.x;
            point.y = rotatedY + center.y;

            return point;
        }
    }
}

window.onload = () => {
    var game = new App();
};