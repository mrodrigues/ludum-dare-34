// TODO:
// * Sounds
// * Enemies animation
// * Splash screen and credits
// * Find a way to paint plant yellow when dry
var App = (function () {
    function App() {
        this.game = new Phaser.Game(1200, 600, Phaser.AUTO, 'content');
        this.game.state.add('app', this);
        this.game.state.start('app');
    }
    App.prototype.preload = function () {
        console.log('app');
        this.game.load.image('loading', 'img/loading.png');
        this.game.load.script('splash', 'app/build/src/splash.js');
    };
    App.prototype.create = function () {
        this.game.state.add('splash', new Splash(this.game));
        this.game.state.start('splash');
    };
    return App;
})();
window.onload = function () {
    var app = new App();
};
