var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Period = (function (_super) {
    __extends(Period, _super);
    function Period(game, key, initialAngle, maxSpeed) {
        _super.call(this, game, 0, 0, key);
        game.add.existing(this);
        game.physics.arcade.enable(this);
        // this.orbit = new Orbit(this, 0, maxSpeed, initialAngle);
        // this.orbit.startRotation();
        // this.position.setTo(400, 200);
        this.anchor.set(1, 0.5);
    }
    return Period;
})(Phaser.Sprite);
