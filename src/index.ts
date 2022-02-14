import 'phaser';

class GameScene extends Phaser.Scene {
    
    preload() {
        this.load.image('ball', 'assets/why.png')
    }
    create() {

    }
}

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#eee',
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scale: {
        mode: Phaser.Scale.ScaleModes.FIT,
        autoCenter: Phaser.Scale.Center.CENTER_BOTH
    },
    scene: GameScene
}

window.onload = () => {
    const game = new Phaser.Game(config)
}
console.log("this is end")