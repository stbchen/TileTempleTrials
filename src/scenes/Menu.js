class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(cursors.up)) {
            this.scene.start("playScene");
        }
    }
}