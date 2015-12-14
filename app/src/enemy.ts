class Enemy extends Phaser.Sprite {
	orbit: Orbit;
	preferredPeriod: Period;
	constructor(game: Phaser.Game, preferredPeriod: Period, pivot: Phaser.Point, key: string, orbitDistance: number, maxSpeed: number) {
		super(game, 0, 0, key);
		this.name = key;
		this.preferredPeriod = preferredPeriod;
		game.add.existing(this);
		game.physics.p2.enable(this);
		this.body.collideWorldBounds = false;
		
        this.orbit = new Orbit(this, pivot, orbitDistance, maxSpeed);
		this.orbit.setAngularSpeed(1);
	}
	
	update () {
		this.orbit.update();
	}
}