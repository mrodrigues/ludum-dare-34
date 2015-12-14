var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Enemy = (function (_super) {
    __extends(Enemy, _super);
    function Enemy(game, preferredPeriod, pivot, key, orbitDistance, maxSpeed, initialAngle) {
        _super.call(this, game, 999, 999, key);
        this.name = key;
        this.preferredPeriod = preferredPeriod;
        game.add.existing(this);
        game.physics.p2.enable(this);
        this.body.collideWorldBounds = false;
        this.direction = 1;
        this.orbit = new Orbit(this, pivot, orbitDistance, maxSpeed, initialAngle);
        this.orbit.setAngularSpeed(maxSpeed);
    }
    Enemy.prototype.update = function () {
        this.orbit.update();
        if (this.orbit.angularSpeed != 0) {
            this.direction = Math.sign(this.orbit.angularSpeed);
            this.scale.setTo(this.direction, 1);
        }
    };
    return Enemy;
})(Phaser.Sprite);
