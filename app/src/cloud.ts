class Cloud extends Phaser.Sprite {
	orbit: Orbit;
	friction: number;
	rainSound: Phaser.Sound;
	constructor(game: Phaser.Game, pivot: Phaser.Point, orbitDistance: number, maxSpeed: number) {
		super(game, 0, 0, 'cloud');
		this.name = 'cloud';
		game.add.existing(this);
		game.physics.p2.enable(this);
		this.body.collideWorldBounds = false;
		this.friction = 0.1;
		this.animations.add('raining', [0, 1, 2, 3], 5, true);
		this.animations.play('raining');
		
        this.orbit = new Orbit(this, pivot, orbitDistance, maxSpeed);
		
		this.rainSound = game.sound.add('rain', 1, true);
		this.rainSound.play();
	}
	
	update () {
		this.orbit.update();
		this.rainSound.volume = (180 - Math.abs(this.angle)) / 180;
	}
	
	addSpeed(speed: number) {
		speed *= 10;
		this.orbit.addSpeed(speed, this.orbit.maxSpeed + Math.abs(speed));
	}
	
	applyFriction () {
		this.orbit.interpolateSpeed(this.friction, this.orbit.maxSpeed);
	}
	
	destroy() {
		Phaser.Sprite.prototype.destroy.apply(this, arguments);
		this.rainSound.destroy();
	}
}