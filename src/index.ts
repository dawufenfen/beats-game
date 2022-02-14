/** @format */

import "phaser";

class GameScene extends Phaser.Scene {
  /* 人与星星碰撞 */
  collectStar = (player, star) => {
    /* Stops and disables this Game Object's Body. */
    star.disableBody(true, true);
    /* 计分 */
    score += 10;
    scoreText.setText("Score: " + score);

    /**
     * 当场上没有星星了，即全部收集完成时
     * 重新放出一轮星星
     * 放出一颗炸弹
     */
    if (stars.countActive(true) === 0) {
      stars.children.iterate(function (child) {
        /*  @ts-ignore-next-line */
        child.enableBody(true, child.x, 0, true, true);
      });

      var x =
        player.x < 400
          ? Phaser.Math.Between(400, 800)
          : Phaser.Math.Between(0, 400);

      const bomb = bombs.create(x, 16, "bomb");
      /* 反弹值 */
      bomb.setBounce(1);
      /* 世界边界碰撞 */
      bomb.setCollideWorldBounds(true);
      /* 设置初始速度 */
      bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
      /* 设置不受重力影响 */
      bomb.allowGravity = false;
    }
  };

  /* 人与炸弹碰撞 */
  hitBomb = (player, bomb) => {
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play("turn");

    gameOver = true;
  };

  /* 加载资源 */
  preload() {
    this.load.image("journey", "assets/journey.jpg");
    this.load.image("ground", "assets/ground.jpg");
    this.load.image("star", "assets/star.png");
    this.load.image("star", "assets/star.png");
    this.load.image("bomb", "assets/bomb.png");

    /* 根据这里的单位宽高来计算每一帧显示的图片的位置 */
    this.load.spritesheet("dude", "assets/dude.png", {
      frameWidth: 32,
      frameHeight: 48,
    });
  }

  create() {
    /* 背景 */
    this.add.image(0, 0, "journey").setDisplaySize(800, 600).setOrigin(0, 0);

    /* 物理初始化，并放上四块木板 */
    platforms = this.physics.add.staticGroup();
    platforms.create(100, 300, "ground").setDisplaySize(200, 20).refreshBody();
    platforms.create(700, 400, "ground").setDisplaySize(200, 20).refreshBody();
    platforms.create(300, 500, "ground").setDisplaySize(200, 20).refreshBody();
    platforms.create(400, 590, "ground").setDisplaySize(800, 20).refreshBody();

    /* 放上12个星星，每隔70放一个 */
    stars = this.physics.add.group({
      key: "star", //图案
      repeat: 11, //重复次数
      setXY: { x: 12, y: 0, stepX: 70 }, // 初始位置xy，以及每步增加的x
    });
    /* 星星的弹跳属性 */
    stars.children.iterate(function (child) {
      /*  @ts-ignore-next-line */
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    /* 分数文案 */
    scoreText = this.add.text(16, 16, "score: 0", {
      fontSize: "32px",
      color: "#000",
    });

    /* 炸弹 */
    bombs = this.physics.add.group();

    /* 小人 */
    /* 生成一个sprite，并设置位置 */
    player = this.physics.add.sprite(700, 300, "dude");
    /* 反弹系数 */
    player.setBounce(0.2);
    /* 开启与世界边界的碰撞 */
    player.setCollideWorldBounds(true);
    /* 重力 */
    player.body.setGravityY(600);

    /* 创建动画-向左的动画 */
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }), // 资源中从第0帧到第3帧为一次动画。
      frameRate: 10, // 每秒10帧
      repeat: -1, // 循环
    });
    /* 创建动画-转身 */
    this.anims.create({
      key: "turn",
      frames: [{ key: "dude", frame: 4 }],
      frameRate: 20,
    });
    /* 创建动画-向右 */
    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });

    /* 创建碰撞器，控制碰撞。*/
    /*  人-平台 */
    this.physics.add.collider(player, platforms);
    /* 星星-平台 */
    this.physics.add.collider(stars, platforms);
    /* 人-星星（自定义监听事件）  */
    this.physics.add.overlap(player, stars, this.collectStar, null);
    /* 炸弹-平台  */
    this.physics.add.collider(bombs, platforms);
    /* 人-炸弹（自定义监听事件）  */
    this.physics.add.collider(player, bombs, this.hitBomb, null);

    /* 获取键盘管理器对象*/
    cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    if (gameOver) {
      return;
    }
    /* 向左被按下 */
    if (cursors.left.isDown) {
      player.setVelocityX(-160);

      player.anims.play("left", true);
    } else if (cursors.right.isDown) {
      /* 向右被按下 */
      player.setVelocityX(160);

      player.anims.play("right", true);
    } else {
      /* 都没被按下，置为初始值 */
      player.setVelocityX(0);

      player.anims.play("turn");
    }
    /* 向上被按下，并且下边缘在与平台接触时，设置向上的速度 */
    if (cursors.up.isDown && player.body.touching.down) {
      player.setVelocityY(-620);
    }
  }
}

/* 游戏设置 */
const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: "#eee",
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 },
    },
  },
  scale: {
    mode: Phaser.Scale.ScaleModes.FIT,
    autoCenter: Phaser.Scale.Center.CENTER_BOTH,
  },
  scene: GameScene,
};

window.onload = () => {
  new Phaser.Game(config);
};

/* 玩家 */
var player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
/* 碰撞的平台 */
var platforms: Phaser.Physics.Arcade.StaticGroup;
/* 光标 */
var cursors: Phaser.Types.Input.Keyboard.CursorKeys;
/* 星星 */
var stars: Phaser.Physics.Arcade.Group;
/* 分数的值 */
var score = 0;
/* 分数文案 */
var scoreText: Phaser.GameObjects.Text;
/* 炸弹 */
var bombs: Phaser.Physics.Arcade.Group;
/* 游戏结束 */
var gameOver = false;
