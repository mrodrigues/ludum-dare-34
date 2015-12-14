class WinState {
    constructor(game) {
        this.game = game;
    }

    game: Phaser.Game;

    create() {
        this.game.add.text(
            this.game.world.centerX - 50,
            this.game.world.centerY,
            'WIN',
            {
                font: '50px Arial',
                fill: '#ffffff'
            }
        );
        
        this.game.add.text(
            this.game.world.centerX - 200,
            this.game.world.centerY + 100,
            'Press spacebar to start again',
            {
                font: '32px Arial',
                fill: '#ffffff'
            }
        );
        
        let spacebarKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spacebarKey.onDown.addOnce(() => this.game.state.start('play'));
    }
}