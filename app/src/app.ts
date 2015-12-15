// TODO:
// * Sounds
// * Enemies animation
// * Splash screen and credits
// * Find a way to paint plant yellow when dry

class App {
    game: Phaser.Game;
    constructor() {
        this.game = new Phaser.Game(1200, 600, Phaser.AUTO, 'content');
        this.game.state.add('app', this);
        this.game.state.start('app');
    }

  preload() {
    this.game.load.image('loading', 'img/loading.png');
    this.game.load.script('splash', 'app/build/src/splash.js');
  }
  
  create () {
    this.game.state.add('splash', new Splash(this.game));
    this.game.state.start('splash');
  }
}

window.onload = () => {
    var app = new App();
};