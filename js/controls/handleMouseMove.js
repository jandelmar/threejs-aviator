import { WIDTH, HEIGHT } from '../scene/scene';

function initHandleMouseMove () {
    document.addEventListener('mousemove', handleMouseMove, false);
}

let mousePos={x:0, y:0};

// now handle the mousemove event
function handleMouseMove(event) {
	// here we are converting the mouse position value received 
	// to a normalized value varying between -1 and 1;
	// this is the formula for the horizontal axis:
	
	let tx = -1 + (event.clientX / WIDTH) * 2;

	// for the vertical axis, we need to inverse the formula 
	// because the 2D y-axis goes the opposite direction of the 3D y-axis
	
	let ty = 1 - (event.clientY / HEIGHT) * 2;
	mousePos = {x:tx, y:ty};

}

export { initHandleMouseMove, mousePos };