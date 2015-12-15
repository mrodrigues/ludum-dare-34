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
        this.animations.add('raining', [0, 1, 2, 3], 5, true);
        this.animations.play('raining');
        this.orbit = new Orbit(this, pivot, orbitDistance, maxSpeed);
        this.rainSound = game.sound.add('rain', 1, true);
        this.rainSound.play();
    }
    Cloud.prototype.update = function () {
        this.orbit.update();
        this.rainSound.volume = (180 - Math.abs(this.angle)) / 180;
    };
    Cloud.prototype.addSpeed = function (speed) {
        speed *= 10;
        this.orbit.addSpeed(speed, this.orbit.maxSpeed + Math.abs(speed));
    };
    Cloud.prototype.applyFriction = function () {
        this.orbit.interpolateSpeed(this.friction, this.orbit.maxSpeed);
    };
    Cloud.prototype.destroy = function () {
        Phaser.Sprite.prototype.destroy.apply(this, arguments);
        this.rainSound.destroy();
    };
    return Cloud;
})(Phaser.Sprite);
