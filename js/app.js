import { createScene, scene, camera, renderer } from './scene/scene';
import { createLights } from './scene/lights';
import { createAirplane, airplane } from './models/airplane';
import { createSea, updateSea, sea } from './models/sea';
import { createSky, updateSky, sky } from './models/sky';
import { createPilot, pilot } from './models/pilot';
import { initHandleMouseMove } from './controls/handleMouseMove';
import { updatePlane } from './controls/airplaneControl';

window.addEventListener('load', init, false);

function init () {
	// set up the scene, the camera and the renderer
	createScene();

	// add the lights
	createLights();

	// add the objects
	createAirplane();
	createSea();
	createSky();
	createPilot();

	// add controls
	initHandleMouseMove()

	// start a loop that will update the objects' positions 
	// and render the scene on each frame
	gameLoop();
}

function gameLoop () {
	updateSea();
	updateSky();
	updatePlane();

	// render the scene
	renderer.render(scene, camera);

	// call the loop function again
	requestAnimationFrame(gameLoop);
}