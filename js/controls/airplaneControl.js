import { mousePos } from './handleMouseMove';
import { airplane } from '../models/airplane';

function updatePlane () {
    // let's move the airplane between -100 and 100 on the horizontal axis, 
    // and between 25 and 175 on the vertical axis,
    // depending on the mouse position which ranges between -1 and 1 on both axes;
    // to achieve that we use a normalize function (see below)
    let targetX = normalize(mousePos.x, -1, 1, -100, 100);
    let targetY = normalize(mousePos.y, -1, 1, 25, 175);

    // Move the plane at each frame by adding a fraction of the remaining distance
	airplane.mesh.position.y += (targetY - airplane.mesh.position.y) * 0.1;
    
	// Rotate the plane proportionally to the remaining distance
	airplane.mesh.rotation.z = (targetY - airplane.mesh.position.y) * 0.0128;
	airplane.mesh.rotation.x = (airplane.mesh.position.y-targetY) * 0.0064;

	airplane.propeller.rotation.x += 0.3;

    airplane.pilot.updateHairs();
}

function normalize(v, vmin, vmax, tmin, tmax){
    let nv = Math.max(Math.min(v, vmax), vmin);
    let dv = vmax - vmin;
    let pc = (nv - vmin) / dv;
    let dt = tmax - tmin;
    let tv = tmin + (pc * dt);

    return tv;
}

export { updatePlane };