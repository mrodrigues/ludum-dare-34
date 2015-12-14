// TODO:
// * Sounds
// * Enemies animation
// * Splash screen and credits
// * Find a way to paint plant yellow when dry
var App = (function () {
    function App() {
        var game = new Phaser.Game(1200, 600, Phaser.AUTO, 'content');
        game.state.add('play', new PlayState(game));
        game.state.add('win', new WinState(game));
        game.state.add('lose', new LoseState(game));
        game.state.start('play');
    }
    return App;
})();
window.onload = function () {
    var game = new App();
};
