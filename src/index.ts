import "phaser";

class GameScene extends Phaser.Scene {

  /* 加载资源 */
  preload() {
    this.load.image("journey", "assets/journey.jpg");
    this.load.image("ground", "assets/ground.jpg");
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

/* 碰撞的平台 */
var platforms: Phaser.Physics.Arcade.StaticGroup;
