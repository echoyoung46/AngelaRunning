var game = new Phaser.Game(800, 450, Phaser.AUTO, 'game');

game.states = {};

game.states.boot = function () {
	this.preload = function () {

		},
		this.create = function () {
			this.state.start('preloader');
		}
}

game.states.preloader = function () {
	this.preload = function () {
			game.load.image('mainBg', 'assets/image/bg.jpg');
			game.load.image('angela', 'assets/image/angela.png');
		},
		this.create = function () {
			this.state.start('menu');
		}
}

game.states.menu = function () {
	this.create = function () {
			this.startGame();
		},
		this.startGame = function () {
			game.state.start('start');
		}
}

game.states.start = function () {
	this.preload = function () {
			this.land = game.add.tileSprite(0, 0, game.stage.width, game.cache.getImage('mainBg').height, 'mainBg');
			this.angela = this.add.image('angela');
			game.physics.arcade.enable(this.land);
		},
		this.create = function () {
			this.angela = this.add.sprite(0, 0, 'angela')
			game.physics.arcade.enable(this.angela);
			this.angela.anchor.set(0.5);
			this.angela.x = this.angela.width;
			this.angela.y = game.height - this.angela.height / 2;
			// this.angela.body.collideWorldBounds = true;
			// game.camera.follow(this.angela);
		},
		this.gameStart = function () {
			game.state.start('start');
		},
		this.update = function() {
			this.land.tilePosition.x -= 1;
		}
}

game.state.add('boot', game.states.boot);
game.state.add('preloader', game.states.preloader);
game.state.add('menu', game.states.menu);
game.state.add('start', game.states.start);
game.state.start('boot');