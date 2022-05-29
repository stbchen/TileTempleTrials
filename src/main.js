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
  scene: [Menu, Play],
};

let keyW, keyA, keyS, keyD, keySHIFT, keyENTER, keyESC, keyCTRL;

let pushSpeed = 600;
let walkSpeed = 200;
let floor;

let game = new Phaser.Game(config);