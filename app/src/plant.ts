class Plant extends Phaser.Sprite {
	water: number;
	maxWater: number;
	energy: number;
	maxEnergy: number;
	energyTimer: number;
	growth: number;
	constructor(game: Phaser.Game, x: number, y: number, maxWater = 100, maxEnergy = 100) {
		super(game, x, y, 'plant');
		this.name = 'plant';
		this.maxWater = maxWater;
		this.water = maxWater / 2;
		this.maxEnergy = maxEnergy;
		this.energy = 0;
		this.energyTimer = game.time.now;
		this.growth = 0;
		
		game.add.existing(this);
		game.physics.p2.enable(this);
		(<Phaser.Physics.P2.Body> this.body).static = true;
		(<Phaser.Physics.P2.Body> this.body).angle
		
		this.startTimer(this.decreaseWater);
	}
	
	grow() {
		if (this.game.time.now > this.energyTimer) {
			this.energyTimer = this.game.time.now + 50;
			if (this.energy > 0) {
				this.energy -= 1;
				this.growth += 1;
				this.checkWin();
			}
		}
	}
	
	checkWin() {
		if (this.growth > 1000) {
			console.log('Win!');
		}
	}
	
	decreaseWater() {
		this.water -= 1;
		if (this.water <= 0) {
			this.die();
		}
		this.startTimer(this.decreaseWater);
	}
	
	increaseEnergy() {
		if (this.game.time.now > this.energyTimer) {
			this.energyTimer = this.game.time.now + 50;
			this.energy += 1;
		}
	}
	
	startTimer(callback) {
		this.game.time.events.add(500, callback, this);
	}
	
	collideEnemy(enemy: Phaser.Sprite) {
		this.game.physics.arcade.overlap(this, enemy, () => this.die());
	}
	
	collidedDay() {
		this.increaseEnergy();
	}
	
	collidedNight() {
		this.grow();
	}
	
	die() {
		// this.kill();
		console.log("kill");
	}
}