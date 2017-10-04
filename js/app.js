import { createScene, scene, camera, renderer } from './scene/scene';
import { createLights } from './scene/lights';
import { createAirplane, airplane } from './models/airplane';
import { createSea, sea } from './models/sea';
import { createSky, sky } from './models/sky';
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

	// add controls
	initHandleMouseMove()

	// start a loop that will update the objects' positions 
	// and render the scene on each frame
	gameLoop();
}

function gameLoop () {
	// Rotate the propeller, the sea and the sky
	sea.mesh.rotation.z += .005; // TODO : put to sea.updateSea()
	sky.mesh.rotation.z += .01; // TODO: put to sky.updateSky()

	updatePlane();

	// render the scene
	renderer.render(scene, camera);

	// call the loop function again
	requestAnimationFrame(gameLoop);
}