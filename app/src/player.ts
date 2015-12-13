class Player {
	game: Phaser.Game;
	objects: Array<Period>;
	acceleration: number;
	
	constructor(game, ...objects) {
		this.game = game;
		this.objects = objects;
		this.acceleration = 1;
	}
	
	update() {
		// TODO: Slow down when changing direction
		// TODO: Adjust speed and friction;
		let acceleration = this.acceleration * this.game.time.physicsElapsed;
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
			for (let object of this.objects) {
				if (object.orbit.direction > 0) {
					object.orbit.invertDirection();
				}
				object.orbit.addSpeed(acceleration);
			}
        } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
			for (let object of this.objects) {
				if (object.orbit.direction < 0) {
					object.orbit.invertDirection();
				}
				object.orbit.addSpeed(acceleration);
			}
        } else {
			for (let object of this.objects) {
				object.applyFriction();
			}
		}
	}
}