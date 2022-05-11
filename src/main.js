// Final Project: Fitting
// Stanley, Nile, Ben
// CMPM/ARTG 120

'use strict';
let config = {
  type: Phaser.CANVAS,
  width: 1080,
  height: 720,
  scene: [Menu, Play, GameOver],
};

let cursors, keyR, keyESC;

let game = new Phaser.Game(config);