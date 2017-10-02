import { createScene, scene, camera, renderer } from './scene/scene';
import { createLights } from './scene/lights';
import { createAirplane, airplane } from './models/airplane';
import { createSea, sea } from './models/sea';
import { createSky, sky } from './models/sky';

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

	// start a loop that will update the objects' positions 
	// and render the scene on each frame
	gameLoop();
}

function gameLoop () {
	// Rotate the propeller, the sea and the sky
	airplane.propeller.rotation.x += 0.3;
	sea.mesh.rotation.z += .005;
	sky.mesh.rotation.z += .01;

	// render the scene
	renderer.render(scene, camera);

	// call the loop function again
	requestAnimationFrame(gameLoop);
}