var LoseState = (function () {
    function LoseState(game) {
        this.game = game;
    }
    LoseState.prototype.create = function () {
        var _this = this;
        this.game.add.text(this.game.world.centerX - 50, this.game.world.centerY, 'LOSE', {
            font: '50px Arial',
            fill: '#ffffff'
        });
        this.game.add.text(this.game.world.centerX - 180, this.game.world.centerY + 100, 'Press spacebar to try again', {
            font: '32px Arial',
            fill: '#ffffff'
        });
        var spacebarKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spacebarKey.onDown.addOnce(function () { return _this.game.state.start('play'); });
    };
    return LoseState;
})();
