var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Cloud = (function (_super) {
    __extends(Cloud, _super);
    function Cloud(game, pivot, orbitDistance, maxSpeed) {
        _super.call(this, game, 0, 0, 'cloud');
        this.name = 'cloud';
        game.add.existing(this);
        game.physics.p2.enable(this);
        this.body.collideWorldBounds = false;
        this.friction = 0.1;
        this.orbit = new Orbit(this, pivot, orbitDistance, maxSpeed);
    }
    Cloud.prototype.update = function () {
        this.orbit.update();
    };
    Cloud.prototype.addSpeed = function (speed) {
        this.orbit.addSpeed(speed, true);
    };
    Cloud.prototype.applyFriction = function () {
        this.orbit.interpolateSpeed(this.friction, this.orbit.maxSpeed);
    };
    return Cloud;
})(Phaser.Sprite);
