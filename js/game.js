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
			this.score = 0;
			this.gameOver = false;
			this.speed = -300;

			this.land = game.add.tileSprite(0, 0, game.stage.width, game.cache.getImage('mainBg').height, 'mainBg');
			this.angela = this.add.image('angela');
			game.physics.arcade.enable(this.land);
			this.land.autoScroll(this.speed, 0);
		},
		this.create = function () {
			this.angela = this.add.sprite(0, 0, 'angela')
			game.physics.arcade.enable(this.angela);
			this.angela.anchor.set(0.5);
			this.angela.x = this.angela.width;
			this.angela.y = game.height - this.angela.height / 2;
			this.angela.body.collideWorldBounds = true;
			game.camera.follow(this.angela);
			this.angela.scale.x = 0.5;
			this.angela.scale.y = 0.5;

			this.skyGroup = game.add.group();
			this.skyGroup.enableBody = true;
			var sky1 = this.add.sprite(0, 0, 'colorDragon');
			var sky2 = this.add.sprite(0, 0, 'colorDragon');
			var sky3 = this.add.sprite(0, 0, 'colorDragon');
			sky1.visible = sky2.visible = sky3.visible = false;
			sky1.alive = sky2.alive = sky3.alive = false;
			this.skyGroup.add(sky1);
			this.skyGroup.add(sky2);
			this.skyGroup.add(sky3);
			sky1.body.setCircle(sky1.width / 2);
			sky2.body.setCircle(sky2.width / 2);
			sky3.body.setCircle(sky3.width / 2);
			this.skyGroup.setAll('checkWorldBounds', true);
			this.skyGroup.setAll('outOfBoundsKill', true);
			this.skyGroup.scale.x = 0.2;
			this.skyGroup.scale.y = 0.2;

			game.time.events.loop(1000, this.addProps, this);
		},
		this.gameStart = function () {
			game.state.start('start');
			this.skyGroup.forEach(function (small) {
				small.destroy();
			});

			game.state.start('start');
		},
		this.update = function () {
			// this.land.tilePosition.x -= 1;
		},
		this.addProps = function () { //添加道具
			if (this.gameOver) {
				return;
			}
		
			var random = game.rnd.between(1, 100);
			if (this.score >= 100) { //分数大于300后再随机道具里添加乌鸦
				var small = this.skyGroup.getFirstDead();
				if (small !== null) {
					// this.angela.x = this.angela.width;
					// this.angela.y = game.height - this.angela.height / 2;
					small.reset(game.width, game.height - small.height);
					small.body.velocity.x = this.speed;
				}
			} else {
				var small = this.skyGroup.getFirstDead();
				if (small !== null) {
					small.reset(game.width, game.height - small.height);
					small.body.velocity.x = this.speed;
				}
			}
		},
		this.updateScore = function () {
			this.score++;
			this.scoreText.text = "" + this.score + "    最高 " + Math.max(this.score, this.topScore);
			this.scoreText.x = game.width - this.scoreText.width - 30;
		}
}

game.state.add('boot', game.states.boot);
game.state.add('preloader', game.states.preloader);
game.state.add('menu', game.states.menu);
game.state.add('start', game.states.start);
game.state.start('boot');