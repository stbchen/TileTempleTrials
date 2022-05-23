class Play extends Phaser.Scene {
  constructor() {
      super("playScene");
  }

  preload() {
    this.load.image('player_sprite', './assets/PlayerResize.png');
    this.load.image('background_img', './assets/background.png');
    this.load.image('player_sprite', './assets/player.png');
    this.load.image('floor1', './assets/background.png');
    this.load.image('block_off', './assets/block_off.png');
    this.load.image('block_on', './assets/block_on.png');
    this.load.image('target', './assets/target.png');
    this.load.image('wall', './assets/block.png');

    this.load.spritesheet('player_walk', './assets/PlayerWalk.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 1});
    this.load.spritesheet('player_walk_back', './assets/PlayerWalkBack.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 1});

    this.load.audio('footsteps', './assets/Footsteps.wav');
    this.load.audio('footsteps_push', './assets/FootstepsPush.wav');

    //this.load.scenePlugin('GridPhysics', 'https://raw.githubusercontent.com/nkholski/phaser-grid-physics/master/dist/GridPhysics.min.js', 'gridphysics', 'gridphysics');
  }

  create() {
    // Physics from Nathan Altice's MovementStudies repo
    // variables and settings
    this.ACCELERATION = 500;
    this.MAX_X_VEL = 250;   // pixels/second
    this.MAX_Y_VEL = 250;
    this.DRAG = 700;    // DRAG < ACCELERATION = icy slide
    //this.physics.world.gravity.y = 2600;
    //this.physics.world.gravity.x = 2600;


    // Create background
    this.add.tileSprite(0, 0, game.config.width, game.config.height, 'floor1').setOrigin(0, 0);

    //Create target block
    this.target = this.physics.add.image(32*Phaser.Math.Between(6, 18), 32*Phaser.Math.Between(1, 7), 'target').setOrigin(0);
    this.target.setCollideWorldBounds(true);
    this.target.immovable = true;

    // Create the player sprite
    this.player = this.physics.add.sprite(32, 64, 'player_sprite').setOrigin(0, 0.5);
    this.player.setSize(32, 32).setOffset(0, 32);
    this.player.setCollideWorldBounds(true);
    this.player.grab = false;
    this.player.setMaxVelocity(this.MAX_X_VEL, this.MAX_Y_VEL);
    // this.player.body.setFrictionX(10000);
    // this.player.body.setFrictionY(10000);

    // Walls
    this.wall = this.physics.add.image(96, 64, 'wall').setOrigin(0);
    
    // String to save user input for direction
    this.pos = "";

    // Create the block sprite
    this.block = this.physics.add.image(64, 64, 'block_off').setOrigin(0, 0.33)
    this.block.setSize(32, 32).setOffset(0, 16);
    this.block.setCollideWorldBounds(true);
    this.block.immovable = true;
    // this.block.setFrictionX(10000);
    // this.block.setFrictionY(10000);

    this.physics.add.collider(this.player, this.block);
    this.add.text(10, game.config.height - 50, 'Use WASD to move\nHold SHIFT while moving to push or pull block\nPress ESC to return to main menu', {fill: "#0349fc", backgroundColor: "#e67607"});


    // Add controls
    keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    keySHIFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
    keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

    // Player animations
    // this.anims.create({
    //     key: 'idle',
    //     frames: this.anims.generateFrameNumbers('player_walk', {start: 0, start: 0, first: 0}),
    //     frameRate: 1,
    //     repeat: -1
    // })
    // this.anims.create({
    //     key: 'walk',
    //     frames: this.anims.generateFrameNumbers('player_walk', {start: 0, start: 1, first: 0}),
    //     frameRate: 12,
    //     repeat: -1
    // })
    //this.player.anims.play('idle');

    // Load sfx
    this.steps_sfx = this.sound.add('footsteps').setLoop(false);
    this.steps_push_sfx = this.sound.add('footsteps_push').setLoop(false);

    
  }

    update() {
        // Checking if player is in tile, then call input function
        //if (this.player.x % 16 == 0 && this.player.y % 16 == 0) {
        this.player_input();
        this.player.body.setDragX(this.DRAG);
        this.player.body.setDragY(this.DRAG);
        this.block.body.setDragX(this.DRAG);
        this.block.body.setDragY(this.DRAG);


        // } else {
        //     console.log("y: " + this.player.y + " temp: " + (this.temp - 32));
        //     if (this.player.y == this.temp - 32 && this.pos == "up") {
        //         console.log("sad");
        //         this.player.setVelocityY(0);
        //     }
        //     //this.player.anims.play('idle');
        //     //this.steps_sfx.stop();
        // }
        // If shift key is held down, player can move block
        if (keySHIFT.isDown && (
            Math.abs(this.player.x - this.block.x) == 32 && this.player.y == this.block.y || 
            Math.abs(this.player.y - this.block.y) == 32 && this.player.x == this.block.x)) {
            //can put grab animation in here
            this.player.grab = true;
        } else {
            this.player.grab = false;
        }

        //go back to main menu
        if (keyESC.isDown) {
            this.scene.start('menuScene')
        }

        //check whether you have won or not
        if (this.block.x == this.target.x && this.block.y == this.target.y){
            this.physics.add.image(this.block.x, this.block.y, 'block_on').setOrigin(0);
            this.block.destroy();
            this.time.delayedCall(3000, () => {
                this.scene.restart();
            })
        }
    }

  player_input() {
    // Move the player up
    if (keyW.isDown) {
        // if (this.player.anims.currentAnim.key != 'walk') {
        //     this.player.anims.play('walk');
        // }

        // this.tweens.add ({
        //     targets: [this.player],
        //     y: this.player.y - 32,
        //     duration: 100,
        //     ease: 'Power1'
        // });
        this.temp = this.player.y;
        this.player.body.setVelocityY(-this.ACCELERATION);

        this.pos = "up";
        console.log("sadklsajdlas");
        if (this.player.grab) {
            this.steps_push_sfx.play();
            this.tweens.add ({
                targets: [this.block],
                y: this.block.y - 32,
                duration: 100,
                ease: 'Power1'
            });
        } else {
            this.steps_sfx.play();
        }
    }
    
    // Move the player down
    else if (keyS.isDown) {
        // if (this.player.anims.currentAnim.key != 'walk') {
        //     this.player.anims.play('walk');
        // }
        this.player.body.setVelocityY(this.ACCELERATION);

        // this.tweens.add({
        //     targets: [this.player],
        //     y: this.player.y + 32,
        //     duration: 100,
        //     ease: 'Power1'
        // });
        this.pos = "down";

        if (this.player.grab) {
            this.steps_push_sfx.play();
            this.tweens.add ({
                targets: [this.block],
                y: this.block.y + 32,
                duration: 100,
                ease: 'Power1'
            });
        } else {
            this.steps_sfx.play();
        }
    }

    // Move the player left
    else if (keyA.isDown) {
        // if (this.player.anims.currentAnim.key != 'walk') {
        //     this.player.anims.play('walk');
        // }
        this.player.body.setVelocityX(-this.ACCELERATION);

        // this.tweens.add({
        //     targets: [this.player],
        //     x: this.player.x - 32,
        //     duration: 100,
        //     ease: 'Power1'
        // });
        this.pos = "left";

        if (this.player.grab) {
            this.steps_push_sfx.play();
            this.tweens.add ({
                targets: [this.block],
                x: this.block.x - 32,
                duration: 100,
                ease: 'Power1'
            });
        } else {
            this.steps_sfx.play();
        }
    }

    // Move the player right
    else if (keyD.isDown) {
        // if (this.player.anims.currentAnim.key != 'walk') {
        //     this.player.anims.play('walk');
        // }
        this.player.body.setVelocityX(this.ACCELERATION);
        // this.tweens.add({
        //     targets: [this.player],
        //     x: this.player.x + 32,
        //     duration: 100,
        //     ease: 'Power1'
        // });
        this.pos = "right";

        if (this.player.grab) {
            this.steps_push_sfx.play();
            this.tweens.add ({
                targets: [this.block],
                x: this.block.x + 32,
                duration: 100,
                ease: 'Power1'
            });
        } else {
            this.steps_sfx.play();
        }
    }
    else {
        this.player.body.setAccelerationX(0);
        this.player.body.setDragX(this.DRAG);
    }
  }
}