class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('wall', './assets/wall.png');
        this.load.image('locked_wall', './assets/wall_locked.png');
        this.load.image('laser_wall_D', './assets/wall_laser_D.png');
        this.load.image('laser_wall_L', './assets/wall_laser_L.png');
        this.load.image('laser_wall_R', './assets/wall_laser_R.png');
        this.load.image('laser_wall_U', './assets/wall_laser_U.png');
        this.load.image('laserV', './assets/laserV.png');
        this.load.image('laserH', './assets/laserH.png');

        this.load.image('cracked_tile', './assets/cracked_tile.png');
        this.load.image('instructions_0', './assets/instructions_0.png');
        this.load.image('instructions_1', './assets/instructions_1.png');
        this.load.image('instructions_2', './assets/instructions_2.png');
        this.load.image('instructions_3', './assets/instructions_3.png');
        this.load.image('instructions_4', './assets/instructions_4.png');
        this.load.image('instructions_5', './assets/instructions_5.png');
        this.load.image('instructions_6', './assets/instructions_6.png');
        this.load.image('instructions_7', './assets/instructions_7.png');
        this.load.image('grab', './assets/grab_outline.png');
        this.load.image('pause', './assets/pause.png');

        this.load.spritesheet('block_a', './assets/block_a.png', {frameWidth: 32, frameHeight: 48, startFrame: 0, endFrame: 1});
        this.load.spritesheet('block_b', './assets/block_b.png', {frameWidth: 32, frameHeight: 48, startFrame: 0, endFrame: 1});

        this.load.image('tileset', './assets/tileset.png');
        this.load.tilemapCSV('floor_0', './assets/floor_0.csv');
        this.load.image('floor_0_img', './assets/floor_0.png');
        this.load.tilemapCSV('floor_1', './assets/floor_1.csv');
        this.load.image('floor_1_img', './assets/floor_1.png');
        this.load.tilemapCSV('floor_2', './assets/floor_2.csv');
        this.load.image('floor_2_img', './assets/floor_2.png');
        this.load.tilemapCSV('floor_3', './assets/floor_3.csv');
        this.load.image('floor_3_img', './assets/floor_3.png');
        this.load.tilemapCSV('floor_4', './assets/floor_4.csv');
        this.load.image('floor_4_img', './assets/floor_4.png');
        this.load.tilemapCSV('floor_5', './assets/floor_5.csv');
        this.load.image('floor_5_img', './assets/floor_5.png');
        this.load.tilemapCSV('floor_6', './assets/floor_6.csv');
        this.load.image('floor_6_img', './assets/floor_6.png');
        this.load.tilemapCSV('floor_7', './assets/floor_7.csv');
        this.load.image('floor_7_img', './assets/floor_7.png');

        this.load.atlas('player', './assets/player_atlas.png', './assets/player_atlas.json');

        this.load.audio('sfx_step', './assets/step.mp3');
        this.load.audio('sfx_push', './assets/push.mp3');
        this.load.audio('sfx_click', './assets/slam.mp3');
        this.load.audio('sfx_spike', './assets/spike.wav');
        this.load.audio('sfx_door_open', './assets/door_open.mp3');
        this.load.audio('sfx_blockfall', './assets/fall.mp3');
        this.load.audio('sfx_laser', './assets/zap.mp3');

    }

    create() {
        //setting up variables for end of level
        this.completed = this.physics.add.group();
        this.goal = 0;
        this.gameOver = true;
        this.unlocked = false;

        // Load map
        this.map = this.make.tilemap({key: 'floor_' + floor, tileWidth: 32, tileHeight: 32});
        this.tileset = this.map.addTilesetImage('tileset', null, 32, 32, 0, 0);
        this.layer = this.map.createLayer(0, this.tileset, 0, 0);

        this.add.image(0, 0, 'floor_' + floor + '_img').setOrigin(0);

        this.wallIDs = [3, 4, 5, 6, 7, 13, 15, 16, 17, 23, 24, 25, 40, 71];
        this.crackedIDs = [33, 34, 35];
        this.spikesIDs = [42, 43, 44, 45, 50, 52, 53, 54, 55, 62, 63, 64, 65, 72, 73, 74];

        this.locked_walls = this.physics.add.group();
        this.laser_walls = this.physics.add.group();
        this.lasersD = this.physics.add.group();
        this.lasersL = this.physics.add.group();
        this.lasersR = this.physics.add.group();
        this.lasersU = this.physics.add.group();
        
        for (var i = 0; i < game.config.width; i += 32) {
            for (var j = 0; j < game.config.height; j += 32) {
                if (this.layer.getTileAtWorldXY(i, j).index === 40) {
                    this.physics.add.image(i, j, 'wall').setOrigin(0, 0.33).setDepth(j/32);
                }
                if (this.layer.getTileAtWorldXY(i, j).index === 71) {
                    this.locked_walls.add(this.physics.add.image(i, j, 'locked_wall').setOrigin(0, 0.33).setDepth(j/32));
                }
                if (this.layer.getTileAtWorldXY(i, j).index == 6) {
                    this.laser_walls.add(this.physics.add.image(i, j, 'laser_wall_U').setOrigin(0, 0.33).setDepth(j/32));
                }
                if (this.layer.getTileAtWorldXY(i, j).index == 7) {
                    this.laser_walls.add(this.physics.add.image(i, j, 'laser_wall_L').setOrigin(0, 0.33).setDepth(j/32));
                }
                if (this.layer.getTileAtWorldXY(i, j).index == 16) {
                    this.laser_walls.add(this.physics.add.image(i, j, 'laser_wall_D').setOrigin(0, 0.33).setDepth(j/32));
                }
                if (this.layer.getTileAtWorldXY(i, j).index == 17) {
                    this.laser_walls.add(this.physics.add.image(i, j, 'laser_wall_R').setOrigin(0, 0.33).setDepth(j/32));
                }
            }
        }

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
            repeat: 0
        });

        // Block animations
        this.anims.create({
            key: 'glow_a',
            frames: this.anims.generateFrameNumbers('block_a', {start: 0, end: 1, first: 0}),
            frameRate: 0,
            repeat: 0
        });
        this.anims.create({
            key: 'glow_b',
            frames: this.anims.generateFrameNumbers('block_b', {start: 0, end: 1, first: 0}),
            frameRate: 0,
            repeat: 0
        });
        
        // Floor-specific setup
        if (floor === 0) {
            this.goal = 1;
            this.player = this.physics.add.sprite(32*10, 32*8, 'player').play('upIdle');
            this.block1 = this.physics.add.sprite(32*9, 32*7, 'block_a').play({key: 'glow_a', startFrame: 0});
            this.block2 = this.physics.add.sprite(32*0, 32*0, 'block_a').play({key: 'glow_a', startFrame: 0}).setAlpha(0);
            this.block3 = this.physics.add.sprite(32*0, 32*0, 'block_a').play({key: 'glow_a', startFrame: 0}).setAlpha(0);
        }
        if (floor === 1) {
            this.goal = 1;
            this.player = this.physics.add.sprite(32*2, 32*5, 'player').play('sideIdle');
            this.block1 = this.physics.add.sprite(32*4, 32*4, 'block_a').play({key: 'glow_a', startFrame: 0});
            this.block2 = this.physics.add.sprite(32*0, 32*0, 'block_a').play({key: 'glow_a', startFrame: 0}).setAlpha(0);
            this.block3 = this.physics.add.sprite(32*0, 32*0, 'block_a').play({key: 'glow_a', startFrame: 0}).setAlpha(0);
        }
        if (floor === 2) {
            this.goal = 2;
            this.player = this.physics.add.sprite(32*2, 32*4, 'player').play('sideIdle');
            this.block1 = this.physics.add.sprite(32*6, 32*2, 'block_a').play({key: 'glow_a', startFrame: 0});
            this.block2 = this.physics.add.sprite(32*6, 32*7, 'block_b').play({key: 'glow_b', startFrame: 0});
            this.block3 = this.physics.add.sprite(0, 0, 'block_a').play({key: 'glow_a', startFrame: 0}).setAlpha(0);
        }
        if (floor === 3) {
            this.goal = 2;
            this.player = this.physics.add.sprite(32*10, 32*2, 'player').play('downIdle');
            this.block1 = this.physics.add.sprite(32*15, 32*3, 'block_b').play({key: 'glow_b', startFrame: 0});
            this.block2 = this.physics.add.sprite(32*1, 32*2, 'block_a').play({key: 'glow_a', startFrame: 0});
            this.block3 = this.physics.add.sprite(32*0, 32*0, 'block_a').play({key: 'glow_a', startFrame: 0}).setAlpha(0);
        }
        if (floor === 4) {
            this.goal = 3;
            this.player = this.physics.add.sprite(32*9, 32*4, 'player').play('downIdle');
            this.block1 = this.physics.add.sprite(32*9, 32*7, 'block_a').play({key: 'glow_a', startFrame: 0});
            this.block2 = this.physics.add.sprite(32*3, 32*8, 'block_a').play({key: 'glow_a', startFrame: 0});
            this.block3 = this.physics.add.sprite(32*18, 32*7, 'block_b').play({key: 'glow_b', startFrame: 0});
        }
        if (floor === 5) {
            this.goal = 2;
            this.player = this.physics.add.sprite(32*5, 32*5, 'player').play('sideIdle');
            this.block1 = this.physics.add.sprite(32*2, 32*3, 'block_a').play({key: 'glow_a', startFrame: 0});
            this.block2 = this.physics.add.sprite(32*17, 32*3, 'block_b').play({key: 'glow_b', startFrame: 0});
            this.block3 = this.physics.add.sprite(32*0, 32*0, 'block_a').play({key: 'glow_a', startFrame: 0}).setAlpha(0);
        }
        if (floor === 6) {
            this.goal = 1;
            this.player = this.physics.add.sprite(32*2, 32*7, 'player').play('sideIdle');
            this.block1 = this.physics.add.sprite(32*2, 32*2, 'block_a').play({key: 'glow_a', startFrame: 0});
            this.block2 = this.physics.add.sprite(32*2, 32*3, 'block_a').play({key: 'glow_a', startFrame: 0});
            this.block3 = this.physics.add.sprite(32*2, 32*4, 'block_a').play({key: 'glow_a', startFrame: 0});
        }
        if (floor === 7) {
            this.goal = 1;
            this.player = this.physics.add.sprite(32*4, 32*4, 'player').play('sideIdle');
            this.player.flipX = true;
            this.block1 = this.physics.add.sprite(32*2, 32*4, 'block_a').play({key: 'glow_a', startFrame: 0});
            this.block2 = this.physics.add.sprite(32*2, 32*5, 'block_a').play({key: 'glow_a', startFrame: 0});
            this.block3 = this.physics.add.sprite(32*14, 32*1, 'block_a').play({key: 'glow_a', startFrame: 0});
        }

        this.player.setSize(32, 32).setOffset(0, 32).setOrigin(0, 0.5);
        this.player.grab = false;
        this.player.grab_num = 0;
        this.player.grab_dir = "";
        this.player.moveSpeed = walkSpeed;

        this.blocks = this.physics.add.group();
        this.blocks.add(this.block1);
        this.blocks.add(this.block2);
        this.blocks.add(this.block3);
        this.blocks.getChildren().forEach((block) => {
            block.setOrigin(0, 0.33).setSize(32, 32).setOffset(0, 16);
            block.on_goal = false;
        })

        this.grab = this.physics.add.image(this.player.x + 32, this.player.y, 'grab').setAlpha(0).setOrigin(0, 0.33).setSize(32, 32).setOffset(0, 16);
        this.pause = this.physics.add.image(4, game.config.height - 4, 'pause').setOrigin(0, 1).setAlpha(0).setDepth(12).setScale(0.6);

        // Load sfx
        this.step_sfx = this.sound.add('sfx_step').setLoop(false);
        this.push_sfx = this.sound.add('sfx_push').setLoop(false);
        this.click_sfx = this.sound.add('sfx_click').setLoop(false);
        this.spike_sfx = this.sound.add('sfx_spike').setLoop(false);
        this.door_open_sfx = this.sound.add('sfx_door_open').setLoop(false);
        this.block_fall_sfx = this.sound.add('sfx_blockfall').setLoop(false);
        this.laser_sfx = this.sound.add('sfx_laser').setLoop(false);

        this.tweens.add({
            targets: [bgm],
            volume: 0.25,
            duration: 1000
        });

        this.instructions = this.add.image(0, game.config.height, 'instructions_' + floor).setOrigin(0).setDepth(12).setAlpha(0);
        this.time.delayedCall(1000, () => {
            this.tweens.add({
                targets: [this.instructions],
                alpha: 1,
                y: 0,
                duration: 1000,
                ease: 'Back.easeOut'
            });
        });

        for (const wall of this.laser_walls.getChildren()) {
            if (wall.texture.key === 'laser_wall_D') {
                for (var i = wall.y + 32; i < game.config.height - 32; i += 32) {
                    if (this.wallIDs.includes(this.layer.getTileAtWorldXY(wall.x, i).index)) {
                        break;
                    }
                    this.lasersD.add(this.physics.add.image(wall.x, i, 'laserV').setOrigin(0).setDepth(i/32));
                }
            }

            if (wall.texture.key === 'laser_wall_L') {
                for (var i = wall.x - 32; i >= 32; i -= 32) {
                    if (this.wallIDs.includes(this.layer.getTileAtWorldXY(i, wall.y).index)) {
                        break;
                    }
                    this.lasersL.add(this.physics.add.image(i, wall.y, 'laserH').setOrigin(0).setDepth(wall.y/32));
                }
            }

            if (wall.texture.key === 'laser_wall_R') {
                for (var i = wall.x + 32; i < game.config.width - 32; i += 32) {
                    if (this.wallIDs.includes(this.layer.getTileAtWorldXY(i, wall.y).index)) {
                        break;
                    }
                    this.lasersR.add(this.physics.add.image(i, wall.y, 'laserH').setOrigin(0).setDepth(wall.y/32));
                }
            }

            if (wall.texture.key === 'laser_wall_U') {
                for (var i = wall.y - 32; i >= 32; i -= 32) {
                    if (this.wallIDs.includes(this.layer.getTileAtWorldXY(wall.x, i).index)) {
                        break;
                    }
                    this.lasersU.add(this.physics.add.image(wall.x, i, 'laserV').setOrigin(0).setDepth(i/32));
                }
            }
        }
    }

    update() {
        // setting depth levels
        this.player.setDepth(this.player.y/32);

        // processing lasers
        for (const laser of this.lasersD.getChildren()) {
            if ((laser.x === this.block1.x && laser.y >= this.block1.y) ||
                (laser.x === this.block2.x && laser.y >= this.block2.y) ||
                (laser.x === this.block3.x && laser.y >= this.block3.y)) {
                laser.setAlpha(0);
            } else {
                laser.setAlpha(1);
            }
            if (laser.alpha === 1 && (this.player.x === laser.x && this.player.y === laser.y) && (this.player.x % 32 === 0 && this.player.y % 32 === 0)) {
                this.player_death('laser');
            }
        }
        
        for (const laser of this.lasersL.getChildren()) {
            if ((laser.x <= this.block1.x && laser.y === this.block1.y) ||
                (laser.x <= this.block2.x && laser.y === this.block2.y) ||
                (laser.x <= this.block3.x && laser.y === this.block3.y)) {
                laser.setAlpha(0);
            } else {
                laser.setAlpha(1);
            }
            if (laser.alpha === 1 && (this.player.x === laser.x && this.player.y === laser.y) && (this.player.x % 32 === 0 && this.player.y % 32 === 0)) {
                this.player_death('laser');
            }
        }

        for (const laser of this.lasersR.getChildren()) {
            if ((laser.x >= this.block1.x && laser.y === this.block1.y) ||
                (laser.x >= this.block2.x && laser.y === this.block2.y) ||
                (laser.x >= this.block3.x && laser.y === this.block3.y)) {
                laser.setAlpha(0);
            } else {
                laser.setAlpha(1);
            }
            if (laser.alpha === 1 && (this.player.x === laser.x && this.player.y === laser.y) && (this.player.x % 32 === 0 && this.player.y % 32 === 0)) {
                this.player_death('laser');
            }
        }

        for (const laser of this.lasersU.getChildren()) {
            if ((laser.x === this.block1.x && laser.y <= this.block1.y) ||
                (laser.x === this.block2.x && laser.y <= this.block2.y) ||
                (laser.x === this.block3.x && laser.y <= this.block3.y)) {
                laser.setAlpha(0);
            } else {
                laser.setAlpha(1);
            }
            if (laser.alpha === 1 && (this.player.x === laser.x && this.player.y === laser.y) && (this.player.x % 32 === 0 && this.player.y % 32 === 0)) {
                this.player_death('laser');
            }
        }
    
        //checking for hazards
        if (this.player.x % 32 === 0 && this.player.y % 32 === 0 &&
            this.spikesIDs.includes(this.layer.getTileAtWorldXY(this.player.x, this.player.y).index)) {
            this.player_death('spikes');
        }

        if (this.player.x % 32 === 0 && this.player.y % 32 === 0 &&
            this.spikesIDs.includes(this.layer.getTileAtWorldXY(this.player.x, this.player.y).index)) {
            this.spike_sfx.play({volume: 2});
            this.gameOver = true;
            this.tweens.add ({
                targets: [this.player],
                alpha: 0,
                y: this.player.y - 10,
                duration: 1500,
                ease: 'Power1'
            });
            this.tweens.add ({
                targets: [this.add.rectangle(0, 0, game.config.width, game.config.height, 0xc40000).setOrigin(0).setAlpha(0).setDepth(11)],
                alpha: 0.25,
                duration: 1500,
                ease: 'Power1'
            });
            this.tweens.add({
                targets: [bgm],
                volume: 0,
                duration: 1500
            })
            this.time.delayedCall(3000, () => {
                this.tweens.add({
                    targets: [bgm],
                    volume: 0,
                    duration: 1500
                })
                this.scene.restart();
            });
        }

        for (const block of this.blocks.getChildren()) {
            // setting depth levels
            block.setDepth(block.y/32);

            //check if block is on target
            if (block.x % 32 === 0 && block.y % 32 === 0) {
                if (this.layer.getTileAtWorldXY(block.x, block.y).index === 30 && block.texture.key === 'block_a') {
                    block.anims.play({key: 'glow_a', startFrame: 1});
                    if (!block.on_goal) {
                        this.click_sfx.play();
                        this.cameras.main.shake(250, 0.005);
                        block.on_goal = true;
                    }
                } else if (block.texture.key === 'block_a') {
                    block.anims.play({key: 'glow_a', startFrame: 0});
                    block.on_goal = false;
                }
                if (this.layer.getTileAtWorldXY(block.x, block.y).index === 60 && block.texture.key === 'block_b') {
                    block.play({key: 'glow_b', startFrame: 1});
                    if (!block.on_goal) {
                        this.click_sfx.play();
                        this.cameras.main.shake(250, 0.005);
                        block.on_goal = true;
                    }
                } else if (block.texture.key === 'block_b') {
                    block.anims.play({key: 'glow_b', startFrame: 0});
                    block.on_goal = false;
                }
            }
            
            // check if block is on cracked tile
            if (block.x % 32 === 0 && block.y % 32 === 0 && 
                this.crackedIDs.includes(this.layer.getTileAtWorldXY(block.x, block.y).index)) {
                this.gameOver = true;
                this.block_fall_sfx.play({volume: 3});
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
                this.tweens.add({
                    targets: [bgm],
                    volume: 0,
                    duration: 1500
                })
                this.time.delayedCall(3000, () => {
                    this.scene.restart();
                });
            }
        }

        let anim_substr = this.player.anims.currentAnim.key.substring(0, 1);
        if (anim_substr === 'u') {
            this.grab.x = this.player.x;
            this.grab.y = this.player.y - 32;
        }
        if (anim_substr === 'd') {
            this.grab.x = this.player.x;
            this.grab.y = this.player.y + 32;
        }
        if (anim_substr === 's') {
            if (this.player.flipX) {
                this.grab.x = this.player.x - 32;
            } else {
                this.grab.x = this.player.x + 32;
            }
            this.grab.y = this.player.y;
        }

        if (this.layer.getTileAtWorldXY(this.block1.x, this.block1.y).index === 70 ||
            this.layer.getTileAtWorldXY(this.block2.x, this.block2.y).index === 70 ||
            this.layer.getTileAtWorldXY(this.block3.x, this.block3.y).index === 70) {
            if (!this.unlocked) {
                this.cameras.main.shake(250, 0.005);
                this.door_open_sfx.play();
            }
            this.unlocked = true;
            this.locked_walls.setAlpha(0);
        } else {
            if (this.unlocked) {
                this.cameras.main.shake(250, 0.005);
                this.door_open_sfx.play();
            }
            this.unlocked = false;
            this.locked_walls.setAlpha(1);
        }

        if (this.layer.getTileAtWorldXY(this.player.x, this.player.y).index === 75) {
            
            this.tweens.add ({
                targets: [this.player],
                alpha: 0,
                x: this.player.x + 10,
                duration: 1500,
                ease: 'Power1'
            });
            if (!this.gameOver) {
                this.tweens.add ({
                    targets: [this.add.rectangle(0, 0, game.config.width, game.config.height, 0xFFFFFF).setOrigin(0).setAlpha(0).setDepth(15)],
                    alpha: 1,
                    duration: 1500,
                    ease: 'Power1'
                });
                this.gameOver = true;
            }
            this.time.delayedCall(1500, () => {
                this.scene.start('victoryScene');
            });
        }

        if (this.goal === this.block1.anims.currentFrame.index + this.block2.anims.currentFrame.index + this.block3.anims.currentFrame.index - 3) {
            this.gameOver = true;
            if (bgm.volume === 1) {
                this.tweens.add({
                    targets: [bgm],
                    volume: 0,
                    duration: 1500
                });
            }
            this.time.delayedCall(3000, () => {
                floor++;
                this.scene.restart();
            });
        }

        // Checking if player is in tile, then call input function
        if (this.player.x % 32 == 0 && this.player.y % 32 == 0 && !this.gameOver) {
            if (!this.player.grab) {
                this.player_input();
            }
            if (this.player.grab_num === 1) {
                this.player_input(this.block1);
            }
            if (this.player.grab_num === 2) {
                this.player_input(this.block2);
            }
            if (this.player.grab_num === 3) {
                this.player_input(this.block3);
            }
        }

        // If shift key is held down, player can move block
        if (keySHIFT.isDown) {
            if (this.instructions.alpha === 1) {
                this.tweens.add({
                    targets: [this.instructions],
                    alpha: 0,
                    y: game.config.height,
                    duration: 1000,
                    ease: 'Back.easeIn'
                });
                this.tweens.add({
                    targets: [bgm],
                    volume: 1,
                    duration: 1000
                });
                this.time.delayedCall(1000, () => {
                    this.gameOver = false;
                    this.tweens.add({
                        targets: [this.pause],
                        alpha: 1,
                        duration: 1000,
                        ease: 'power1'
                    });
                });
            } else {
                this.grab_check();
            }
        } else {
            this.player.grab = false;
            this.player.grab_num = 0;
            this.player.grab_dir = '';
        }

        //go back to main menu
        if (keyESC.isDown) {
            if (this.instructions.alpha === 0 && !this.gameOver) {
                this.gameOver = true;
                this.tweens.add({
                    targets: [this.instructions],
                    alpha: 1,
                    y: 0,
                    duration: 1000,
                    ease: 'Back.easeOut'
                });
                this.tweens.add({
                    targets: [bgm],
                    volume: 0.25,
                    duration: 1000
                });
                this.tweens.add({
                    targets: [this.pause],
                    alpha: 0,
                    duration: 1000,
                    ease: 'power1'
                });
            } else if (this.instructions.alpha === 1) {
                bgm.stop();
                this.scene.start('menuScene');
            }
        }
    }

    //function to check which block is being grabbed and which direction it is relative to player
    grab_check() {
        this.player.grab = false;
        this.player.grab_num = 0;
        this.player.grab_dir = "";

        if (this.grab.x === this.block1.x && this.grab.y == this.block1.y) {
            this.grab.setDepth(this.block1.y/32 + 1);
            this.player.grab = true;
            this.player.grab_num = 1;
        }

        if (this.grab.x === this.block2.x && this.grab.y == this.block2.y) {
            this.grab.setDepth(this.block2.y/32 + 1);
            this.player.grab = true;
            this.player.grab_num = 2;
        }
        if (this.grab.x === this.block3.x && this.grab.y == this.block3.y) {
            this.grab.setDepth(this.block3.y/32 + 1);
            this.player.grab = true;
            this.player.grab_num = 3;
        }

        if (this.player.grab) {
            if (this.grab.x === this.player.x - 32) {
                this.player.grab_dir = "R";
            }
            if (this.grab.x === this.player.x + 32) {
                this.player.grab_dir = "L";
            }
            if (this.grab.y === this.player.y - 32) {
                this.player.grab_dir = "U";
            }
            if (this.grab.y === this.player.y + 32) {
                this.player.grab_dir = "D";
            }
        }
        
    }

    player_input(block = null) {
        let tile;
        if (keyW.isDown && !keyA.isDown && !keyD.isDown && this.player.grab_dir != "R" && this.player.grab_dir != "L") {
            if (block != null && this.player.x === block.x && this.player.y === block.y + 32) {
                if (this.player.grab) {
                    this.player.moveSpeed = pushSpeed;
                    tile = this.layer.getTileAtWorldXY(block.x, block.y - 32);
                    if ((block.x === this.block1.x && block.y === this.block1.y + 32) ||
                        (block.x === this.block2.x && block.y === this.block2.y + 32) ||
                        (block.x === this.block3.x && block.y === this.block3.y + 32)) {
                        return;
                    } else if (!this.wallIDs.includes(tile.index) || (tile.index === 71 && this.unlocked)) {
                        this.player.play('upGrab');
                        this.push_sfx.play();
                        this.player.moveSpeed = pushSpeed;
                        this.tweens.add ({
                            targets: [block],
                            y: block.y - 32,
                            duration: this.player.moveSpeed,
                            ease: 'Power2'
                        });
                    }
                } else {
                    tile = this.layer.getTileAtWorldXY(0, 0);
                }
            } else if (block != null && this.player.x === block.x && this.player.y === block.y - 32) {
                if (this.player.grab) {
                    this.player.moveSpeed = pushSpeed;
                    tile = this.layer.getTileAtWorldXY(this.player.x, this.player.y - 32);
                    if ((this.player.x === this.block1.x && this.player.y === this.block1.y + 32) ||
                        (this.player.x === this.block2.x && this.player.y === this.block2.y + 32) ||
                        (this.player.x === this.block3.x && this.player.y === this.block3.y + 32)) {
                        return;
                    } else if (!this.wallIDs.includes(tile.index) || (tile.index === 71 && this.unlocked)) {
                        this.player.play('downGrab');
                        this.push_sfx.play();
                        this.player.moveSpeed = pushSpeed;
                        this.tweens.add ({
                            targets: [block],
                            y: block.y - 32,
                            duration: this.player.moveSpeed,
                            ease: 'Power2'
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
            } else if (!this.wallIDs.includes(tile.index) || (tile.index === 71 && this.unlocked)) {
                if (this.player.anims.currentAnim.key == 'upIdle') {
                    this.player.play('upWalk');
                }
                this.step_sfx.play();
                this.tweens.add ({
                    targets: [this.player],
                    y: this.player.y - 32,
                    duration: this.player.moveSpeed,
                    ease: 'Power2'
                });
            }
        }

        if (keyA.isDown && !keyW.isDown && !keyS.isDown && this.player.grab_dir != "U" && this.player.grab_dir != "D") {
            if (block != null && this.player.x === block.x + 32 && this.player.y === block.y) {
                if (this.player.grab) {
                    this.player.moveSpeed = pushSpeed;
                    tile = this.layer.getTileAtWorldXY(block.x - 32, block.y);
                    if ((block.x === this.block1.x + 32 && block.y === this.block1.y) ||
                        (block.x === this.block2.x + 32 && block.y === this.block2.y) ||
                        (block.x === this.block3.x + 32 && block.y === this.block3.y)) {
                        return;
                    } else if (!this.wallIDs.includes(tile.index) || (tile.index === 71 && this.unlocked)) {
                        this.player.play('sideGrab');
                        this.player.flipX = true;
                        this.push_sfx.play();
                        this.player.moveSpeed = pushSpeed;
                        this.tweens.add ({
                            targets: [block],
                            x: block.x - 32,
                            duration: this.player.moveSpeed,
                            ease: 'Power2'
                        });
                    }
                } else {
                    tile = this.layer.getTileAtWorldXY(0, 0);
                }
            } else if (block != null && this.player.x === block.x - 32 && this.player.y === block.y) {
                if (this.player.grab) {
                    this.player.moveSpeed = pushSpeed;
                    tile = this.layer.getTileAtWorldXY(this.player.x - 32, this.player.y);
                    if ((this.player.x === this.block1.x + 32 && this.player.y === this.block1.y) ||
                        (this.player.x === this.block2.x + 32 && this.player.y === this.block2.y) ||
                        (this.player.x === this.block3.x + 32 && this.player.y === this.block3.y)) {
                        return;
                    } else if (!this.wallIDs.includes(tile.index) || (tile.index === 71 && this.unlocked)) {
                        this.player.play('sideGrab');
                        this.player.flipX = false;
                        this.push_sfx.play();
                        this.player.moveSpeed = pushSpeed;
                        this.tweens.add ({
                            targets: [block],
                            x: block.x - 32,
                            duration: this.player.moveSpeed,
                            ease: 'Power2'
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
            } else if (!this.wallIDs.includes(tile.index) || (tile.index === 71 && this.unlocked)) {
                if (this.player.anims.currentAnim.key == 'sideIdle') {
                    this.player.play('sideWalk');
                }
                this.step_sfx.play();
                this.tweens.add ({
                    targets: [this.player],
                    x: this.player.x - 32,
                    duration: this.player.moveSpeed,
                    ease: 'Power2'
                });
            }
        }

        if (keyS.isDown && !keyA.isDown && !keyD.isDown && this.player.grab_dir != "R" && this.player.grab_dir != "L") {
            if (block != null && this.player.x === block.x && this.player.y === block.y - 32) {
                if (this.player.grab) {
                    this.player.moveSpeed = pushSpeed;
                    tile = this.layer.getTileAtWorldXY(block.x, block.y + 32);
                    if ((block.x === this.block1.x && block.y === this.block1.y - 32) ||
                        (block.x === this.block2.x && block.y === this.block2.y - 32) ||
                        (block.x === this.block3.x && block.y === this.block3.y - 32)) {
                        return;
                    } else if (!this.wallIDs.includes(tile.index) || (tile.index === 71 && this.unlocked)) {
                        this.player.play('downGrab');
                        this.push_sfx.play();
                        this.player.moveSpeed = pushSpeed;
                        this.tweens.add ({
                            targets: [block],
                            y: block.y + 32,
                            duration: this.player.moveSpeed,
                            ease: 'Power2'
                        });
                    }
                } else {
                    tile = this.layer.getTileAtWorldXY(0, 0);
                }
            } else if (block != null && this.player.x === block.x && this.player.y === block.y + 32) {
                if (this.player.grab) {
                    this.player.moveSpeed = pushSpeed;
                    tile = this.layer.getTileAtWorldXY(this.player.x, this.player.y + 32);
                    if ((this.player.x === this.block1.x && this.player.y === this.block1.y - 32) ||
                        (this.player.x === this.block2.x && this.player.y === this.block2.y - 32) ||
                        (this.player.x === this.block3.x && this.player.y === this.block3.y - 32)) {
                        return;
                    } else if (!this.wallIDs.includes(tile.index) || (tile.index === 71 && this.unlocked)) {
                        this.player.play('upGrab');
                        this.push_sfx.play();
                        this.player.moveSpeed = pushSpeed;
                        this.tweens.add ({
                            targets: [block],
                            y: block.y + 32,
                            duration: this.player.moveSpeed,
                            ease: 'Power2'
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
            } else if (!this.wallIDs.includes(tile.index) || (tile.index === 71 && this.unlocked)) {
                if (this.player.anims.currentAnim.key == 'downIdle') {
                    this.player.play('downWalk');
                }
                this.step_sfx.play();
                this.tweens.add ({
                    targets: [this.player],
                    y: this.player.y + 32,
                    duration: this.player.moveSpeed,
                    ease: 'Power2'
                });
            }
        }

        if (keyD.isDown && !keyW.isDown && !keyS.isDown && this.player.grab_dir != "U" && this.player.grab_dir != "D") {
            if (block != null && this.player.x === block.x - 32 && this.player.y === block.y) {
                if (this.player.grab) {
                    this.player.moveSpeed = pushSpeed;
                    tile = this.layer.getTileAtWorldXY(block.x + 32, block.y);
                    if ((block.x === this.block1.x - 32 && block.y === this.block1.y) ||
                        (block.x === this.block2.x - 32 && block.y === this.block2.y) ||
                        (block.x === this.block3.x - 32 && block.y === this.block3.y)) {
                        return;
                    } else if (!this.wallIDs.includes(tile.index) || (tile.index === 71 && this.unlocked)) {
                        this.player.play('sideGrab');
                        this.player.flipX = false;
                        this.push_sfx.play();
                        this.player.moveSpeed = pushSpeed;
                        this.tweens.add ({
                            targets: [block],
                            x: block.x + 32,
                            duration: this.player.moveSpeed,
                            ease: 'Power2'
                        });
                    }
                } else {
                    tile = this.layer.getTileAtWorldXY(0, 0);
                }
            } else if (block != null && this.player.x === block.x + 32 && this.player.y === block.y) {
                if (this.player.grab) {
                    this.player.moveSpeed = pushSpeed;
                    tile = this.layer.getTileAtWorldXY(this.player.x + 32, this.player.y);
                    if ((this.player.x === this.block1.x - 32 && this.player.y === this.block1.y) ||
                        (this.player.x === this.block2.x - 32 && this.player.y === this.block2.y) ||
                        (this.player.x === this.block3.x - 32 && this.player.y === this.block3.y)) {
                        return;
                    } else if (!this.wallIDs.includes(tile.index) || (tile.index === 71 && this.unlocked)) {
                        this.player.play('sideGrab');
                        this.player.flipX = true;
                        this.push_sfx.play();
                        this.player.moveSpeed = pushSpeed;
                        this.tweens.add ({
                            targets: [block],
                            x: block.x + 32,
                            duration: this.player.moveSpeed,
                            ease: 'Power2'
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
            } else if (!this.wallIDs.includes(tile.index) || (tile.index === 71 && this.unlocked)) {
                if (this.player.anims.currentAnim.key == 'sideIdle') {
                    this.player.play('sideWalk');
                }
                this.step_sfx.play();
                this.tweens.add ({
                    targets: [this.player],
                    x: this.player.x + 32,
                    duration: this.player.moveSpeed,
                    ease: 'Power2'
                });
            }
        }        
    }

    player_death(cause) {
        if (cause === 'spikes') {
            this.spike_sfx.play({volume: 2});
        }
        if (cause === 'laser') {
            this.laser_sfx.play();
        }
        this.gameOver = true;
        this.tweens.add ({
            targets: [this.player],
            alpha: 0,
            y: this.player.y - 10,
            duration: 1500,
            ease: 'Power1'
        });
        this.tweens.add ({
            targets: [this.add.rectangle(0, 0, game.config.width, game.config.height, 0xc40000).setOrigin(0).setAlpha(0).setDepth(11)],
            alpha: 0.25,
            duration: 1500,
            ease: 'Power1'
        });
        this.tweens.add({
            targets: [bgm],
            volume: 0,
            duration: 1500
        })
        this.time.delayedCall(3000, () => {
            this.scene.restart();
        });
    }
}