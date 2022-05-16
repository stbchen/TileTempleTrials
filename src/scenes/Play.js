class Play extends Phaser.Scene {
  constructor() {
      super("playScene");
  }

  preload() {
    this.load.image('player_sprite', './assets/player.png');
    this.load.image('background_img', './assets/background.png');
    this.load.image('block_img', './assets/block.png');

    this.load.spritesheet('player_walk', './assets/PlayerWalk.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 1});
    this.load.spritesheet('player_walk_back', './assets/PlayerWalkBack.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 1});

    this.load.audio('footsteps', './assets/FootstepsPush.wav');
    //this.load.audio('footsteps_push', './assets/FootstepsPush.wav');
  }

  create() {
    // Create background
    this.add.tileSprite(0, 0, game.config.width, game.config.height, 'background_img').setOrigin(0, 0);

    // Create the player sprite
    this.player = this.physics.add.sprite(32, 64, 'player_walk').setOrigin(0, 0);
    this.player.setCollideWorldBounds(true);
    this.player.grab = false
    
    // String to save user input for direction
    this.pos = "";

    // Create the block sprite
    this.block = this.physics.add.image(64, 64, 'block_img').setOrigin(0, 0);
    this.block.setCollideWorldBounds(true);
    this.block.immovable = true;

    this.add.text(10, 10, 'Use WASD to move\nHold SHIFT while moving to push block\nPress ESC to return to main menu', {fill: "#0349fc", backgroundColor: "#e67607"});

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

  update() {
    // Checking if player is in tile, then call input function
    if (this.player.x % 16 == 0 && this.player.y % 16 == 0) {
      this.player_input();
    } else {
        this.player.anims.play('idle');
        //this.steps_sfx.stop();
    }

    // If shift key is held down, player can move block
    if (keySHIFT.isDown && (Math.abs(this.player.x - this.block.x) < 20 || Math.abs(this.player.y - this.block.y) < 20)) {
        //can put grab animation in here
        this.player.grab = true
        this.box_collision();
    }

    if (keyESC.isDown) {
        this.scene.start('menuScene')
    }
  }

  player_input() {
    // Move the player up
    if (keyW.isDown) {
        if (this.player.anims.currentAnim.key != 'walk') {
            this.player.anims.play('walk');
        }
        this.steps_sfx.play();
        this.tweens.add({
            targets: [this.player],
            y: this.player.y - 32,
            duration: 100,
            ease: 'Power1'
        });
        this.pos = "up";
    }
    
    // Move the player down
    if (keyS.isDown) {
        if (this.player.anims.currentAnim.key != 'walk') {
            this.player.anims.play('walk');
        }
        this.steps_sfx.play();
        this.tweens.add({
            targets: [this.player],
            y: this.player.y + 32,
            duration: 100,
            ease: 'Power1'
        });
        this.pos = "down";
    }

    // Move the player left
    if (keyA.isDown) {
        if (this.player.anims.currentAnim.key != 'walk') {
            this.player.anims.play('walk');
        }
        this.steps_sfx.play();
        this.tweens.add({
            targets: [this.player],
            x: this.player.x - 32,
            duration: 100,
            ease: 'Power1'
        });
        this.pos = "left";
    }

    // Move the player right
    if (keyD.isDown) {
        if (this.player.anims.currentAnim.key != 'walk') {
            this.player.anims.play('walk');
        }
        this.steps_sfx.play();
        this.tweens.add({
            targets: [this.player],
            x: this.player.x + 32,
            duration: 100,
            ease: 'Power1'
        });
        this.pos = "right";
    }


  }

  playerBlockCollison() {
    this.physics.add.collider(this.player, this.block);
  }

  box_collision() {
    // Checking if player is above block, 
    if (this.block.y == this.player.y + 32 && this.block.x == this.player.x) {
      
      //if down is pressed then move block down
      if (this.pos == "down") {
        this.tweens.add({
          targets: [this.block],
          y: this.block.y + 32,
          duration: 100,
          ease: 'Power1'
        });
        this.pos = "";
      }

      //if up is pressed pull the block up
      if (this.pos == "up") {
        this.tweens.add({
          targets: [this.block],
          y: this.block.y - 32,
          duration: 100,
          ease: 'Power1'
        });
        this.pos = "";
      }
    }

    // Checking if player is below block, and if up is pressed then move block up
    if (this.block.y == this.player.y - 32 && this.block.x == this.player.x) {
      if (this.pos == "up") {
        this.tweens.add({
          targets: [this.block],
          y: this.block.y - 32,
          duration: 100,
          ease: 'Power1'
        });
        this.pos = "";
      }

      //if down is pressed then move block down
      if (this.pos == "down") {
        this.tweens.add({
          targets: [this.block],
          y: this.block.y + 32,
          duration: 100,
          ease: 'Power1'
        });
        this.pos = "";
      }
    }

    // Checking if player is to the left of the block 
    if (this.block.x == this.player.x + 32 && this.block.y == this.player.y) {
      
      //if right is pressed then move block right
      if (this.pos == "right") {
        this.tweens.add({
          targets: [this.block],
          x: this.block.x + 32,
          duration: 100,
          ease: 'Power1'
        });
        this.pos = "";
      }

      //if left is pressed then pull block left
      if (this.pos == "left") {
        this.tweens.add({
          targets: [this.block],
          x: this.block.x - 32,
          duration: 100,
          ease: 'Power1'
        });
        this.pos = "";
      }
    }

    // Checking if player is to the right of the block
    if (this.block.x == this.player.x - 32 && this.block.y == this.player.y) {
     
      //if left is pressed then move block left
      if (this.pos == "left") {
        this.tweens.add({
          targets: [this.block],
          x: this.block.x - 32,
          duration: 100,
          ease: 'Power1'
        });
        this.pos = "";
      }

      //if right is pressed then pull the block right
      if (this.pos == "right") {
        this.tweens.add({
          targets: [this.block],
          x: this.block.x + 32,
          duration: 100,
          ease: 'Power1'
        });
        this.pos = "";
      }
    }
  }
}