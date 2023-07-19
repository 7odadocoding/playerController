import CustomPlayerControls from './classes/CustomPlayerControls.js';
import Level from './classes/Level.js';
import Player from './classes/Player.js';
import PlayerController from './classes/PlayerController.js';

/**
 * @type {HTMLCanvasElement} game
 */
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const GAME_WIDTH = 1024;
const GAME_HEIGHT = 576;

const level = new Level(GAME_WIDTH, GAME_HEIGHT, '#191919', ctx);
const player = new Player(50, 50, 20, 20, 'red', 0, 0, ctx);
const playerController = new PlayerController(player, window, CustomPlayerControls);

level.canvas = canvas;
level.centerEntity(player);
level.addEntity(player);
level.resizeCanvas(canvas);
level.update();
