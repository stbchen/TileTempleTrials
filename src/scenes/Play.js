class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('bg', './assets/background.png');
        this.load.image('block_off', './assets/block_off.png');
        this.load.image('block_on', './assets/block_on.png');
        this.load.image('target', './assets/target.png');
        this.load.image('wall', './assets/wall.png');
        this.load.image('block_danger', './assets/block_danger.png');
        this.load.image('player_danger', './assets/player_danger.png');

        this.load.spritesheet('player_walk', './assets/PlayerWalk.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 1});
        this.load.spritesheet('player_walk_back', './assets/PlayerWalkBack.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 1});

        this.load.atlas('player', './assets/playerAtlas.png', './assets/playerAtlas.json');

        this.load.audio('sfx_step', './assets/step.mp3');
        this.load.audio('sfx_push', './assets/push.mp3');
    }

    create() {
        // Create background
        this.add.tileSprite(0, 0, game.config.width, game.config.height, 'bg').setOrigin(0, 0);
        
        // Create walls
        this.walls = this.physics.add.group();
        for (var i = 0; i < game.config.width; i += 32) {
            this.walls.add(this.physics.add.image(i, 0, 'wall').setOrigin(0, 0.33).setSize(32, 32).setOffset(0, 16)); 
        }

        //Create target block
        this.target = this.physics.add.image(32*Phaser.Math.Between(6, 18), 32*Phaser.Math.Between(1, 6), 'target').setOrigin(0);
        this.target.setCollideWorldBounds(true);
        this.target.immovable = true;

        this.walls.add(this.physics.add.image(this.target.x, this.target.y - 32, 'wall').setOrigin(0, 0.33).setSize(32, 32).setOffset(0, 16));
        this.walls.add(this.physics.add.image(this.target.x + 32, this.target.y - 32, 'wall').setOrigin(0, 0.33).setSize(32, 32).setOffset(0, 16));
        this.walls.add(this.physics.add.image(this.target.x - 32, this.target.y - 32, 'wall').setOrigin(0, 0.33).setSize(32, 32).setOffset(0, 16));
        this.walls.add(this.physics.add.image(this.target.x + 32, this.target.y, 'wall').setOrigin(0, 0.33).setSize(32, 32).setOffset(0, 16));
        this.walls.add(this.physics.add.image(this.target.x - 32, this.target.y, 'wall').setOrigin(0, 0.33).setSize(32, 32).setOffset(0, 16));

        // Create the player sprite
        this.player = this.physics.add.sprite(32, 64, 'player').setOrigin(0, 0.5);
        this.player.setSize(32, 32).setOffset(0, 32);
        this.player.setCollideWorldBounds(true);
        this.player.grab = false
        this.player.moveSpeed = 200;

        // Create the block sprite
        this.block = this.physics.add.image(64, 64, 'block_off').setOrigin(0, 0.33)
        this.block.setSize(32, 32).setOffset(0, 16);
        this.block.setCollideWorldBounds(true);
        this.walls.add(this.block);

        for (var i = 0; i < game.config.width; i += 32) {
            this.walls.add(this.physics.add.image(i, game.config.height - 32, 'wall').setOrigin(0, 0.33).setSize(32, 32).setOffset(0, 16)); 
        }

        this.add.text(10, game.config.height - 50, 'Use WASD to move\nHold SHIFT while moving to push or pull block\nPress ESC to return to main menu', {fill: "#0349fc", backgroundColor: "#e67607"});


        // Add controls
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keySHIFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        // Player animations

        // Down
        this.anims.create({
            key: 'downIdle',
            frames: this.anims.generateFrameNames('player', {
                prefix: 'downIdle',
                start: 0,
                end: 0,
                zeroPad: 1
            }),
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: 'downWalk',
            frames: this.anims.generateFrameNames('player', {
                prefix: 'downWalk',
                start: 0,
                end: 3,
                zeroPad: 1
            }),
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: 'downGrab',
            frames: this.anims.generateFrameNames('player', {
                prefix: 'downGrab',
                start: 0,
                end: 0,
                zeroPad: 1
            }),
            frameRate: 4,
            repeat: -1
        });

        // Up
        this.anims.create({
            key: 'upIdle',
            frames: this.anims.generateFrameNames('player', {
                prefix: 'upIdle',
                start: 0,
                end: 0,
                zeroPad: 1
            }),
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: 'upWalk',
            frames: this.anims.generateFrameNames('player', {
                prefix: 'upWalk',
                start: 0,
                end: 3,
                zeroPad: 1
            }),
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: 'upGrab',
            frames: this.anims.generateFrameNames('player', {
                prefix: 'upGrab',
                start: 0,
                end: 0,
                zeroPad: 1
            }),
            frameRate: 4,
            repeat: -1
        });

        // Side
        this.anims.create({
            key: 'sideIdle',
            frames: this.anims.generateFrameNames('player', {
                prefix: 'sideIdle',
                start: 0,
                end: 0,
                zeroPad: 1
            }),
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: 'sideWalk',
            frames: this.anims.generateFrameNames('player', {
                prefix: 'sideWalk',
                start: 0,
                end: 3,
                zeroPad: 1
            }),
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: 'sideGrab',
            frames: this.anims.generateFrameNames('player', {
                prefix: 'sideGrab',
                start: 0,
                end: 0,
                zeroPad: 1
            }),
            frameRate: 4,
            repeat: -1
        });
        

        this.player.play('sideIdle');

        // Load sfx
        this.step_sfx = this.sound.add('sfx_step').setLoop(false);
        this.push_sfx = this.sound.add('sfx_push').setLoop(false);
    }

    update() {
        this.wall_check(this.player);
        this.wall_check(this.block);
        //console.log('PLAYER\n left: ' + this.player.wallL + '\nright: ' + this.player.wallR + '\n   up: ' + this.player.wallU + '\n down: ' + this.player.wallD);
        //console.log('BLOCK\n left: ' + this.block.wallL + '\nright: ' + this.block.wallR + '\n   up: ' + this.block.wallU + '\n down: ' + this.block.wallD);


        // Checking if player is in tile, then call input function
        if (this.player.x % 16 == 0 && this.player.y % 16 == 0) {
            this.player_input();
        } else {
            //this.player.anims.play('idle');
            //this.steps_sfx.stop();
        }
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
        if (keyW.isDown && !keyA.isDown && !keyD.isDown && !this.player.wallU) {
            this.player.play('upIdle');
            // if (this.player.anims.currentAnim.key != 'walk') {
            //     this.player.anims.play('walk');
            // }
            if (this.player.grab && !this.block.wallU) {
                this.push_sfx.play();
                this.player.moveSpeed = pushSpeed;
                this.tweens.add ({
                    targets: [this.block],
                    y: this.block.y - 32,
                    duration: this.player.moveSpeed,
                    ease: 'Power1'
                });
            } else {
                this.player.moveSpeed = walkSpeed;
            }
            if (!(this.player.x == this.block.x && this.player.y == this.block.y + 32 && this.block.wallU)) {
                this.step_sfx.play();
                this.tweens.add ({
                    targets: [this.player],
                    y: this.player.y - 32,
                    duration: this.player.moveSpeed,
                    ease: 'Power1'
                });
            }
        }
        
        // Move the player down
        if (keyS.isDown && !keyA.isDown && !keyD.isDown && !this.player.wallD) {
            this.player.play('downIdle');
            // if (this.player.anims.currentAnim.key != 'walk') {
            //     this.player.anims.play('walk');
            // }
            if (this.player.grab && !this.block.wallD) {
                this.push_sfx.play();
                this.player.moveSpeed = pushSpeed;
                this.tweens.add ({
                    targets: [this.block],
                    y: this.block.y + 32,
                    duration: this.player.moveSpeed,
                    ease: 'Power1'
                });
            } else {
                this.player.moveSpeed = walkSpeed;
            }
            if (!(this.player.x == this.block.x && this.player.y == this.block.y - 32 && this.block.wallD)) {
                this.step_sfx.play();
                this.tweens.add({
                    targets: [this.player],
                    y: this.player.y + 32,
                    duration: this.player.moveSpeed,
                    ease: 'Power1'
                });
            }
        }

        // Move the player left
        if (keyA.isDown && !keyW.isDown && !keyS.isDown && !this.player.wallL) {
            this.player.play('sideIdle');
            this.player.flipX = true;
            // if (this.player.anims.currentAnim.key != 'walk') {
            //     this.player.anims.play('walk');
            // }
            if (this.player.grab && !this.block.wallL) {
                this.push_sfx.play();
                this.player.moveSpeed = pushSpeed;
                this.tweens.add ({
                    targets: [this.block],
                    x: this.block.x - 32,
                    duration: this.player.moveSpeed,
                    ease: 'Power1'
                });
            } else {
                this.player.moveSpeed = walkSpeed;
            }
            if (!(this.player.x == this.block.x + 32 && this.player.y == this.block.y && this.block.wallL)) {
                this.step_sfx.play();
                this.tweens.add({
                    targets: [this.player],
                    x: this.player.x - 32,
                    duration: this.player.moveSpeed,
                    ease: 'Power1'
                });
            }
        }

        // Move the player right
        if (keyD.isDown && !keyW.isDown && !keyS.isDown && !this.player.wallR) {
            this.player.play('sideIdle');
            this.player.flipX = false;
            // if (this.player.anims.currentAnim.key != 'walk') {
            //     this.player.anims.play('walk');
            // }
            if (this.player.grab && !this.block.wallR) {
                this.push_sfx.play();
                this.player.moveSpeed = pushSpeed;
                this.tweens.add ({
                    targets: [this.block],
                    x: this.block.x + 32,
                    duration: this.player.moveSpeed,
                    ease: 'Power1'
                });
            } else {
                this.player.moveSpeed = walkSpeed;
            }
            if (!(this.player.x == this.block.x - 32 && this.player.y == this.block.y && this.block.wallR)) {
                this.step_sfx.play();
                this.tweens.add({
                    targets: [this.player],
                    x: this.player.x + 32,
                    duration: this.player.moveSpeed,
                    ease: 'Power1'
                });
            }
        }
    }

    wall_check(object) {
        object.wallL = false;
        object.wallR = false;
        object.wallU = false;
        object.wallD = false;

        this.wallsArray = this.walls.getChildren();
        for (const wall of this.wallsArray) {
            if (wall == this.block && this.player.grab) {
                continue;
            }
            if (object.x == wall.x + 32 && object.y == wall.y) {
                object.wallL = true;
            }

            if (object.x == wall.x - 32 && object.y == wall.y) {
                object.wallR = true;
            }

            if (object.x == wall.x && object.y == wall.y + 32) {
                object.wallU = true;
            }

            if (object.x == wall.x && object.y == wall.y - 32) {
                object.wallD = true;
            }
        }
    }
}