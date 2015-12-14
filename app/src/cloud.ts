class Cloud extends Phaser.Sprite {
	orbit: Orbit;
	friction: number;
	constructor(game: Phaser.Game, pivot: Phaser.Point, orbitDistance: number, maxSpeed: number) {
		super(game, 0, 0, 'cloud');
		this.name = 'cloud';
		game.add.existing(this);
		game.physics.p2.enable(this);
		this.body.collideWorldBounds = false;
		this.friction = 0.1;
		
        this.orbit = new Orbit(this, pivot, orbitDistance, maxSpeed);
	}
	
	update () {
		this.orbit.update();
	}
	
	addSpeed(speed: number) {
		speed *= 10;
		console.log(speed);
		this.orbit.addSpeed(speed, this.orbit.maxSpeed + Math.abs(speed));
	}
	
	applyFriction () {
		this.orbit.interpolateSpeed(this.friction, this.orbit.maxSpeed);
	}
}