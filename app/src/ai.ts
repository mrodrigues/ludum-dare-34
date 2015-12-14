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
	constructor(enemy: Enemy) {
		this.enemy = enemy;
		this.currentState = AI.WALKING;
	}

	update(context: App) {
        let dayPolygon = new BoundingPolygon(context.day);
        let nightPolygon = new BoundingPolygon(context.night);
		let enemyPolygon = new BoundingPolygon(this.enemy);

        if (dayPolygon.containPolygon(enemyPolygon)) {
            this.underPeriod(context.day);
        } else if (nightPolygon.containPolygon(enemyPolygon)) {
            this.underPeriod(context.night);
        }

		switch (this.currentState) {
			case AI.GOING_TO_SLEEP:
				this.goingToSleep();
				break;
			case AI.WAKING_UP:
				this.wakingUp();
				break;
		}
		
		console.log(this.currentState);
	}

	underPeriod(period: Period) {
		if (period != this.currentPeriod) {
			this.changePeriod(period);
		}
	}

	changePeriod(period: Period) {
		this.currentPeriod = period;
		if (this.isWalking() && this.enemy.preferredPeriod != this.currentPeriod) {
			this.goToSleep();
		} else if (this.isSleeping() && this.enemy.preferredPeriod == this.currentPeriod) {
			this.wakeUp();
		}
	}

	goToSleep() {
		this.currentState = AI.GOING_TO_SLEEP;
		this.timer = this.currentTime() + 1000;
	}

	wakeUp() {
		this.currentState = AI.WAKING_UP;
	}

	goingToSleep() {
		this.enemy.orbit.interpolateSpeed(0.1, 0);
		if (this.enemy.orbit.angularSpeed == 0) {
			this.currentState = AI.SLEEPING;
		}
	}

	wakingUp() {
		this.enemy.orbit.interpolateSpeed(0.1, this.enemy.orbit.maxSpeed);
		if (this.enemy.orbit.angularSpeed == this.enemy.orbit.maxSpeed) {
			this.currentState = AI.WALKING;
		}
	}

	isWalking() {
		return this.currentState == AI.WALKING;
	}

	isGoingToSleep() {
		return this.currentState == AI.GOING_TO_SLEEP;
	}

	isSleeping() {
		return this.currentState == AI.SLEEPING;
	}

	isWakingUp() {
		return this.currentState == AI.WAKING_UP;
	}

	isWet() {
		return this.currentState == AI.WET;
	}

	currentTime() {
		return this.enemy.game.time.now;
	}
}