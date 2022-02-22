import "phaser";

class GameScene extends Phaser.Scene {

  /* 加载资源 */
  preload() {
    this.load.image("journey", "assets/journey.jpg");
    this.load.image("ground", "assets/ground.jpg");

    /* 根据这里的单位宽高来计算每一帧显示的图片的位置 */
    this.load.spritesheet("dude", "assets/dude.png", {
      frameWidth: 32,
      frameHeight: 48,
    });
  }

  create() {
    /* 背景 */
    this.add.image(0, 0, "journey").setDisplaySize(1200, 600).setOrigin(0, 0);

    /* 物理初始化，并放上几块木板 */
    platforms = this.physics.add.staticGroup();
    platforms.create(100, 300, "ground").setDisplaySize(200, 20).refreshBody();
    platforms.create(1100, 400, "ground").setDisplaySize(200, 20).refreshBody();
    platforms.create(600, 500, "ground").setDisplaySize(200, 20).refreshBody();
    platforms.create(300, 400, "ground").setDisplaySize(200, 20).refreshBody();
    platforms.create(800, 200, "ground").setDisplaySize(200, 20).refreshBody();
    platforms.create(600, 590, "ground").setDisplaySize(1200, 20).refreshBody();

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

  }

  update() {
  }
}

/* 游戏设置 */
const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 1200,
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