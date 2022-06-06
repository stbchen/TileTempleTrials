// Final Project: Fitting
// Stanley, Nile, Ben
// CMPM/ARTG 120

'use strict';
let config = {
  type: Phaser.CANVAS,
  width: 640, // 1280?
  height: 320, // 800?
  physics: {
    default: 'arcade',
    arcade: {
        debug: true,
    }
},
  scene: [Menu, Play, Victory],
};

let keyW, keyA, keyS, keyD, keySHIFT, keyENTER, keyESC, floor, bgm;

let pushSpeed = 600;
let walkSpeed = 200;
let end = 6;

let game = new Phaser.Game(config);