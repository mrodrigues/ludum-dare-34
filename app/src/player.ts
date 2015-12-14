class Player {
	game: Phaser.Game;
	objects: Array<any>;
	acceleration: number;
	
	constructor(game, ...objects) {
		this.game = game;
		this.objects = objects;
		this.acceleration = 5;
	}
	
	update() {
		// TODO: Adjust speed and friction;
		let acceleration = this.acceleration * this.game.time.physicsElapsed;
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
			for (let object of this.objects) {
				object.addSpeed(-acceleration);
			}
        } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
			for (let object of this.objects) {
				object.addSpeed(acceleration);
			}
        } else {
			for (let object of this.objects) {
				object.applyFriction();
			}
		}
	}
}