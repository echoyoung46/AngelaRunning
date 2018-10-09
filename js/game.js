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
			game.load.image('colorDragon', 'assets/image/dragon.png');
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
			// angela
			this.angela = this.add.sprite(0, 0, 'angela')
			game.physics.arcade.enable(this.angela);
			this.angela.anchor.set(0.5);
			this.angela.x = this.angela.width;
			this.angela.y = game.height - this.angela.height / 2;
			// this.angela.body.collideWorldBounds = true;
			// game.camera.follow(this.angela);

			this.smallGroup = game.add.group();
			this.smallGroup.enableBody = true;
			var small1 = this.add.sprite(0, 0, 'colorDragon');
			var small2 = this.add.sprite(0, 0, 'colorDragon');
			var small3 = this.add.sprite(0, 0, 'colorDragon');
			small1.visible = small2.visible = small3.visible = false;
			small1.alive = small2.alive = small3.alive = false;
			this.smallGroup.add(small1);
			this.smallGroup.add(small2);
			this.smallGroup.add(small3);
			small1.body.setCircle(small1.width / 2);
			small2.body.setCircle(small2.width / 2);
			small3.body.setCircle(small3.width / 2);
			this.smallGroup.setAll('checkWorldBounds', true);
			this.smallGroup.setAll('outOfBoundsKill', true);

			game.time.events.loop(1000, this.addProps, this);
		},
		this.gameStart = function () {
			game.state.start('start');
		},
		this.update = function () {
			this.land.tilePosition.x -= 1;
		},
		this.addProps = function () {
			console.log('addProps');
			// var random = game.rnd.between(1, 100);
			var small = this.smallGroup.getFirstDead();
			console.log(small);
			if (small !== null) {
				small.reset(game.width, game.height - small.height);
				small.body.velocity.x = this.speed;
			}
		}
}

game.state.add('boot', game.states.boot);
game.state.add('preloader', game.states.preloader);
game.state.add('menu', game.states.menu);
game.state.add('start', game.states.start);
game.state.start('boot');