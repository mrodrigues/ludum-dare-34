var Orbit = (function () {
    function Orbit(object, pivot, radius, maxSpeed, initialAngle, initialDirection) {
        if (initialAngle === void 0) { initialAngle = 0; }
        if (initialDirection === void 0) { initialDirection = 1; }
        this.direction = initialDirection;
        this.body = object.body;
        this.object = object;
        this.maxSpeed = maxSpeed;
        this.radius = radius;
        this.pivot = pivot;
        this.angularSpeed = 0;
        this.object.body.angle = initialAngle;
    }
    Orbit.prototype.update = function () {
        this.object.body.angle += this.angularSpeed;
        var radians = this.degInRad();
        this.object.body.x = this.pivot.x + this.radius * Math.cos(radians);
        this.object.body.y = this.pivot.y + this.radius * Math.sin(radians);
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
    Orbit.prototype.setAngularSpeed = function (angularSpeed) {
        this.angularSpeed = angularSpeed * this.direction;
    };
    Orbit.prototype.getAngularSpeed = function () {
        return Math.abs(this.angularSpeed);
    };
    Orbit.prototype.degInRad = function () {
        return this.object.game.math.degToRad(this.object.body.angle);
    };
    return Orbit;
})();
