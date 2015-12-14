var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Plant = (function (_super) {
    __extends(Plant, _super);
    function Plant(game, x, y, maxWater, maxEnergy) {
        if (maxWater === void 0) { maxWater = 100; }
        if (maxEnergy === void 0) { maxEnergy = 100; }
        _super.call(this, game, x, y, 'plant');
        this.name = 'plant';
        this.maxWater = maxWater;
        this.water = maxWater / 2;
        this.maxEnergy = maxEnergy;
        this.energy = 0;
        this.energyTimer = game.time.now;
        this.growth = 0;
        game.add.existing(this);
        game.physics.p2.enable(this);
        this.body.static = true;
        this.body.angle;
        this.startTimer(this.decreaseWater);
    }
    Plant.prototype.grow = function () {
        if (this.game.time.now > this.energyTimer) {
            this.energyTimer = this.game.time.now + 50;
            if (this.energy > 0) {
                this.energy -= 1;
                this.growth += 1;
                this.checkWin();
            }
        }
    };
    Plant.prototype.checkWin = function () {
        if (this.growth > 1000) {
            console.log('Win!');
        }
    };
    Plant.prototype.decreaseWater = function () {
        this.water -= 1;
        if (this.water <= 0) {
            this.die();
        }
        this.startTimer(this.decreaseWater);
    };
    Plant.prototype.increaseEnergy = function () {
        if (this.game.time.now > this.energyTimer) {
            this.energyTimer = this.game.time.now + 50;
            this.energy += 1;
        }
    };
    Plant.prototype.startTimer = function (callback) {
        this.game.time.events.add(500, callback, this);
    };
    Plant.prototype.collideEnemy = function (enemy) {
        var _this = this;
        this.game.physics.arcade.overlap(this, enemy, function () { return _this.die(); });
    };
    Plant.prototype.collidedDay = function () {
        this.increaseEnergy();
    };
    Plant.prototype.collidedNight = function () {
        this.grow();
    };
    Plant.prototype.die = function () {
        // this.kill();
        console.log("kill");
    };
    return Plant;
})(Phaser.Sprite);
