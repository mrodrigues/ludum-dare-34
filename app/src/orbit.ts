class Orbit {
    object: Phaser.Sprite;
    body: Phaser.Physics.Arcade.Body;
    maxSpeed: number;
    direction: number;

    constructor(object, distance, maxSpeed, initialAngle = 0, initialDirection = 1) {
        this.direction = initialDirection;
        this.body = object.body;
        this.object = object;
        this.maxSpeed = maxSpeed;
        
        this.object.anchor.setTo(0.5, 0.5);
        this.object.pivot.set(0, distance);
        this.object.angle = initialAngle;
        this.object.position.setTo(this.object.game.world.centerX, this.object.game.world.height);
        
        this.startRotation();
    }
    
    startRotation() {
        this.setAngularSpeed(this.maxSpeed);
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
    
    private setAngularSpeed(velocity) {
        this.body.angularVelocity = velocity * this.direction;
        console.log("New angular velocity: ", this.body.angularVelocity);
    }
    
    private getAngularSpeed() {
        return Math.abs(this.body.angularVelocity);
    }
}