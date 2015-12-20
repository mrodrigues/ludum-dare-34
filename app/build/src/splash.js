var Splash = (function () {
    function Splash(game) {
        this.game = game;
    }
    Splash.prototype.loadScripts = function () {
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
    };
    Splash.prototype.loadBgm = function () {
        var _this = this;
        this.game.load.audio('bg', 'sounds/bg.mp3');
        this.game.load.audio('grow', 'sounds/grow.wav');
        this.game.load.audio('rain', 'sounds/rain.mp3');
        [1, 2, 3, 4, 5].map(function (n) { return _this.game.load.audio('cow' + n, 'sounds/cow' + n + '.wav'); });
        [1, 2, 3, 4].map(function (n) { return _this.game.load.audio('rat' + n, 'sounds/rat' + n + '.wav'); });
    };
    Splash.prototype.loadImages = function () {
        this.game.load.image('loading', 'img/loading.png');
        this.game.load.spritesheet('cow', 'img/cow.png', 265, 172);
        this.game.load.spritesheet('rat', 'img/rat.png', 169, 102);
        this.game.load.image('plant', 'img/plant.png');
        this.game.load.image('day', 'img/day.png');
        this.game.load.image('night', 'img/night.png');
        this.game.load.spritesheet('cloud', 'img/cloud.png', 216, 357);
        this.game.load.image('ground', 'img/ground.png');
    };
    Splash.prototype.loadFonts = function () {
    };
    Splash.prototype.preload = function () {
        this.loadScripts();
        this.loadImages();
        this.loadFonts();
        this.loadBgm();
        // Add the loadingbar to the scene:
        var loadingBar = this.game.add.sprite(this.game.world.centerX - 50, 450, "loading");
        // Tell phaser to use laodingBar as our preload progess bar
        this.game.load.setPreloadSprite(loadingBar);
        var status = this.game.add.text(this.game.world.centerX - 50, 380, 'Loading...', { fill: 'white' });
    };
    Splash.prototype.create = function () {
        this.game.state.add('play', new PlayState(this.game));
        this.game.state.add('win', new WinState(this.game));
        this.game.state.add('lose', new LoseState(this.game));
        this.game.state.start('play');
    };
    return Splash;
})();
