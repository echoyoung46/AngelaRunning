var game = new Phaser.Game(800, 450, Phaser.AUTO, 'game');

game.states = {};

game.states.boot = function () {
	this.preload = function () {

		},
		this.create = function () {
			this.state.start('preloader');
		}
}

// 用来显示资源加载进度
game.states.preloader = function () {
	this.preload = function () {
			game.load.image('bg', 'assets/image/bg.jpg');
		},
		this.create = function () {
			this.state.start('menu');
		}
}

// 游戏菜单
game.states.menu = function () {
	this.create = function () {
			game.input.onDown.add(this.startGame, this);
		},
		this.startGame = function () {
			console.log('startgame');
			game.state.start('start');
		}
}

game.states.start = function () {
	console.log('start');
	this.preload = function () {
			console.log('start preload');
			///初始化状态
			this.day = '#FFFFFF';
		},
		this.create = function () {
			this.speed = -500;
			
			console.log('start create');
			this.land = game.add.image(0, 0, 'bg');
			this.land.width = game.world.width;
			this.land.height = game.world.height;
			game.physics.arcade.enable(this.land);
			this.land.autoScroll(this.speed, 0); //自动重复滚动
			this.land.body.allowGravity = false; //不用重力
			this.land.body.immovable = true; //不可移动的，别的物体碰到后会反弹
		},
		this.gameStart = function () { //清理资源，重新开始游戏
			game.state.start('start');
		}
}

game.state.add('boot', game.states.boot);
game.state.add('preloader', game.states.preloader);
game.state.add('menu', game.states.menu);
game.state.add('start', game.states.start);
game.state.start('boot');