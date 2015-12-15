class AI {
	static WALKING = 0;
	static GOING_TO_SLEEP = 1;
	static SLEEPING = 2;
	static WAKING_UP = 3;
	static WET = 4;

	enemy: Enemy;
	currentState: number;
	currentPeriod: Period;
	timer: number;
	previousSpeed: number;
	constructor(enemy: Enemy) {
		this.enemy = enemy;
		this.setWalking();
	}

	update(context: PlayState) {
        let dayPolygon = new BoundingPolygon(context.day);
        let nightPolygon = new BoundingPolygon(context.night);
		let cloudPolygon = context.cloud.createPolygon();
		let enemyPolygon = new BoundingPolygon(this.enemy);

        if (dayPolygon.containPolygon(enemyPolygon)) {
            this.underPeriod(context.day);
        } else if (nightPolygon.containPolygon(enemyPolygon)) {
            this.underPeriod(context.night);
        }
		
		if (cloudPolygon.overlapPolygon(enemyPolygon)) {
			this.gettingWet();
		}

		switch (this.currentState) {
			case AI.GOING_TO_SLEEP:
				this.goingToSleep();
				break;
			case AI.WAKING_UP:
				this.wakingUp();
				break;
			case AI.WET:
				this.wet();
		}
	}

	underPeriod(period: Period) {
		this.currentPeriod = period;
		if (this.isWalking() && this.enemy.preferredPeriod != this.currentPeriod) {
			this.goToSleep();
		} else if (this.isSleeping() && this.enemy.preferredPeriod == this.currentPeriod) {
			this.wakeUp();
		}
	}

	goToSleep() {
		this.setGoingToSleep();
		this.timer = this.currentTime() + 1000;
		this.previousSpeed = this.enemy.orbit.angularSpeed;
	}

	wakeUp() {
		this.setWakingUp();
	}
	
	wet() {
		if (this.currentTime() > this.timer) {
			this.enemy.orbit.setAngularSpeed(-1 * this.previousSpeed);
			this.setWalking();
		} else {
			this.enemy.orbit.setAngularSpeed(0);
		}
	}
	
	gettingWet() {
		if (this.isWalking()) {
			this.setWet();
			this.previousSpeed = this.enemy.orbit.maxSpeed * this.enemy.direction;
			this.timer = this.currentTime() + 1000;
		} else if (this.isWet()) {
			this.timer = this.currentTime() + 1000;
		}
	}

	goingToSleep() {
		this.enemy.orbit.interpolateSpeed(0.1, 0);
		if (this.enemy.orbit.angularSpeed == 0) {
			this.setSleeping();
		}
	}

	wakingUp() {
		this.enemy.orbit.interpolateSpeed(0.1, this.previousSpeed);
		if (this.enemy.orbit.angularSpeed == this.previousSpeed) {
			this.setWalking();
		}
	}

	isWalking() {
		return this.currentState == AI.WALKING;
	}
	
	setWalking() {
		this.currentState = AI.WALKING;
		this.enemy.animations.play('walking');
	}

	isGoingToSleep() {
		return this.currentState == AI.GOING_TO_SLEEP;
	}
	
	setGoingToSleep() {
		this.currentState = AI.GOING_TO_SLEEP;
	}

	isSleeping() {
		return this.currentState == AI.SLEEPING;
	}
	
	setSleeping() {
		this.currentState = AI.SLEEPING;
		this.enemy.animations.play('sleeping');
	}

	isWakingUp() {
		return this.currentState == AI.WAKING_UP;
	}

	setWakingUp() {
		this.currentState = AI.WAKING_UP;
	}
	
	isWet() {
		return this.currentState == AI.WET;
	}

	setWet() {
		this.currentState = AI.WET;
		this.enemy.animations.play('wet');
	}
	
	currentTime() {
		return this.enemy.game.time.now;
	}
}