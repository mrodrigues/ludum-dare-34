class Bar {
	bar: PIXI.Graphics;
	maxValue: number;
	maxWidth: number;
	
	constructor(color: number, maxValue: number, maxWidth: number, game: Phaser.Game, x: number, y: number) {
		this.maxValue = maxValue;
		this.maxWidth = maxWidth;
		
		let graphics = game.add.graphics(x, y);
		graphics.beginFill(color);
		this.bar = graphics.drawRect(0, 0, 1, 20);
		graphics.endFill();
	}
	
	setValue(value: number) {
		this.bar.width = value * this.maxWidth / this.maxValue;
	}
}