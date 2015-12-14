var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Enemy = (function (_super) {
    __extends(Enemy, _super);
    function Enemy(game, preferredPeriod, pivot, key, orbitDistance, maxSpeed) {
        _super.call(this, game, 0, 0, key);
        this.name = key;
        this.preferredPeriod = preferredPeriod;
        game.add.existing(this);
        game.physics.p2.enable(this);
        this.body.collideWorldBounds = false;
        this.orbit = new Orbit(this, pivot, orbitDistance, maxSpeed);
        this.orbit.setAngularSpeed(maxSpeed);
    }
    Enemy.prototype.update = function () {
        this.orbit.update();
        this.scale.setTo(this.orbit.angularSpeed > 0 ? 1 : -1, 1);
    };
    return Enemy;
})(Phaser.Sprite);
