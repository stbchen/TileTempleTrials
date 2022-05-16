class Level2 extends Phaser.Scene {
    constructor() {
        super("level2");
    }

    preload() {
        this.load.image('player_sprite', './assets/player.png');
        this.load.image('background_img', './assets/floor1.png');
        this.load.image('block_off', './assets/block_off.png');
        this.load.image('block_on', './assets/block_on.png');
        this.load.image('target', './assets/target.png');
    
        this.load.spritesheet('player_walk', './assets/PlayerWalk.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 1});
        this.load.spritesheet('player_walk_back', './assets/PlayerWalkBack.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 1});
    
        this.load.audio('footsteps', './assets/FootstepsPush.wav');
        //this.load.audio('footsteps_push', './assets/FootstepsPush.wav');
      }
    
      create() {
        // Create background
        console.log()
        this.add.tileSprite(0, 0, game.config.width, game.config.height, 'background_img').setOrigin(0, 0);
    
        // Create the player sprite
        this.player = this.physics.add.sprite(32, 64, 'player_walk').setOrigin(0, 0);
        this.player.setCollideWorldBounds(true);
        this.player.grab = false
        
        // String to save user input for direction
        this.pos = "";
    
        //Create target block
        this.target = this.physics.add.image(576, 160, 'target').setOrigin(0, 0);
        this.target.setCollideWorldBounds(true);
        this.target.immovable = true;
    
        // Create the block sprite
        this.block = this.physics.add.image(64, 64, 'block_off').setOrigin(0, 0);
        this.block.setCollideWorldBounds(true);
        this.block.immovable = true;
    
        this.add.text(10, 10, 'YOU BEAT LEVEL 1 YAY!\nPress ESC to return to main menu', {fill: "#0349fc", backgroundColor: "#e67607"});
    
    
        // Add controls
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keySHIFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    
    
        // Player animations
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('player_walk', {start: 0, start: 0, first: 0}),
            frameRate: 1,
            repeat: -1
        })
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('player_walk', {start: 0, start: 1, first: 0}),
            frameRate: 12,
            repeat: -1
        })
        this.player.anims.play('idle');
    
        // Load sfx
        this.steps_sfx = this.sound.add('footsteps').setLoop(false);
    
        
      }
    
    }