class Play extends Phaser.Scene {
  constructor() {
      super("playScene");
  }

  preload() {
    this.load.image('player_sprite', './assets/player.png');
    this.load.image('background_img', './assets/background.png');
    this.load.image('block_img', './assets/block.png');
  }

  create() {
    // Create background
    this.add.tileSprite(0, 0, game.config.width, game.config.height, 'background_img').setOrigin(0, 0);

    // Create the player sprite
    this.player = this.physics.add.sprite(0, 0, 'player_sprite').setOrigin(0, 0);
    this.player.setCollideWorldBounds(true);
    
    // String to save user input for direction
    this.pos = "";

    // Create the block sprite
    this.block = this.physics.add.image(32, 32, 'block_img').setOrigin(0, 0);
    this.block.setCollideWorldBounds(true);
    this.block.immovable = true;


    // Add controls
    this.addControls();

  }

  update() {
    // Checking if player is in tile, then call input function
    if (this.player.x % 16 == 0 && this.player.y % 16 == 0) {
      this.player_input();
    }

    // If shift key is held down, player can move block
    if (keySHIFT.isDown) {
    this.box_collision();
    }

  }

  player_input() {
    // Move the player up
    if (keyW.isDown) {
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
      this.tweens.add({
        targets: [this.player],
        x: this.player.x + 32,
        duration: 100,
        ease: 'Power1'
      });
      this.pos = "right";
    }


  }

  addControls() {
    // Adding keyboard controls
    keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    keySHIFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
  }

  playerBlockCollison() {
    this.physics.add.collider(this.player, this.block);
  }

  box_collision() {
    console.log("player x: " + this.player.x + " player y: " + this.player.y);
    console.log("block x: " + this.block.x + " block y: " + this.block.y);

    // Checking if player is above block, and if down is pressed then move block down
    if (this.block.y == this.player.y + 32 && this.block.x == this.player.x) {
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
    }

    // Checking if player is to the left of the block, and if right is pressed then move block right
    if (this.block.x == this.player.x + 32 && this.block.y == this.player.y) {
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

    // Checking if player is to the right of the block, and if left is pressed then move block left
    if (this.block.x == this.player.x - 32 && this.block.y == this.player.y) {
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
  }
}