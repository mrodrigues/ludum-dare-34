var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Period = (function (_super) {
    __extends(Period, _super);
    function Period(game, key, x, y, initialAngle) {
        _super.call(this, game, x, y, key);
        this.name = key;
        this.friction = 0.1;
        game.add.existing(this);
        game.physics.p2.enable(this);
        this.body.collideWorldBounds = false;
        this.orbit = new Orbit(this, new Phaser.Point(this.game.world.centerX, this.game.world.height), this.height / 2, Period.maxSpeed);
        this.body.angle = initialAngle;
    }
    Period.prototype.update = function () {
        this.orbit.update();
    };
    Period.prototype.addSpeed = function (speed) {
        this.orbit.addSpeed(speed / 2);
    };
    Period.prototype.applyFriction = function () {
        this.orbit.interpolateSpeed(this.friction, 0);
    };
    Period.maxSpeed = 1;
    return Period;
})(Phaser.Sprite);
