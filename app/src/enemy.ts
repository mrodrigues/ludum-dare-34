class Enemy extends Phaser.Sprite {
	orbit: Orbit;
	constructor(game: Phaser.Game, key: string, orbitDistance: number, maxSpeed: number) {
		super(game, 0, 0, key);
		game.add.existing(this);
		game.physics.arcade.enable(this);
		
        this.orbit = new Orbit(this, orbitDistance, maxSpeed);
        this.orbit.startRotation();
	}
}