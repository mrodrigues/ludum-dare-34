var AI = (function () {
    function AI(enemy) {
        this.enemy = enemy;
        this.currentState = AI.WALKING;
    }
    AI.prototype.update = function (context) {
        var dayPolygon = new BoundingPolygon(context.day);
        var nightPolygon = new BoundingPolygon(context.night);
        var enemyPolygon = new BoundingPolygon(this.enemy);
        if (dayPolygon.containPolygon(enemyPolygon)) {
            this.underPeriod(context.day);
        }
        else if (nightPolygon.containPolygon(enemyPolygon)) {
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
    };
    AI.prototype.underPeriod = function (period) {
        if (period != this.currentPeriod) {
            this.changePeriod(period);
        }
    };
    AI.prototype.changePeriod = function (period) {
        this.currentPeriod = period;
        if (this.isWalking() && this.enemy.preferredPeriod != this.currentPeriod) {
            this.goToSleep();
        }
        else if (this.isSleeping() && this.enemy.preferredPeriod == this.currentPeriod) {
            this.wakeUp();
        }
    };
    AI.prototype.goToSleep = function () {
        this.currentState = AI.GOING_TO_SLEEP;
        this.timer = this.currentTime() + 1000;
    };
    AI.prototype.wakeUp = function () {
        this.currentState = AI.WAKING_UP;
    };
    AI.prototype.goingToSleep = function () {
        this.enemy.orbit.interpolateSpeed(0.1, 0);
        if (this.enemy.orbit.angularSpeed == 0) {
            this.currentState = AI.SLEEPING;
        }
    };
    AI.prototype.wakingUp = function () {
        this.enemy.orbit.interpolateSpeed(0.1, this.enemy.orbit.maxSpeed);
        if (this.enemy.orbit.angularSpeed == this.enemy.orbit.maxSpeed) {
            this.currentState = AI.WALKING;
        }
    };
    AI.prototype.isWalking = function () {
        return this.currentState == AI.WALKING;
    };
    AI.prototype.isGoingToSleep = function () {
        return this.currentState == AI.GOING_TO_SLEEP;
    };
    AI.prototype.isSleeping = function () {
        return this.currentState == AI.SLEEPING;
    };
    AI.prototype.isWakingUp = function () {
        return this.currentState == AI.WAKING_UP;
    };
    AI.prototype.isWet = function () {
        return this.currentState == AI.WET;
    };
    AI.prototype.currentTime = function () {
        return this.enemy.game.time.now;
    };
    AI.WALKING = 0;
    AI.GOING_TO_SLEEP = 1;
    AI.SLEEPING = 2;
    AI.WAKING_UP = 3;
    AI.WET = 4;
    return AI;
})();
