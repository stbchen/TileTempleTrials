class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload(){
        this.load.image('menu', './assets/menu(bad).png');
        this.load.audio('bgm', './assets/bgm.mp3');
    }

    create() {
        floor = 0;
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.menuimg = this.add.image(0, 0, 'menu').setOrigin(0, 0);
        bgm = this.sound.add('bgm').setLoop(true);
        bgm.stop();
        bgm.play({volume: 0.25});
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(keyENTER)) {
            this.scene.start("playScene");
        }
    }
}