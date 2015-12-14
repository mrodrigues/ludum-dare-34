var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Plant = (function (_super) {
    __extends(Plant, _super);
    function Plant(game, x, y, maxWater, maxEnergy, maxGrowth) {
        if (maxWater === void 0) { maxWater = 100; }
        if (maxEnergy === void 0) { maxEnergy = 100; }
        if (maxGrowth === void 0) { maxGrowth = 100; }
        _super.call(this, game, x, y, 'plant');
        this.pivot.y = -130;
        this.name = 'plant';
        this.water = maxWater / 2;
        this.maxWater = maxWater;
        this.waterThrottle = 200;
        this.energy = 0;
        this.maxEnergy = maxEnergy;
        this.energyThrottle = 500;
        this.energyTimer = this.waterTimer = game.time.now;
        this.growth = 0;
        this.maxGrowth = maxGrowth;
        game.add.existing(this);
        game.physics.p2.enable(this);
        this.body.static = true;
        this.startTimer(this.decreaseWater);
    }
    Plant.prototype.update = function () {
        this.tint = Phaser.Color.interpolateRGB(255, 255, 255, 0, 0, 0, this.maxWater, this.maxWater - this.water + 1);
    };
    Plant.prototype.grow = function () {
        if (this.game.time.now > this.energyTimer) {
            this.energyTimer = this.game.time.now + this.energyThrottle;
            if (this.energy > 0) {
                this.energy -= 1;
                this.growth += 1;
                this.pivot.y += 1;
                this.checkWin();
            }
        }
    };
    Plant.prototype.checkWin = function () {
        if (this.growth > this.maxGrowth) {
            this.game.state.start('win');
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
            this.energyTimer = this.game.time.now + this.energyThrottle;
            this.energy += 1;
        }
    };
    Plant.prototype.increaseWater = function () {
        if (this.game.time.now > this.waterTimer) {
            this.waterTimer = this.game.time.now + this.waterThrottle;
            this.water += 1;
        }
    };
    Plant.prototype.startTimer = function (callback) {
        this.game.time.events.add(1000, callback, this);
    };
    Plant.prototype.collidedEnemy = function () {
        this.die();
    };
    Plant.prototype.collidedDay = function () {
        this.increaseEnergy();
    };
    Plant.prototype.collidedNight = function () {
        this.grow();
    };
    Plant.prototype.collidedRain = function () {
        this.increaseWater();
    };
    Plant.prototype.die = function () {
        this.game.state.start('lose');
    };
    Plant.prototype.createPolygon = function () {
        return new BoundingPolygon(this, this.width, 50);
    };
    return Plant;
})(Phaser.Sprite);
