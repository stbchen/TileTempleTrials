class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('grid', './assets/background.png');
        this.load.image('block_a', './assets/block_a.png');
        this.load.image('block_on', './assets/block_on.png');
        this.load.image('wall', './assets/wall.png');
        this.load.image('block_danger', './assets/block_danger.png');
        this.load.image('player_danger', './assets/player_danger.png');
        this.load.image('cracked_tile', './assets/cracked_tile.png');


        this.load.image('tileset', './assets/tileset.png');
        this.load.tilemapCSV('floor_1', './assets/floor_1.csv');
        this.load.tilemapCSV('floor_2', './assets/floor_2.csv');

        this.load.spritesheet('player_walk', './assets/PlayerWalk.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 1});
        this.load.spritesheet('player_walk_back', './assets/PlayerWalkBack.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 1});

        this.load.atlas('player', './assets/playerAtlas.png', './assets/playerAtlas.json');

        this.load.audio('sfx_step', './assets/step.mp3');
        this.load.audio('sfx_push', './assets/push.mp3');
    }

    create() {
        this.gameOver = false;
        // Load map
        this.map = this.make.tilemap({key: 'floor_' + floor, tileWidth: 32, tileHeight: 32});
        this.tileset = this.map.addTilesetImage('tileset', null, 32, 32, 0, 0);
        this.layer = this.map.createLayer(0, this.tileset, 0, 0);

        this.wallIDs = [3, 4, 5, 13, 15, 23, 24, 25, 40];
        this.crackedIDs = [33, 34, 35];
        this.spikesIDs = [42, 43, 44, 45, 50, 52, 53, 54, 55, 62, 63, 64, 65, 72, 73, 74];
        
        //this.add.tileSprite(0, 0, game.config.width, game.config.height, 'grid').setOrigin(0, 0).setAlpha(0.2);

        for (var i = 0; i < game.config.width; i += 32) {
            for (var j = 0; j < game.config.height; j += 32) {
                if (this.layer.getTileAtWorldXY(i, j).index === 40) {
                    this.physics.add.image(i, j, 'wall').setOrigin(0, 0.33).setDepth(j/32);
                }
            }
        }        

        // Create the player sprite
        this.player = this.physics.add.sprite(32, 160, 'player').setOrigin(0, 0.5);
        this.player.setSize(32, 32).setOffset(0, 32);
        this.player.setCollideWorldBounds(true);
        this.player.grab = false;
        this.player.grab1 = false;
        this.player.grab2 = false;
        this.player.grab3 = false;
        this.player.moveSpeed = walkSpeed;

        // Create the block sprites
        this.block1 = this.physics.add.image(64, 160, 'block_a').setOrigin(0, 0.33).setSize(32, 32).setOffset(0, 16);
        this.block2 = this.physics.add.image(64, 96, 'block_a').setOrigin(0, 0.33).setSize(32, 32).setOffset(0, 16);
        this.block3 = this.physics.add.image(64, 224, 'block_a').setOrigin(0, 0.33).setSize(32, 32).setOffset(0, 16);

        this.blocks = this.physics.add.group();
        this.blocks.add(this.block1);
        this.blocks.add(this.block2);
        this.blocks.add(this.block3);

        //this.instructions = this.add.text(10, game.config.height - 50, 'Use WASD to move\nHold SHIFT while moving to push or pull block\nPress ESC to return to main menu', {fill: "#0349fc", backgroundColor: "#e67607"});


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
            frameRate: 12,
            repeat: 0
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
            frameRate: 12,
            repeat: 0
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
            frameRate: 12,
            repeat: 0
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
        // setting depth levels
        this.player.setDepth(this.player.y/32);
        for (const block of this.blocks.getChildren()) {
            block.setDepth(block.y/32);

            if (block.x % 32 === 0 && block.y % 32 === 0 && 
                this.crackedIDs.includes(this.layer.getTileAtWorldXY(block.x, block.y).index)) {
                this.gameOver = true;
                this.physics.add.image(block.x, block.y, 'cracked_tile').setOrigin(0);
                block.setDepth(1).setOrigin(0.5, 0.33);
                block.x += 16;
                this.tweens.add ({
                    targets: [block],
                    y: block.y + 24,
                    scaleX: 0,
                    scaleY: 0,
                    duration: 1500,
                    ease: 'Power1'
                });
                this.time.delayedCall(3000, () => {
                    this.scene.restart();
                });
            }
        }

        //checking for hazards
        
        if (this.player.x % 32 === 0 && this.player.y % 32 === 0 &&
            this.spikesIDs.includes(this.layer.getTileAtWorldXY(this.player.x, this.player.y).index)) {
            this.gameOver = true;
            this.player.setOrigin(0.5);
            this.player.x += 16;
            this.tweens.add ({
                targets: [this.player],
                alpha: 0,
                duration: 1500,
                ease: 'Power1'
            });
            this.tweens.add ({
                targets: [this.add.rectangle(0, 0, game.config.width, game.config.height, 0xc40000).setOrigin(0).setAlpha(0).setDepth(11)],
                alpha: 0.5,
                duration: 1500,
                ease: 'Power1'
            });
            this.time.delayedCall(3000, () => {
                this.scene.restart();
            });
        }

        //check if block is on target
            //TO DO MULTIPLE BLOCKS, RUN A FOR LOOP AND INCREMENT A COUNTER FOR EACH TARGET TILE
        /*if (this.block.x % 32 === 0 && this.block.y % 32 === 0 &&
            this.layer.getTileAtWorldXY(this.block.x, this.block.y).index === 30) {
            this.gameOver = true;
            this.physics.add.image(this.block.x, this.block.y, 'block_on').setOrigin(0).setDepth(this.block.y/32);
            this.block.destroy();
            this.time.delayedCall(3000, () => {
                floor++;
                if (floor === 2) {
                    this.scene.start('victoryScene');
                } else {
                    this.scene.restart();
                }
            });
        } */

        // Checking if player is in tile, then call input function
        if (this.player.x % 32 == 0 && this.player.y % 32 == 0 && !this.gameOver) {
            if (!this.player.grab) {
                this.player_input();
            }
            if (this.player.grab1) {
                this.player_input(this.block1);
            }
            if (this.player.grab2) {
                this.player_input(this.block2);
            }
            if (this.player.grab3) {
                this.player_input(this.block3);
            }
        }
        // If shift key is held down, player can move block
        if (keySHIFT.isDown) {
            if ((Math.abs(this.player.x - this.block1.x) == 32 && this.player.y == this.block1.y) || 
                (this.player.x == this.block1.x && Math.abs(this.player.y - this.block1.y) == 32)) {
                this.player.grab = true;
                this.player.grab1 = true
                this.player.grab2 = false;
                this.player.grab3 = false
            }
            if ((Math.abs(this.player.x - this.block2.x) == 32 && this.player.y == this.block2.y) || 
                (this.player.x == this.block2.x && Math.abs(this.player.y - this.block2.y) == 32)) {
                this.player.grab = true;
                this.player.grab1 = false
                this.player.grab2 = true;
                this.player.grab3 = false
            }
            if ((Math.abs(this.player.x - this.block3.x) == 32 && this.player.y == this.block3.y) || 
                (this.player.x == this.block3.x && Math.abs(this.player.y - this.block3.y) == 32)) {
                this.player.grab = true;
                this.player.grab1 = false
                this.player.grab2 = false;
                this.player.grab3 = true;
            }
        } else {
            this.player.grab = false;
            this.player.grab1 = false
            this.player.grab2 = false;
            this.player.grab3 = false;
        }

        //go back to main menu
        if (keyESC.isDown) {
            this.scene.start('menuScene')
        }
    }

    player_input(block = null) {
        var tile;
        if (keyW.isDown && !keyA.isDown && !keyD.isDown) {
            if (block != null && this.player.x === block.x && this.player.y === block.y + 32) {
                if (this.player.grab) {
                    this.player.moveSpeed = pushSpeed;
                    tile = this.layer.getTileAtWorldXY(block.x, block.y - 32);
                    if (!this.wallIDs.includes(tile.index)) {
                        this.player.play('upGrab');
                        this.push_sfx.play();
                        this.player.moveSpeed = pushSpeed;
                        this.tweens.add ({
                            targets: [block],
                            y: block.y - 32,
                            duration: this.player.moveSpeed,
                            ease: 'Power1'
                        });
                    }
                } else {
                    tile = this.layer.getTileAtWorldXY(0, 0);
                }
            } else if (block != null && this.player.x === block.x && this.player.y === block.y - 32) {
                if (this.player.grab) {
                    this.player.moveSpeed = pushSpeed;
                    tile = this.layer.getTileAtWorldXY(this.player.x, this.player.y - 32);
                    if (!this.wallIDs.includes(tile.index)) {
                        this.player.play('downGrab');
                        this.push_sfx.play();
                        this.player.moveSpeed = pushSpeed;
                        this.tweens.add ({
                            targets: [block],
                            y: block.y - 32,
                            duration: this.player.moveSpeed,
                            ease: 'Power1'
                        });
                    }
                } else {
                    this.player.play('upIdle');
                    this.player.moveSpeed = walkSpeed;
                    tile = this.layer.getTileAtWorldXY(this.player.x, this.player.y - 32);
                }
            } else {
                this.player.play('upIdle');
                this.player.moveSpeed = walkSpeed;
                tile = this.layer.getTileAtWorldXY(this.player.x, this.player.y - 32);
            }

            if (block === null && ((this.player.x === this.block1.x && this.player.y === this.block1.y + 32) ||
                                   (this.player.x === this.block2.x && this.player.y === this.block2.y + 32) ||
                                   (this.player.x === this.block3.x && this.player.y === this.block3.y + 32))) {
                // do nothing
            } else if (!this.wallIDs.includes(tile.index)) {
                if (this.player.anims.currentAnim.key == 'upIdle') {
                    this.player.play('upWalk');
                }
                this.step_sfx.play();
                this.tweens.add ({
                    targets: [this.player],
                    y: this.player.y - 32,
                    duration: this.player.moveSpeed,
                    ease: 'Power1'
                });
            }
        }

        if (keyA.isDown && !keyW.isDown && !keyS.isDown) {
            if (block != null && this.player.x === block.x + 32 && this.player.y === block.y) {
                if (this.player.grab) {
                    this.player.moveSpeed = pushSpeed;
                    tile = this.layer.getTileAtWorldXY(block.x - 32, block.y);
                    if (!this.wallIDs.includes(tile.index)) {
                        this.player.play('sideGrab');
                        this.player.flipX = true;
                        this.push_sfx.play();
                        this.player.moveSpeed = pushSpeed;
                        this.tweens.add ({
                            targets: [block],
                            x: block.x - 32,
                            duration: this.player.moveSpeed,
                            ease: 'Power1'
                        });
                    }
                } else {
                    tile = this.layer.getTileAtWorldXY(0, 0);
                }
            } else if (block != null && this.player.x === block.x - 32 && this.player.y === block.y) {
                if (this.player.grab) {
                    this.player.moveSpeed = pushSpeed;
                    tile = this.layer.getTileAtWorldXY(this.player.x - 32, this.player.y);
                    if (!this.wallIDs.includes(tile.index)) {
                        this.player.play('sideGrab');
                        this.player.flipX = false;
                        this.push_sfx.play();
                        this.player.moveSpeed = pushSpeed;
                        this.tweens.add ({
                            targets: [block],
                            x: block.x - 32,
                            duration: this.player.moveSpeed,
                            ease: 'Power1'
                        });
                    }
                } else {
                    this.player.play('sideIdle');
                    this.player.flipX = true;
                    this.player.moveSpeed = walkSpeed;
                    tile = this.layer.getTileAtWorldXY(this.player.x - 32, this.player.y);
                }
            } else {
                this.player.play('sideIdle');
                this.player.flipX = true;
                this.player.moveSpeed = walkSpeed;
                tile = this.layer.getTileAtWorldXY(this.player.x - 32, this.player.y);
            }

            if (block === null && ((this.player.x === this.block1.x + 32 && this.player.y === this.block1.y) ||
                                   (this.player.x === this.block2.x + 32 && this.player.y === this.block2.y) ||
                                   (this.player.x === this.block3.x + 32 && this.player.y === this.block3.y))) {
                // do nothing
            } else if (!this.wallIDs.includes(tile.index)) {
                if (this.player.anims.currentAnim.key == 'sideIdle') {
                    this.player.play('sideWalk');
                }
                this.step_sfx.play();
                this.tweens.add ({
                    targets: [this.player],
                    x: this.player.x - 32,
                    duration: this.player.moveSpeed,
                    ease: 'Power1'
                });
            }
        }

        if (keyS.isDown && !keyA.isDown && !keyD.isDown) {
            if (block != null && this.player.x === block.x && this.player.y === block.y - 32) {
                if (this.player.grab) {
                    this.player.moveSpeed = pushSpeed;
                    tile = this.layer.getTileAtWorldXY(block.x, block.y + 32);
                    if (!this.wallIDs.includes(tile.index)) {
                        this.player.play('downGrab');
                        this.push_sfx.play();
                        this.player.moveSpeed = pushSpeed;
                        this.tweens.add ({
                            targets: [block],
                            y: block.y + 32,
                            duration: this.player.moveSpeed,
                            ease: 'Power1'
                        });
                    }
                } else {
                    tile = this.layer.getTileAtWorldXY(0, 0);
                }
            } else if (block != null && this.player.x === block.x && this.player.y === block.y + 32) {
                if (this.player.grab) {
                    this.player.moveSpeed = pushSpeed;
                    tile = this.layer.getTileAtWorldXY(this.player.x, this.player.y + 32);
                    if (!this.wallIDs.includes(tile.index)) {
                        this.player.play('upGrab');
                        this.push_sfx.play();
                        this.player.moveSpeed = pushSpeed;
                        this.tweens.add ({
                            targets: [block],
                            y: block.y + 32,
                            duration: this.player.moveSpeed,
                            ease: 'Power1'
                        });
                    }
                } else {
                    this.player.play('downIdle');
                    this.player.moveSpeed = walkSpeed;
                    tile = this.layer.getTileAtWorldXY(this.player.x, this.player.y + 32);
                }
            } else {
                this.player.play('downIdle');
                this.player.moveSpeed = walkSpeed;
                tile = this.layer.getTileAtWorldXY(this.player.x, this.player.y + 32);
            }

            if (block === null && ((this.player.x === this.block1.x && this.player.y === this.block1.y - 32) ||
                                   (this.player.x === this.block2.x && this.player.y === this.block2.y - 32) ||
                                   (this.player.x === this.block3.x && this.player.y === this.block3.y - 32))) {
                // do nothing
            } else if (!this.wallIDs.includes(tile.index)) {
                if (this.player.anims.currentAnim.key == 'downIdle') {
                    this.player.play('downWalk');
                }
                this.step_sfx.play();
                this.tweens.add ({
                    targets: [this.player],
                    y: this.player.y + 32,
                    duration: this.player.moveSpeed,
                    ease: 'Power1'
                });
            }
        }

        if (keyD.isDown && !keyW.isDown && !keyS.isDown) {
            if (block != null && this.player.x === block.x - 32 && this.player.y === block.y) {
                if (this.player.grab) {
                    this.player.moveSpeed = pushSpeed;
                    tile = this.layer.getTileAtWorldXY(block.x + 32, block.y);
                    if (!this.wallIDs.includes(tile.index)) {
                        this.player.play('sideGrab');
                        this.player.flipX = false;
                        this.push_sfx.play();
                        this.player.moveSpeed = pushSpeed;
                        this.tweens.add ({
                            targets: [block],
                            x: block.x + 32,
                            duration: this.player.moveSpeed,
                            ease: 'Power1'
                        });
                    }
                } else {
                    tile = this.layer.getTileAtWorldXY(0, 0);
                }
            } else if (block != null && this.player.x === block.x + 32 && this.player.y === block.y) {
                if (this.player.grab) {
                    this.player.moveSpeed = pushSpeed;
                    tile = this.layer.getTileAtWorldXY(this.player.x + 32, this.player.y);
                    if (!this.wallIDs.includes(tile.index)) {
                        this.player.play('sideGrab');
                        this.player.flipX = true;
                        this.push_sfx.play();
                        this.player.moveSpeed = pushSpeed;
                        this.tweens.add ({
                            targets: [block],
                            x: block.x + 32,
                            duration: this.player.moveSpeed,
                            ease: 'Power1'
                        });
                    }
                } else {
                    this.player.play('sideIdle');
                    this.player.flipX = false;
                    this.player.moveSpeed = walkSpeed;
                    tile = this.layer.getTileAtWorldXY(this.player.x + 32, this.player.y);
                }
            } else {
                this.player.play('sideIdle');
                this.player.flipX = false;
                this.player.moveSpeed = walkSpeed;
                tile = this.layer.getTileAtWorldXY(this.player.x + 32, this.player.y);
            }

            if (block === null && ((this.player.x === this.block1.x - 32 && this.player.y === this.block1.y) ||
                                   (this.player.x === this.block2.x - 32 && this.player.y === this.block2.y) ||
                                   (this.player.x === this.block3.x - 32 && this.player.y === this.block3.y))) {
                // do nothing
            } else if (!this.wallIDs.includes(tile.index)) {
                if (this.player.anims.currentAnim.key == 'sideIdle') {
                    this.player.play('sideWalk');
                }
                this.step_sfx.play();
                this.tweens.add ({
                    targets: [this.player],
                    x: this.player.x + 32,
                    duration: this.player.moveSpeed,
                    ease: 'Power1'
                });
            }
        }        
    }
}