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
  scene: [Play],
};

let keyW, keyA, keyS, keyD;

let game = new Phaser.Game(config);