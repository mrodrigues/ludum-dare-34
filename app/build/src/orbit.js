var Orbit = (function () {
    function Orbit(object, distance, maxSpeed, initialAngle, initialDirection) {
        if (initialAngle === void 0) { initialAngle = 0; }
        if (initialDirection === void 0) { initialDirection = 1; }
        this.direction = initialDirection;
        this.body = object.body;
        this.object = object;
        this.maxSpeed = maxSpeed;
        this.object.anchor.setTo(0.5, 0.5);
        this.object.pivot.set(0, distance);
        this.object.angle = initialAngle;
        this.object.position.setTo(this.object.game.world.centerX, this.object.game.world.height + 200);
        this.startRotation();
    }
    Orbit.prototype.startRotation = function () {
        this.setAngularSpeed(this.maxSpeed);
    };
    Orbit.prototype.addSpeed = function (speed) {
        var newSpeed = this.getAngularSpeed() + speed;
        if (newSpeed > this.maxSpeed) {
            this.setAngularSpeed(this.maxSpeed);
        }
        else if (newSpeed < 0) {
            this.setAngularSpeed(0);
        }
        else {
            this.setAngularSpeed(newSpeed);
        }
    };
    Orbit.prototype.invertDirection = function () {
        this.direction *= -1;
        this.setAngularSpeed(this.getAngularSpeed());
    };
    Orbit.prototype.setAngularSpeed = function (velocity) {
        this.body.angularVelocity = velocity * this.direction;
        console.log("New angular velocity: ", this.body.angularVelocity);
    };
    Orbit.prototype.getAngularSpeed = function () {
        return Math.abs(this.body.angularVelocity);
    };
    return Orbit;
})();
