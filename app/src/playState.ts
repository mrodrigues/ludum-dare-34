class PlayState {
    constructor(game) {
        this.game = game;
    }

    debug: boolean;
    game: Phaser.Game;
    cow: Enemy;
    plant: Plant;
    orbit: Orbit;
    enemies: Array<Phaser.Sprite>;
    day: Period;
    night: Period;
    player: Player;
    cloud: Cloud;
    ai: AI;
    pivot: Phaser.Point;
    bgMusic: Phaser.Sound;
    
    energyBar: Bar;
    waterBar: Bar;

    preload() {
    }

    create() {
        this.debug = false;
        this.pivot = new Phaser.Point(this.game.world.centerX, this.game.world.height);
        this.enemies = [];
        this.game.physics.startSystem(Phaser.Physics.P2JS);

        this.game.physics.p2.applyGravity = false;
        this.game.physics.p2.applyDamping = false;
        this.game.physics.p2.applySpringForces = false;

        this.day = new Period(this.game, 'day', 0, 0, 0, 2);
        this.day.body.debug = this.debug;

        this.night = new Period(this.game, 'night', 0, 0, 180, 2);
        this.night.body.debug = this.debug;

        this.plant = new Plant(this.game, this.game.world.centerX, this.game.world.centerY + 30);
        let ground = this.game.add.sprite(0, 0, 'ground');
        ground.position.setTo(this.pivot.x - ground.width / 2, this.pivot.y - ground.height);

        this.cloud = new Cloud(this.game, this.pivot, 400, 0.2);
        this.cloud.body.debug = this.debug;

        this.player = new Player(this.game, this.day, this.night, this.cloud);

        let cow = new Enemy(this.game, this.day, this.pivot, 'cow', 270, 0.2, -90);
        cow.body.debug = this.debug;
        cow.animations.add('walking', [0], 1, false);
        cow.animations.add('wet', [1], 1, false);
        cow.animations.add('sleeping', [2], 1, false);
        cow.animations.play('walking');
        this.cow = cow;
        this.ai = new AI(cow);
        this.enemies.push(cow);

        this.game.physics.p2.setPostBroadphaseCallback(this.allowPassThrough, this);
        this.bgMusic = this.game.sound.add('bg', 1, true);
        this.bgMusic.play();
        
        this.energyBar = new Bar(0x00ff00, this.plant.maxEnergy, 200, this.game, 10, 10);
        this.waterBar = new Bar(0x0000ff, this.plant.maxWater, 200, this.game, 10, 40);
        
        window['game'] = this;
    }

    allowPassThrough(obj1: Phaser.Physics.P2.Body, obj2: Phaser.Physics.P2.Body) {
        return false;
    }

    update() {
        this.player.update();
        this.ai.update(this);

        let dayPolygon = new BoundingPolygon(this.day);
        let nightPolygon = new BoundingPolygon(this.night);
        let cloudPolygon = this.cloud.createPolygon();
        let plantPolygon = this.plant.createPolygon();
        
        for (let enemy of this.enemies) {
            let enemyPolygon = new BoundingPolygon(enemy);
            if (enemyPolygon.containPolygon(plantPolygon)) {
                this.plant.collidedEnemy();
            }
        }

        if (dayPolygon.containPolygon(plantPolygon)) {
            this.plant.collidedDay();
        } else if (nightPolygon.containPolygon(plantPolygon)) {
            this.plant.collidedNight();
        }
		
		if (cloudPolygon.overlapPolygon(plantPolygon)) {
			this.plant.collidedRain();
		}
        
        this.energyBar.setValue(this.plant.energy);
        this.waterBar.setValue(this.plant.water);
    }

    render() {
        if (!this.debug) { return; }

        this.game.debug.text("Energy: " + this.plant.energy, 700, 32);
        this.game.debug.text("Water: " + this.plant.water, 700, 64);
        this.game.debug.text("Growth: " + this.plant.growth, 700, 96);

        this.game.debug.text("speed: " + this.cloud.orbit.angularSpeed, this.cloud.x, this.cloud.y);

        let dayPolygon = new BoundingPolygon(this.day);
        let plantPolygon = this.plant.createPolygon();
        let cowPolygon = new BoundingPolygon(this.cow);
        let cloudPolygon = this.cloud.createPolygon();
        
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

        cowPolygon.points.forEach((point) => {
            let color = dayPolygon.polygon.contains(point.x, point.y) ? 'green' : 'red';
            this.game.debug.geom(new Phaser.Circle(point.x, point.y, 10), color, true);
            this.game.debug.text('(' + point.x + ',' + point.y + ')', point.x - 20, point.y - 20, 'white');
        });
        
        cloudPolygon.points.forEach((point) => {
            this.game.debug.geom(new Phaser.Circle(point.x, point.y, 10), 'yellow', true);
            this.game.debug.text('(' + point.x + ',' + point.y + ')', point.x - 20, point.y - 20, 'white');
        });
    }
    
    shutdown() {
        this.bgMusic.destroy();
    }
}