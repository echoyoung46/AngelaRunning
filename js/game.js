var game = new Phaser.Game(600, 150, Phaser.AUTO, 'game');

game.states = {};

game.states.boot = function () {
	this.preload = function () {
			this.load.image('loading', 'assets/image/progress.png');
		},
		this.create = function () {
			this.state.start('preloader');
		}
}

game.state.add('boot', game.states.boot);
game.state.start('boot');