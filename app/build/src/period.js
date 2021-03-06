var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Period = (function (_super) {
    __extends(Period, _super);
    function Period(game, key, x, y, initialAngle, maxSpeed) {
        _super.call(this, game, x, y, key);
        this.name = key;
        this.friction = -5;
        game.add.existing(this);
        game.physics.p2.enable(this);
        this.body.collideWorldBounds = false;
        this.orbit = new Orbit(this, new Phaser.Point(this.game.world.centerX, this.game.world.height), this.height / 2, 10);
        // this.orbit.startRotation();
        // this.position.setTo(400, 200);
        // this.anchor.set(1, 0.5);
    }
    Period.prototype.update = function () {
        this.orbit.update();
    };
    Period.prototype.applyFriction = function () {
        this.orbit.addSpeed(this.friction * this.game.time.physicsElapsed);
    };
    return Period;
})(Phaser.Sprite);
