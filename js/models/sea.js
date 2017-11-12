import * as THREE from 'three';
import { COLORS } from '../colors';
import { scene } from '../scene/scene';

// TODO: convert to class
const Sea = function () {
	
	// create the geometry (shape) of the cylinder;
	// the parameters are: 
	// radius top, radius bottom, height, number of segments on the radius, number of segments vertically
	let geom = new THREE.CylinderGeometry(600,600,800,40,10);
	
	// rotate the geometry on the x axis
	geom.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI/2));

	// important: by merging vertices we ensure the continuity of the waves
	geom.mergeVertices();

	// get the vertices
	let l = geom.vertices.length;

	// create an array to store new data associated to each vertex
	this.waves = [];

	for (let i = 0; i < l; i++) {
		// get each vertex
		let v = geom.vertices[i];

		// store some data associated to it
		this.waves.push({
			y: v.y,
			x: v.x,
			z: v.z,
			// a random angle
			ang: Math.random() * Math.PI * 2,
			// a random distance
			amp: 5 + Math.random() * 15,
			// a random speed between 0.016 and 0.048 radians / frame
			speed:0.016 + Math.random() * 0.032
		});
	};
	
	// create the material 
	let mat = new THREE.MeshPhongMaterial({
		color: COLORS.blue,
		transparent: true,
		opacity: .8,
		flatShading: THREE.FlatShading,
	});

	// To create an object in Three.js, we have to create a mesh 
	// which is a combination of a geometry and some material
	this.mesh = new THREE.Mesh(geom, mat);

	// Allow the sea to receive shadows
	this.mesh.receiveShadow = true; 
}

// now we create the function that will be called in each frame 
// to update the position of the vertices to simulate the waves

Sea.prototype.moveWaves = function () {
	
	// get the vertices
	let verts = this.mesh.geometry.vertices;
	let l = verts.length;
	
	for (let i = 0; i < l; i++) {
		var v = verts[i];
		
		// get the data associated to it
		var vprops = this.waves[i];
		
		// update the position of the vertex
		v.x = vprops.x + Math.cos(vprops.ang) * vprops.amp;
		v.y = vprops.y + Math.sin(vprops.ang) * vprops.amp;

		// increment the angle for the next frame
		vprops.ang += vprops.speed;

	}

	// Tell the renderer that the geometry of the sea has changed.
	// In fact, in order to maintain the best level of performance, 
	// three.js caches the geometries and ignores any changes
	// unless we add this line
	this.mesh.geometry.verticesNeedUpdate=true;

	sea.mesh.rotation.z += .005;
}

let sea;

function createSea () {
	sea = new Sea();

	// push it a little bit at the bottom of the scene
	sea.mesh.position.y = -600;

	// add the mesh of the sea to the scene
	scene.add(sea.mesh);
}

function updateSea () {
	sea.mesh.rotation.z += .005
	sea.moveWaves()
}

export { createSea, updateSea, sea };