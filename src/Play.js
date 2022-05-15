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
    this.add.tileSprite(0, 0, game.config.width, game.config.height, 'background_img').setOrigin(0, 0);

    // Create the player sprite
    this.player = this.physics.add.sprite(0, 0, 'player_sprite');
    this.player.setCollideWorldBounds(true);

    // Adding keyboard controls
    keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

  }

  update() {
    console.log(this.player.x);
    if (this.player.x % 16 == 0 && this.player.y % 16 == 0) {
      this.player_input();
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
    }
    
    // Move the player down
    if (keyS.isDown) {
      this.tweens.add({
        targets: [this.player],
        y: this.player.y + 32,
        duration: 100,
        ease: 'Power1'
      });
    }

    // Move the player left
    if (keyA.isDown) {
      this.tweens.add({
        targets: [this.player],
        x: this.player.x - 32,
        duration: 100,
        ease: 'Power1'
      });
    }

    // Move the player right
    if (keyD.isDown) {
      this.tweens.add({
        targets: [this.player],
        x: this.player.x + 32,
        duration: 100,
        ease: 'Power1'
      });
    }

  }

}