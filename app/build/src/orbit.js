var Orbit = (function () {
    function Orbit(object, pivot, radius, maxSpeed, initialAngle) {
        if (initialAngle === void 0) { initialAngle = 0; }
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
        var worldRotationOffset = Math.PI / 2;
        var radians = this.object.body.rotation - worldRotationOffset;
        this.object.body.x = this.pivot.x + this.radius * Math.cos(radians);
        this.object.body.y = this.pivot.y + this.radius * Math.sin(radians);
    };
    Orbit.prototype.addSpeed = function (speed, maxSpeed) {
        if (maxSpeed === void 0) { maxSpeed = this.maxSpeed; }
        var newSpeed = this.angularSpeed + speed;
        if (Math.abs(newSpeed) > maxSpeed) {
            if (newSpeed < 0) {
                this.setAngularSpeed(-maxSpeed);
            }
            else {
                this.setAngularSpeed(maxSpeed);
            }
        }
        else {
            this.setAngularSpeed(newSpeed);
        }
    };
    Orbit.prototype.interpolateSpeed = function (step, target) {
        var newSpeed = this.tolerance(this.lerp(this.angularSpeed, target, step), target, 2);
        this.setAngularSpeed(newSpeed);
    };
    Orbit.prototype.invertDirection = function () {
        this.setAngularSpeed(this.angularSpeed * -1);
    };
    Orbit.prototype.setAngularSpeed = function (angularSpeed) {
        this.angularSpeed = angularSpeed;
    };
    Orbit.prototype.getAbsAngularSpeed = function () {
        return Math.abs(this.angularSpeed);
    };
    Orbit.prototype.lerp = function (start, end, percent) {
        return (start + percent * (end - start));
    };
    Orbit.prototype.tolerance = function (x, target, decimals) {
        if (Math.abs(target - x) < Math.pow(10, -decimals)) {
            return target;
        }
        return x;
    };
    return Orbit;
})();
