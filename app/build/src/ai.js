var AI = (function () {
    function AI(enemy) {
        this.enemy = enemy;
        this.setWalking();
    }
    AI.prototype.update = function (context) {
        var dayPolygon = new BoundingPolygon(context.day);
        var nightPolygon = new BoundingPolygon(context.night);
        var cloudPolygon = new BoundingPolygon(context.cloud);
        var enemyPolygon = new BoundingPolygon(this.enemy);
        if (dayPolygon.containPolygon(enemyPolygon)) {
            this.underPeriod(context.day);
        }
        else if (nightPolygon.containPolygon(enemyPolygon)) {
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
    };
    AI.prototype.underPeriod = function (period) {
        this.currentPeriod = period;
        if (this.isWalking() && this.enemy.preferredPeriod != this.currentPeriod) {
            this.goToSleep();
        }
        else if (this.isSleeping() && this.enemy.preferredPeriod == this.currentPeriod) {
            this.wakeUp();
        }
    };
    AI.prototype.goToSleep = function () {
        this.setGoingToSleep();
        this.timer = this.currentTime() + 1000;
        this.previousSpeed = this.enemy.orbit.angularSpeed;
    };
    AI.prototype.wakeUp = function () {
        this.setWakingUp();
    };
    AI.prototype.wet = function () {
        if (this.currentTime() > this.timer) {
            this.enemy.orbit.setAngularSpeed(-1 * this.previousSpeed);
            this.setWalking();
        }
        else {
            this.enemy.orbit.setAngularSpeed(0);
        }
    };
    AI.prototype.gettingWet = function () {
        if (this.isWalking()) {
            this.setWet();
            this.previousSpeed = this.enemy.orbit.maxSpeed * this.enemy.direction;
            this.timer = this.currentTime() + 1000;
        }
        else if (this.isWet()) {
            this.timer = this.currentTime() + 1000;
        }
    };
    AI.prototype.goingToSleep = function () {
        this.enemy.orbit.interpolateSpeed(0.1, 0);
        if (this.enemy.orbit.angularSpeed == 0) {
            this.setSleeping();
        }
    };
    AI.prototype.wakingUp = function () {
        this.enemy.orbit.interpolateSpeed(0.1, this.previousSpeed);
        if (this.enemy.orbit.angularSpeed == this.previousSpeed) {
            this.setWalking();
        }
    };
    AI.prototype.isWalking = function () {
        return this.currentState == AI.WALKING;
    };
    AI.prototype.setWalking = function () {
        this.currentState = AI.WALKING;
        this.enemy.animations.play('walking');
    };
    AI.prototype.isGoingToSleep = function () {
        return this.currentState == AI.GOING_TO_SLEEP;
    };
    AI.prototype.setGoingToSleep = function () {
        this.currentState = AI.GOING_TO_SLEEP;
    };
    AI.prototype.isSleeping = function () {
        return this.currentState == AI.SLEEPING;
    };
    AI.prototype.setSleeping = function () {
        this.currentState = AI.SLEEPING;
        this.enemy.animations.play('sleeping');
    };
    AI.prototype.isWakingUp = function () {
        return this.currentState == AI.WAKING_UP;
    };
    AI.prototype.setWakingUp = function () {
        this.currentState = AI.WAKING_UP;
    };
    AI.prototype.isWet = function () {
        return this.currentState == AI.WET;
    };
    AI.prototype.setWet = function () {
        this.currentState = AI.WET;
        this.enemy.animations.play('wet');
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
