class Enemy extends Phaser.Sprite {
	orbit: Orbit;
	preferredPeriod: Period;
	direction: number;
	constructor(game: Phaser.Game, preferredPeriod: Period, pivot: Phaser.Point, key: string, orbitDistance: number, maxSpeed: number, initialAngle: number) {
		super(game, 999, 999, key);
		this.name = key;
		this.preferredPeriod = preferredPeriod;
		game.add.existing(this);
		game.physics.p2.enable(this);
		this.body.collideWorldBounds = false;
		this.direction = 1;
		
        this.orbit = new Orbit(this, pivot, orbitDistance, maxSpeed, initialAngle);
		this.orbit.setAngularSpeed(maxSpeed);
	}
	
	update () {
		this.orbit.update();
		if (this.orbit.angularSpeed != 0) {
			this.direction = Math.sign(this.orbit.angularSpeed);
			this.scale.setTo(this.direction, 1);
		}
	}
}