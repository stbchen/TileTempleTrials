class Victory extends Phaser.Scene {
    constructor() {
        super("victoryScene");
    }

    preload(){
        this.load.image('victory', './assets/GameOver(bad).png');
    }

    create() {
        bgm.stop();
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.menuimg = this.add.image(0, 0, 'victory').setOrigin(0, 0);
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(keyENTER)) {
            this.scene.start("menuScene");
        }
    }
}