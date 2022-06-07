class Victory extends Phaser.Scene {
    constructor() {
        super("victoryScene");
    }

    preload(){
        this.load.image('bg', './assets/menuBG.png');
        this.load.spritesheet('victory', './assets/victory.png', {frameWidth: 640, frameHeight: 320, startFrame: 0, endFrame: 1});
    }

    create() {
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        this.anims.create({
           key: 'victory_anim',
           frames: this.anims.generateFrameNumbers('victory', {start: 0, end: 1, first: 0}),
           frameRate: 4,
           repeat: -1
        });

        bgm.stop();
        this.add.image(0, 0, 'bg').setOrigin(0);
        let rect = this.add.rectangle(0, 0, game.config.width, game.config.height, 0xFFFFFF).setOrigin(0);
        let victory_sprite = this.add.sprite(100, 0, 'victory').setOrigin(0).setAlpha(0).play('victory_anim');

        this.tweens.add({
            targets: [victory_sprite],
            alpha: 1,
            x: 50,
            duration: 750,
            ease: 'Sine.easeOut'
        });
        this.tweens.add({
            targets: [rect],
            alpha: 0.5,
            duration: 750,
            ease: 'Sine.easeOut'
        });
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(keyESC)) {
            this.scene.start("menuScene");
        }
    }
}