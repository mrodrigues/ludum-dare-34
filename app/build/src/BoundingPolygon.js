var BoundingPolygon = (function () {
    function BoundingPolygon(sprite, width, height) {
        if (width === void 0) { width = sprite.width; }
        if (height === void 0) { height = sprite.height; }
        this.sprite = sprite;
        this.width = width;
        this.height = height;
        this.points = this.rotatedPoints(this.sprite);
        this.polygon = new Phaser.Polygon(this.points.concat([this.points[0]]));
    }
    BoundingPolygon.prototype.containPolygon = function (contained) {
        var _this = this;
        var containedPoints = contained.points;
        return containedPoints.every(function (point) { return _this.polygon.contains(point.x, point.y); });
    };
    BoundingPolygon.prototype.rotatedPoints = function (sprite) {
        return this.rotatePoints(sprite.body.rotation, sprite, this.extractPoints(sprite));
    };
    BoundingPolygon.prototype.extractPoints = function (sprite) {
        var tl = new Phaser.Point(sprite.body.x - this.width / 2, sprite.body.y - this.height / 2);
        var bl = new Phaser.Point(sprite.body.x - this.width / 2, sprite.body.y + this.height / 2);
        var br = new Phaser.Point(sprite.body.x + this.width / 2, sprite.body.y + this.height / 2);
        var tr = new Phaser.Point(sprite.body.x + this.width / 2, sprite.body.y - this.height / 2);
        return [tl, bl, br, tr];
    };
    BoundingPolygon.prototype.rotatePoints = function (rotation, sprite, points) {
        var _this = this;
        var center = new Phaser.Point(sprite.x, sprite.y);
        return points.map(function (point) { return _this.rotatePoint(point, center, rotation); });
    };
    BoundingPolygon.prototype.rotatePoint = function (point, center, rotation) {
        // translate to center
        var tempX = point.x - center.x;
        var tempY = point.y - center.y;
        // apply rotation
        var rotatedX = tempX * Math.cos(rotation) - tempY * Math.sin(rotation);
        var rotatedY = tempX * Math.sin(rotation) + tempY * Math.cos(rotation);
        // translate back
        point.x = rotatedX + center.x;
        point.y = rotatedY + center.y;
        return point;
    };
    return BoundingPolygon;
})();
