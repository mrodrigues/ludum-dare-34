class Plant extends Phaser.Sprite {
	water: number;
	maxWater: number;
	energy: number;
	maxEnergy: number;
	constructor(game: Phaser.Game, x: number, y: number, maxWater = 100, maxEnergy = 100) {
		super(game, x, y, 'plant');
		this.maxWater = maxWater;
		this.water = maxWater / 2;
		this.maxEnergy = maxEnergy;
		this.energy = 0;
		
		game.add.existing(this);
		game.physics.arcade.enable(this);
		
		this.startTimer(this.decreaseWater);
		this.startTimer(this.decreaseEnergy);
	}
	
	decreaseWater() {
		this.water -= 1;
		if (this.water <= 0) {
			this.die();
		}
		this.startTimer(this.decreaseWater);
	}
	
	decreaseEnergy() {
		if (this.energy > 0) {
			this.energy -= 1;
		}
		this.startTimer(this.decreaseEnergy);
	}
	
	startTimer(callback) {
		this.game.time.events.add(500, callback, this);
	}
	
	collideEnemy(enemy: Phaser.Sprite) {
		this.game.physics.arcade.overlap(this, enemy, () => this.die());
	}
	
	die() {
		// this.kill();
		console.log("kill");
	}
}