class Splash {
	game: Phaser.Game;
	
	constructor(game: Phaser.Game) {
		this.game = game;
	}
	
	loadScripts() {
		this.game.load.script('orbit', 'app/build/src/orbit.js');
		this.game.load.script('cloud', 'app/build/src/cloud.js');
		this.game.load.script('period', 'app/build/src/period.js');
		this.game.load.script('player', 'app/build/src/player.js');
		this.game.load.script('ai', 'app/build/src/ai.js');
		this.game.load.script('enemy', 'app/build/src/enemy.js');
		this.game.load.script('plant', 'app/build/src/plant.js');
		this.game.load.script('bar', 'app/build/src/bar.js');
		this.game.load.script('playState', 'app/build/src/playState.js');
		this.game.load.script('winState', 'app/build/src/winState.js');
		this.game.load.script('loseState', 'app/build/src/loseState.js');

	}

	loadBgm() {
        this.game.load.audio('bg', 'sounds/bg.mp3');
        this.game.load.audio('grow', 'sounds/grow.wav');
        this.game.load.audio('rain', 'sounds/rain.mp3');
        this.game.load.audio('cow1', 'sounds/cow1.wav');
		this.game.load.audio('cow2', 'sounds/cow2.wav');
		this.game.load.audio('cow3', 'sounds/cow3.wav');
		this.game.load.audio('cow4', 'sounds/cow4.wav');
		this.game.load.audio('cow5', 'sounds/cow5.wav');
	}

	loadImages() {
        this.game.load.image('loading', 'img/loading.png');
        this.game.load.spritesheet('cow', 'img/cow.png', 265, 172);
        this.game.load.image('plant', 'img/plant.png');
        this.game.load.image('day', 'img/day.png');
        this.game.load.image('night', 'img/night.png');
        this.game.load.spritesheet('cloud', 'img/cloud.png', 216, 357);
        this.game.load.image('ground', 'img/ground.png');
	}

	loadFonts() {
	}

	preload() {
		this.loadScripts();
		this.loadImages();
		this.loadFonts();
		this.loadBgm();
		// Add the loadingbar to the scene:
		var loadingBar = this.game.add.sprite(this.game.world.centerX - 50, 450, "loading");
		// Tell phaser to use laodingBar as our preload progess bar
		this.game.load.setPreloadSprite(loadingBar);
    	let status = this.game.add.text(this.game.world.centerX- 50, 380, 'Loading...', {fill: 'white'});
	}
	
	create() {
        this.game.state.add('play', new PlayState(this.game));
        this.game.state.add('win', new WinState(this.game));
        this.game.state.add('lose', new LoseState(this.game));
		this.game.state.start('play');
	}
}