var Player = (function () {
    function Player(game) {
        var objects = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            objects[_i - 1] = arguments[_i];
        }
        this.game = game;
        this.objects = objects;
        this.acceleration = 1;
    }
    Player.prototype.update = function () {
        // TODO: Slow down when changing direction
        // TODO: Adjust speed and friction;
        var acceleration = this.acceleration * this.game.time.physicsElapsed;
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            for (var _i = 0, _a = this.objects; _i < _a.length; _i++) {
                var object = _a[_i];
                object.orbit.addSpeed(-acceleration);
            }
        }
        else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            for (var _b = 0, _c = this.objects; _b < _c.length; _b++) {
                var object = _c[_b];
                object.orbit.addSpeed(acceleration);
            }
        }
        else {
            for (var _d = 0, _e = this.objects; _d < _e.length; _d++) {
                var object = _e[_d];
                object.applyFriction();
            }
        }
    };
    return Player;
})();
