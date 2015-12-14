class Period extends Phaser.Sprite {
	orbit: Orbit;
	friction: number;
	constructor(game: Phaser.Game, key: string, x: number, y: number, initialAngle: number, maxSpeed: number) {
		super(game, x, y, key);
		this.name = key;
		this.friction = -5;
		game.add.existing(this);
		game.physics.p2.enable(this);
		this.body.collideWorldBounds = false;
		
        this.orbit = new Orbit(this, new Phaser.Point(this.game.world.centerX, this.game.world.height), this.height / 2, 10);
        // this.orbit.startRotation();
		// this.position.setTo(400, 200);
		// this.anchor.set(1, 0.5);
	}
	
	update () {
		this.orbit.update();
	}
	
	applyFriction () {
		this.orbit.addSpeed(this.friction * this.game.time.physicsElapsed);
	}
}