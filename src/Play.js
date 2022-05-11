class Play extends Phaser.Scene {
  constructor() {
      super("playScene");
  }

  preload() {
    this.load.image('player_sprite', './assets/player.png');
    this.load.image('background_img', './assets/background.png');
  }

  create() {
    // Create background
    this.add.image(0, 0, 'background_img').setOrigin(0, 0);

    // Create the player sprite
    this.player = this.physics.add.sprite(3 * game.config.width/4, 550, 'player_sprite');

    // Adding keyboard controls
    keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

  }

  update() {
    // Move the player left and right
    if (keyW.isDown) {
      this.player.y -= 1;
    }
    if (keyS.isDown) {
      this.player.y += 1;
    }

    // Move the player up and down
    if (keyA.isDown) {
      this.player.x -= 1;
    }
    if (keyD.isDown) {
      this.player.x += 1;
    }
  }

}