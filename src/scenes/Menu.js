class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload(){
        this.load.image('menu', './assets/menu(bad).png');
    }

    create() {
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.menuimg = this.add.image(0, 0, 'menu').setOrigin(0, 0);
    }

    update(){
        

        if (Phaser.Input.Keyboard.JustDown(keyENTER)) {
            this.scene.start("playScene");
        }
    }
}