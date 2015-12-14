var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Enemy = (function (_super) {
    __extends(Enemy, _super);
    function Enemy(game, key, orbitDistance, maxSpeed) {
        _super.call(this, game, 0, 0, key);
        game.add.existing(this);
        game.physics.p2.enable(this);
        this.body.collideWorldBounds = false;
        this.orbit = new Orbit(this, new Phaser.Point(this.game.world.centerX, this.game.world.height), 200, 1);
        this.orbit.setAngularSpeed(1);
    }
    Enemy.prototype.update = function () {
        this.orbit.update();
    };
    return Enemy;
})(Phaser.Sprite);
