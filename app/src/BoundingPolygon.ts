class BoundingPolygon {
	sprite: Phaser.Sprite;
        width: number;
        height: number;
        points: Array<Phaser.Point>;
        polygon: Phaser.Polygon;
	constructor(sprite: Phaser.Sprite, width = sprite.width, height = sprite.height) {
		this.sprite = sprite;
                this.width = width;
                this.height = height;
                this.points = this.rotatedPoints(this.sprite);
                this.polygon = new Phaser.Polygon(this.points.concat([this.points[0]]));
	}
        
        containPolygon(contained: BoundingPolygon) {
                let containedPoints = contained.points;
                return containedPoints.every((point) => this.polygon.contains(point.x, point.y));
        }
        
        private rotatedPoints(sprite: Phaser.Sprite) {
                return this.rotatePoints(sprite.body.rotation, sprite, this.extractPoints(sprite));
        }
        
        private extractPoints(sprite: Phaser.Sprite) {
                let tl = new Phaser.Point(sprite.body.x - this.width / 2, sprite.body.y - this.height / 2);
                let bl = new Phaser.Point(sprite.body.x - this.width / 2, sprite.body.y + this.height / 2);
                let br = new Phaser.Point(sprite.body.x + this.width / 2, sprite.body.y + this.height / 2);
                let tr = new Phaser.Point(sprite.body.x + this.width / 2, sprite.body.y - this.height / 2);
                return [tl, bl, br, tr];
        }
        
        private rotatePoints(rotation: number, sprite: Phaser.Sprite, points: Array<Phaser.Point>) {
                let center = new Phaser.Point(sprite.x, sprite.y);
                return points.map((point) => this.rotatePoint(point, center, rotation));
        }
        
        private rotatePoint(point: Phaser.Point, center: Phaser.Point, rotation: number) {
                // translate to center
                let tempX = point.x - center.x;
                let tempY = point.y - center.y;
                
                // apply rotation
                let rotatedX = tempX * Math.cos(rotation) - tempY * Math.sin(rotation);
                let rotatedY = tempX * Math.sin(rotation) + tempY * Math.cos(rotation);
                
                // translate back
                point.x = rotatedX + center.x;
                point.y = rotatedY + center.y;
                
                return point;
        }
}