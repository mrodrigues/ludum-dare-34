class BoundingPolygon {
	sprite: Phaser.Sprite;
	constructor(sprite: Phaser.Sprite) {
		this.sprite = sprite;
	}
        
        containSprite(contained: Phaser.Sprite) {
                let containedPoints = this.rotatedPoints(contained);
                let containerPolygon = new Phaser.Polygon(this.rotatedPoints(this.sprite));
                return containedPoints.every((point) => containerPolygon.contains(point.x, point.y));
        }
        
        private rotatedPoints(sprite: Phaser.Sprite) {
                return this.rotatePoints(sprite.body.rotation, sprite, this.extractPoints(sprite));
        }
        
        private extractPoints(sprite: Phaser.Sprite) {
                let tl = new Phaser.Point(sprite.body.x - sprite.width / 2, sprite.body.y - sprite.height / 2);
                let bl = new Phaser.Point(sprite.body.x - sprite.width / 2, sprite.body.y + sprite.height / 2);
                let tr = new Phaser.Point(sprite.body.x + sprite.width / 2, sprite.body.y - sprite.height / 2);
                let br = new Phaser.Point(sprite.body.x + sprite.width / 2, sprite.body.y + sprite.height / 2);
                return [tl, bl, tr, br];
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