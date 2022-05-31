class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload(){
        this.load.image('menu', './assets/menu(bad).png');
    }

    create() {
        floor = 1;
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.menuimg = this.add.image(0, 0, 'menu').setOrigin(0, 0);
    }

    update(){
        if (true/*Phaser.Input.Keyboard.JustDown(keyENTER)*/) {
            this.scene.start("playScene");
        }
    }
}