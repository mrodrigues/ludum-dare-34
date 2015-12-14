var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Cloud = (function (_super) {
    __extends(Cloud, _super);
    function Cloud(game, pivot, orbitDistance, maxSpeed) {
        _super.call(this, game, 0, 0, 'cloud');
        game.add.existing(this);
        game.physics.p2.enable(this);
        this.body.collideWorldBounds = false;
        this.orbit = new Orbit(this, pivot, 250, 1);
        this.orbit.setAngularSpeed(1);
    }
    Cloud.prototype.update = function () {
        this.orbit.update();
    };
    return Cloud;
})(Phaser.Sprite);
