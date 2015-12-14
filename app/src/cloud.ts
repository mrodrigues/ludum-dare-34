class Cloud extends Phaser.Sprite {
	orbit: Orbit;
	constructor(game: Phaser.Game, pivot: Phaser.Point, orbitDistance: number, maxSpeed: number) {
		super(game, 0, 0, 'cloud');
		game.add.existing(this);
		game.physics.p2.enable(this);
		this.body.collideWorldBounds = false;
		
        this.orbit = new Orbit(this, pivot, 250, 1);
		this.orbit.setAngularSpeed(1);
	}
	
	update () {
		this.orbit.update();
	}
}