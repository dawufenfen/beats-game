import "phaser";

class GameScene extends Phaser.Scene {

  /* 加载资源 */
  preload() {
    this.load.image("journey", "assets/journey.jpg");
  }

  create() {
    /* 背景 */
    this.add.image(0, 0, "journey").setDisplaySize(1200, 600).setOrigin(0, 0);
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