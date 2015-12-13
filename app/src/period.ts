class Period extends Phaser.Sprite {
	orbit: Orbit;
	constructor(game: Phaser.Game, key: string, initialAngle: number, maxSpeed: number) {
		super(game, 0, 0, key);
		game.add.existing(this);
		game.physics.arcade.enable(this);
		
        // this.orbit = new Orbit(this, 0, maxSpeed, initialAngle);
        // this.orbit.startRotation();
		// this.position.setTo(400, 200);
		this.anchor.set(1, 0.5);
	}
}