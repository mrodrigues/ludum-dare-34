var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Period = (function (_super) {
    __extends(Period, _super);
    function Period(game, key, x, y, initialAngle, maxSpeed) {
        _super.call(this, game, x, y, key);
        game.add.existing(this);
        game.physics.p2.enable(this);
        this.orbit = new Orbit(this, new Phaser.Point(400, 200), this.width / 2, 10);
        // this.orbit.startRotation();
        // this.position.setTo(400, 200);
        // this.anchor.set(1, 0.5);
    }
    Period.prototype.update = function () {
        // this.orbit.addSpeed(this.friction);
        this.orbit.update();
    };
    return Period;
})(Phaser.Sprite);
