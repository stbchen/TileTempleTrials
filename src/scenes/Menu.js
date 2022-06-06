class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload(){
        this.load.spritesheet('block1', './assets/menuBlock1.png', {frameWidth: 640, frameHeight: 320, startFrame: 0, endFrame: 3});
        this.load.spritesheet('block2', './assets/menuBlock2.png', {frameWidth: 640, frameHeight: 320, startFrame: 0, endFrame: 3});
        this.load.spritesheet('block3', './assets/menuBlock3.png', {frameWidth: 640, frameHeight: 320, startFrame: 0, endFrame: 3});
        this.load.spritesheet('cube', './assets/menuCube.png', {frameWidth: 640, frameHeight: 320, startFrame: 0, endFrame: 3});
        this.load.spritesheet('temple', './assets/menuTemple.png', {frameWidth: 640, frameHeight: 320, startFrame: 0, endFrame: 3});
        this.load.image('debris1', './assets/menuDebris1.png');
        this.load.image('debris2', './assets/menuDebris2.png');
        this.load.image('bg', './assets/menuBG.png');
        this.load.image('logo1', './assets/menuLogo1.png');
        this.load.image('logo2', './assets/menuLogo2.png');
        this.load.image('logo3', './assets/menuLogo3.png');

        this.load.audio('bgm', './assets/bgm.mp3');
        this.load.audio('rumble', './assets/rumble.mp3');
        this.load.audio('rumble2', './assets/fall.mp3');
        this.load.audio('slam', './assets/slam.mp3');
    }

    create() {
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        let framerate = 12;

        this.anims.create({
            key: 'block1_anim',
            frames: this.anims.generateFrameNumbers('block1', {start: 0, end: 3, first: 0}),
            frameRate: framerate,
            repeat: -1,
            yoyo: true
        });
        this.anims.create({
            key: 'block2_anim',
            frames: this.anims.generateFrameNumbers('block2', {start: 0, end: 3, first: 0}),
            frameRate: framerate,
            repeat: -1,
            yoyo: true
        });
        this.anims.create({
            key: 'block3_anim',
            frames: this.anims.generateFrameNumbers('block3', {start: 0, end: 3, first: 0}),
            frameRate: framerate,
            repeat: -1,
            yoyo: true
        });
        this.anims.create({
            key: 'cube_anim',
            frames: this.anims.generateFrameNumbers('cube', {start: 0, end: 3, first: 0}),
            frameRate: framerate,
            repeat: -1,
        });
        this.anims.create({
            key: 'temple_anim',
            frames: this.anims.generateFrameNumbers('temple', {start: 0, end: 3, first: 0}),
            frameRate: framerate,
            repeat: -1,
            yoyo: true
        });

        bgm = this.sound.add('bgm').setLoop(true);
        bgm.stop();

        this.add.image(game.config.width/2, game.config.height/2, 'bg').setScale(1.01);

        let rumble = this.sound.add('rumble').setLoop(false);
        let rumble2 = this.sound.add('rumble2').setLoop(false);
        let slam = this.sound.add('slam').setLoop(false);
        rumble.play({volume: 0.5});

        let debris1 = this.add.image(0, game.config.height, 'debris1').setOrigin(0);
        let debris2 = this.add.image(0, game.config.height, 'debris2').setOrigin(0);
        let block1 = this.add.sprite(0, game.config.height, 'block1').setOrigin(0).play('block1_anim');
        let block2 = this.add.sprite(0, game.config.height, 'block2').setOrigin(0).play('block2_anim');
        let block3 = this.add.sprite(0, game.config.height, 'block2').setOrigin(0).play('block3_anim');
        let cube = this.add.sprite(0, game.config.height, 'cube').setOrigin(0).play('cube_anim');
        let temple = this.add.sprite(0, game.config.height, 'temple').setOrigin(0).play('temple_anim');

        let logo3 = this.add.image(game.config.width, game.config.height, 'logo3').setOrigin(0);
        let logo2 = this.add.image(0, game.config.height, 'logo2').setOrigin(0);
        let logo1 = this.add.image(game.config.width, 0, 'logo1').setOrigin(0);
        

        this.tweens.add ({
            targets: [debris1, debris2, block1, block2, block3, cube, temple],
            y: 0,
            duration: 3000,
            ease: 'Quad.easeInOut'
        });
        this.cameras.main.shake(3000, 0.005);


        this.time.delayedCall(2800, () => {
            rumble2.play();
            this.tweens.add ({
                targets: [debris1],
                y: 5,
                duration: 500,
                loop: -1,
                yoyo: true,
                ease: 'Quad.easeInOut'
            });
    
            this.tweens.add ({
                targets: [debris2],
                y: -5,
                duration: 400,
                loop: -1,
                yoyo: true,
                ease: 'Sine.easeInOut'
            });
    
            this.tweens.add ({
                targets: [block1],
                y: -7,
                duration: 700,
                loop: -1,
                yoyo: true,
                ease: 'Sine.easeInOut'
            });
    
            this.tweens.add ({
                targets: [block2],
                y: 7,
                duration: 600,
                loop: -1,
                yoyo: true,
                ease: 'Sine.easeInOut'
            });
            
            this.tweens.add ({
                targets: [block3],
                y: -3,
                duration: 700,
                loop: -1,
                yoyo: true,
                ease: 'Sine.easeInOut'
            });
    
            this.tweens.add ({
                targets: [cube],
                y: 2,
                duration: 700,
                loop: -1,
                yoyo: true,
                ease: 'Sine.easeInOut'
            });
        });

        this.time.delayedCall(3500, () => {
            this.tweens.add ({
                targets: [logo1, logo2, logo3],
                x: 0,
                y: 0,
                duration: 500,
                loop: 0,
                ease: 'Circ.easeIn'
            });
        });
        
        this.time.delayedCall(3900, () => {
            slam.play();
        })

        this.time.delayedCall(4000, () => {
            this.cameras.main.shake(100, 0.005);
            this.tweens.add({
                targets: [this.add.rectangle(0, 0, game.config.width, game.config.height, 0xFFFFFF).setOrigin(0).setAlpha(0).setDepth(10)],
                alpha: 1,
                duration: 100,
                yoyo: true,
                loop: 0,
                ease: 'Sine.easeIn'
            });
        });


        this.time.delayedCall(4100, () => {
            bgm.play({volume: 0.25});

            this.add.rectangle(160, 192, 160, 64, 0x8c8c8c).setDepth(0);
        });

        floor = 3;
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(keyENTER)) {
            this.scene.start("playScene");
        }
    }
}