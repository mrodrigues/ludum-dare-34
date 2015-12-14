class Enemy extends Phaser.Sprite {
	orbit: Orbit;
	constructor(game: Phaser.Game, key: string, orbitDistance: number, maxSpeed: number) {
		super(game, 0, 0, key);
		game.add.existing(this);
		game.physics.p2.enable(this);
		this.body.collideWorldBounds = false;
		
        this.orbit = new Orbit(this, new Phaser.Point(this.game.world.centerX, this.game.world.height), 200, 1);
		this.orbit.setAngularSpeed(1);
	}
	
	update () {
		this.orbit.update();
	}
}