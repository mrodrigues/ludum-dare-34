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
        game.physics.arcade.enable(this);
        this.orbit = new Orbit(this, orbitDistance, maxSpeed);
        this.orbit.startRotation();
    }
    return Enemy;
})(Phaser.Sprite);
