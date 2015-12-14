class Orbit {
    object: Phaser.Sprite;
    body: Phaser.Physics.P2.Body;
    maxSpeed: number;
    direction: number;
    radius: number;
    pivot: Phaser.Point;
    angularSpeed: number;

    constructor(object: Phaser.Sprite, pivot: Phaser.Point, radius: number, maxSpeed: number, initialAngle = 0, initialDirection = 1) {
        this.direction = initialDirection;
        this.body = object.body;
        this.object = object;
        this.maxSpeed = maxSpeed;
        this.radius = radius;
        this.pivot = pivot;
        this.angularSpeed = 0;
        
        this.object.body.angle = initialAngle;
    }
    
    update() {
        this.object.body.angle += this.angularSpeed;
        let radians = this.object.body.rotation;
        this.object.body.x = this.pivot.x + this.radius * Math.cos(radians);
        this.object.body.y = this.pivot.y + this.radius * Math.sin(radians);
    }
    
    addSpeed(speed) {
        var newSpeed = this.getAngularSpeed() + speed;
        if (newSpeed > this.maxSpeed) {
            this.setAngularSpeed(this.maxSpeed);
        } else if (newSpeed < 0) {
            this.setAngularSpeed(0);
        } else {
            this.setAngularSpeed(newSpeed);
        }
    }
    
    invertDirection() {
        this.direction *= -1;
        this.setAngularSpeed(this.getAngularSpeed());
    }
    
    private setAngularSpeed(angularSpeed) {
        this.angularSpeed = angularSpeed * this.direction;
    }
    
    private getAngularSpeed() {
        return Math.abs(this.angularSpeed);
    }
}