class Period extends Phaser.Sprite {
	static maxSpeed = 1;
	orbit: Orbit;
	friction: number;
	constructor(game: Phaser.Game, key: string, x: number, y: number, initialAngle: number) {
		super(game, x, y, key);
		this.name = key;
		this.friction = 0.1;
		game.add.existing(this);
		game.physics.p2.enable(this);
		this.body.collideWorldBounds = false;
		
        this.orbit = new Orbit(this, new Phaser.Point(this.game.world.centerX, this.game.world.height), this.height / 2, Period.maxSpeed);
		this.body.angle = initialAngle;
	}
	
	update () {
		this.orbit.update();
	}
	
	addSpeed(speed: number) {
		this.orbit.addSpeed(speed / 2);
	}
	
	applyFriction () {
		this.orbit.interpolateSpeed(this.friction, 0);
	}
}