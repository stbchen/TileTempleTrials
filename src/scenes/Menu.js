class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        this.load.spritesheet('block1', './assets/menu/menuBlock1.png', {frameWidth: 640, frameHeight: 320, startFrame: 0, endFrame: 3});
        this.load.spritesheet('block2', './assets/menu/menuBlock2.png', {frameWidth: 640, frameHeight: 320, startFrame: 0, endFrame: 3});
        this.load.spritesheet('block3', './assets/menu/menuBlock3.png', {frameWidth: 640, frameHeight: 320, startFrame: 0, endFrame: 3});
        this.load.spritesheet('cube', './assets/menu/menuCube.png', {frameWidth: 640, frameHeight: 320, startFrame: 0, endFrame: 3});
        this.load.spritesheet('temple', './assets/menu/menuTemple.png', {frameWidth: 640, frameHeight: 320, startFrame: 0, endFrame: 3});
        this.load.image('debris1', './assets/menu/menuDebris1.png');
        this.load.image('debris2', './assets/menu/menuDebris2.png');
        this.load.image('bg', './assets/menu/menuBG.png');
        this.load.image('logo1', './assets/menu/menuLogo1.png');
        this.load.image('logo2', './assets/menu/menuLogo2.png');
        this.load.image('logo3', './assets/menu/menuLogo3.png');

        this.load.image('buttonStart', './assets/menu/menuButtonStart.png');
        this.load.image('buttonLevel', './assets/menu/menuButtonLevel.png');
        this.load.image('buttonCredits', './assets/menu/menuButtonCredits.png');
        this.load.image('buttonBack', './assets/menu/menuButtonBack.png');

        this.load.image('button1', './assets/menu/menuButton1.png');
        this.load.image('button2', './assets/menu/menuButton2.png');
        this.load.image('button3', './assets/menu/menuButton3.png');
        this.load.image('button4', './assets/menu/menuButton4.png');
        this.load.image('button5', './assets/menu/menuButton5.png');
        this.load.image('button6', './assets/menu/menuButton6.png');
        this.load.image('button7', './assets/menu/menuButton7.png');
        this.load.image('button8', './assets/menu/menuButton8.png');

        this.load.image('credits', './assets/menu/menuCredits.png');

        this.load.audio('bgm', './assets/audio/bgm.mp3');
        this.load.audio('rumble', './assets/audio/rumble.mp3');
        this.load.audio('rumble2', './assets/audio/fall.mp3');
        this.load.audio('slam', './assets/audio/slam.mp3');
        this.load.audio('click', './assets/audio/click.mp3');
    }

    create() {
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
        let click = this.sound.add('click').setLoop(false);
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

            let credits = this.add.image(5, 28, 'credits').setOrigin(0).setScale(0.9).setAlpha(0);
            let levelButtonGroup = this.physics.add.group();
            for (let i = 1; i <= 8; i++) {
                if (i <= 4) {
                    levelButtonGroup.add(this.add.image(50 * i, 170, 'button' + i).setOrigin(0).setInteractive().setScale(0));
                } else {
                    levelButtonGroup.add(this.add.image(50 * (i - 4), 220, 'button' + i).setOrigin(0).setInteractive().setScale(0));
                }
            }
            let levelButtons = levelButtonGroup.getChildren();

            let buttonStart = this.add.sprite(65, 166, 'buttonStart').setOrigin(0).setInteractive();
            buttonStart.on('pointerover', () => {
                buttonStart.setAlpha(0.8);
            });
            buttonStart.on('pointerout', () => {
                buttonStart.setAlpha(1);
            });
            buttonStart.on('pointerdown', () => {
                click.play();
                floor = 0;
                this.scene.start('playScene');
            });

            let buttonLevel = this.add.image(65, 214, 'buttonLevel').setOrigin(0).setInteractive();
            buttonLevel.on('pointerover', () => {
                buttonLevel.setAlpha(0.8);
            });
            buttonLevel.on('pointerout', () => {
                buttonLevel.setAlpha(1);
            });
            buttonLevel.on('pointerdown', () => {
                click.play();
                buttonStart.setScale(0);
                buttonLevel.setScale(0);
                buttonCredits.setScale(0);
                for (const button of levelButtons) {
                    button.setScale(1);
                }
                buttonBack.setScale(1);
            });
            
            let buttonCredits = this.add.image(65, 262, 'buttonCredits').setOrigin(0).setInteractive();
            buttonCredits.on('pointerover', () => {
                buttonCredits.setAlpha(0.8);
            });
            buttonCredits.on('pointerout', () => {
                buttonCredits.setAlpha(1);
            });
            buttonCredits.on('pointerdown', () => {
                click.play();
                credits.setAlpha(1);
                buttonStart.setScale(0);
                buttonLevel.setScale(0);
                buttonCredits.setScale(0);
                buttonBack.setScale(1);
            });

            let buttonBack = this.add.image(10, 277, 'buttonBack').setOrigin(0).setInteractive().setScale(0);
            buttonBack.on('pointerover', () => {
                buttonBack.setAlpha(0.8);
            });
            buttonBack.on('pointerout', () => {
                buttonBack.setAlpha(1);
            });
            buttonBack.on('pointerdown', () => {
                click.play();
                credits.setAlpha(0);
                for (const button of levelButtons) {
                    button.setScale(0);
                }
                buttonStart.setScale(1);
                buttonLevel.setScale(1);
                buttonCredits.setScale(1);
                buttonBack.setScale(0);
            });

            for (const button of levelButtons) {
                button.on('pointerover', () => {
                    button.setAlpha(0.8);
                });
                button.on('pointerout', () => {
                    button.setAlpha(1);
                });
                button.on('pointerdown', () => {
                    click.play();
                    floor = button.texture.key.substring(6) - 1;
                    this.scene.start('playScene');
                });
            }

        });
    }
}