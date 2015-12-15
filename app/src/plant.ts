class Plant extends Phaser.Sprite {
	water: number;
	maxWater: number;
	waterTimer: number;
	waterThrottle: number;
	energy: number;
	maxEnergy: number;
	energyTimer: number;
	energyThrottle: number;
	growth: number;
	maxGrowth: number;
	
	growSound: Phaser.Sound;
	constructor(game: Phaser.Game, x: number, y: number, maxWater = 100, maxEnergy = 100, maxGrowth = 90) {
		super(game, x, y, 'plant');
		this.pivot.y = -130;
		this.name = 'plant';
		this.water = maxWater / 2;
		this.maxWater = maxWater;
		this.waterThrottle = 200;
		this.energy = 0;
		this.maxEnergy = maxEnergy;
		this.energyThrottle = 500;
		this.energyTimer = this.waterTimer = game.time.now;
		this.growth = 0;
		this.maxGrowth = maxGrowth;

		game.add.existing(this);
		game.physics.p2.enable(this);
		(<Phaser.Physics.P2.Body>this.body).static = true;

		this.startTimer(this.decreaseWater);
		
		this.growSound = game.sound.add('grow', 0.5);
	}

	update() {
		this.tint = Phaser.Color.interpolateRGB(
			255, 255, 255,
			0, 0, 0,
			this.maxWater,
			this.maxWater - this.water + 1
		);
	}

	grow() {
		if (this.game.time.now > this.energyTimer) {
			this.energyTimer = this.game.time.now + this.energyThrottle;
			if (this.energy > 0) {
				this.energy -= 1;
				this.growth += 1;
				this.pivot.y += 2;
				this.growSound.play();
				this.checkWin();
			}
		}
	}

	checkWin() {
		if (this.growth > this.maxGrowth) {
			this.game.state.start('win');
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
			this.energyTimer = this.game.time.now + this.energyThrottle;
			
			if (this.energy < this.maxEnergy) {
				this.energy += 1;
			}
		}
	}

	increaseWater() {
		if (this.game.time.now > this.waterTimer) {
			this.waterTimer = this.game.time.now + this.waterThrottle;

			if (this.water < this.maxWater) {
				this.water += 1;
			}
		}
	}

	startTimer(callback) {
		this.game.time.events.add(1000, callback, this);
	}

	collidedEnemy() {
		this.die();
	}

	collidedDay() {
		this.increaseEnergy();
	}

	collidedNight() {
		this.grow();
	}

	collidedRain() {
		this.increaseWater();
	}

	die() {
		this.game.state.start('lose');
	}

	createPolygon() {
		return new BoundingPolygon(this, this.width, 50);
	}
}