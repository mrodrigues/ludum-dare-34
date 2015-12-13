class Period extends Phaser.Sprite {
	orbit: Orbit;
	friction: number;
	constructor(game: Phaser.Game, key: string, x: number, y: number, initialAngle: number, maxSpeed: number) {
		super(game, x, y, key);
		this.name = key;
		game.add.existing(this);
		game.physics.p2.enable(this);
		this.friction = -5;
		
        this.orbit = new Orbit(this, new Phaser.Point(400, 200), this.width / 2, 10);
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