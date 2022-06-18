import Mushrooms from "./scripts/mushrooms.js";
import Game from "./scripts/game.js";
import GameView from "./scripts/game_view.js";


window.Game = Game;


document.addEventListener("DOMContentLoaded", () => {

	console.log("Hello World");

	const canvas = document.getElementById("game-canvas");
	canvas.height = Game.DIM_Y;
	canvas.width = Game.DIM_X;

	const ctx = canvas.getContext('2d');

	let game = new Game();
	// game.draw(ctx);

	new GameView(game,ctx).start();



});