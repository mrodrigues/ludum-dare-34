class Orbit {
    object: Phaser.Sprite;
    body: Phaser.Physics.P2.Body;
    maxSpeed: number;
    radius: number;
    pivot: Phaser.Point;
    angularSpeed: number;

    constructor(object: Phaser.Sprite, pivot: Phaser.Point, radius: number, maxSpeed: number, initialAngle = 0) {
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
        
        let worldRotationOffset = Math.PI / 2;
        let radians = this.object.body.rotation - worldRotationOffset;
        this.object.body.x = this.pivot.x + this.radius * Math.cos(radians);
        this.object.body.y = this.pivot.y + this.radius * Math.sin(radians);
    }
    
    addSpeed(speed:number, maxSpeed = this.maxSpeed) {
        let newSpeed = this.angularSpeed + speed;
        if (Math.abs(newSpeed) > maxSpeed) {
            if (newSpeed < 0) {
                this.setAngularSpeed(-maxSpeed);
            } else {
                this.setAngularSpeed(maxSpeed);
            }
        } else {
            this.setAngularSpeed(newSpeed);
        }
    }
    
    interpolateSpeed(step: number, target: number) {
        let newSpeed = this.tolerance(this.lerp(this.angularSpeed, target, step), 2);
        this.setAngularSpeed(newSpeed);
    }
    
    invertDirection() {
        this.setAngularSpeed(this.angularSpeed * -1);
    }
    
    setAngularSpeed(angularSpeed) {
        this.angularSpeed = angularSpeed;
    }
    
    getAbsAngularSpeed() {
        return Math.abs(this.angularSpeed);
    }
    
    lerp(start: number, end: number, percent: number) {
        return (start + percent * (end - start));
    }
    
    tolerance(x: number, decimals: number) {
        if (Math.abs(x) < Math.pow(10, -decimals)) {
            return 0;
        }
        return x;
    }
}