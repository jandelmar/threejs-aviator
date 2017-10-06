import { mousePos } from './handleMouseMove';
import { airplane } from '../models/airplane';

function updatePlane () {
    // let's move the airplane between -100 and 100 on the horizontal axis, 
    // and between 25 and 175 on the vertical axis,
    // depending on the mouse position which ranges between -1 and 1 on both axes;
    // to achieve that we use a normalize function (see below)
    let targetX = normalize(mousePos.x, -1, 1, -100, 100);
    let targetY = normalize(mousePos.y, -1, 1, 25, 175);

    // update the airplane's position
    airplane.mesh.position.y = targetY;
    airplane.mesh.position.x = targetX;
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