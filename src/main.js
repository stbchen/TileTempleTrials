// Final Project: Fitting
// Stanley, Nile, Ben
// CMPM/ARTG 120

'use strict';
let config = {
  type: Phaser.CANVAS,
  width: 640,
  height: 320,
  physics: {
    default: 'arcade',
    arcade: {
        debug: false,
    }
},
  scene: [Menu, Play, Level2],
};

let keyW, keyA, keyS, keyD, keySHIFT, keyENTER, keyESC, keyCTRL;

let pushSpeed = 450;
let walkSpeed = 200;

let game = new Phaser.Game(config);