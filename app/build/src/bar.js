var Bar = (function () {
    function Bar(color, maxValue, maxWidth, game, x, y) {
        this.maxValue = maxValue;
        this.maxWidth = maxWidth;
        var graphics = game.add.graphics(x, y);
        graphics.beginFill(color);
        this.bar = graphics.drawRect(0, 0, 1, 20);
        graphics.endFill();
    }
    Bar.prototype.setValue = function (value) {
        this.bar.width = value * this.maxWidth / this.maxValue;
    };
    return Bar;
})();
