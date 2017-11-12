webpackJsonp([0],[
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.HEIGHT = exports.WIDTH = exports.renderer = exports.camera = exports.scene = exports.createScene = undefined;

var _three = __webpack_require__(0);

var THREE = _interopRequireWildcard(_three);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var scene = void 0,
    camera = void 0,
    renderer = void 0,
    HEIGHT = void 0,
    WIDTH = void 0;

function createScene() {
    // Get the width and the height of the screen,
    // use them to set up the aspect ratio of the camera 
    // and the size of the renderer.
    exports.HEIGHT = HEIGHT = window.innerHeight;
    exports.WIDTH = WIDTH = window.innerWidth;

    // Create the scene
    exports.scene = scene = new THREE.Scene();

    // Add a fog effect to the scene; same color as the
    // background color used in the style sheet
    scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);

    // Create the camera
    var aspectRatio = WIDTH / HEIGHT;
    var fieldOfView = 60;
    var nearPlane = 1;
    var farPlane = 10000;
    exports.camera = camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);

    // Set the position of the camera
    camera.position.x = 0;
    camera.position.z = 200;
    camera.position.y = 100;

    // Create the renderer
    exports.renderer = renderer = new THREE.WebGLRenderer({
        // Allow transparency to show the gradient background
        // we defined in the CSS
        alpha: true,

        // Activate the anti-aliasing; this is less performant,
        // but, as our project is low-poly based, it should be fine :)
        antialias: true
    });

    // Define the size of the renderer; in this case,
    // it will fill the entire screen
    renderer.setSize(WIDTH, HEIGHT);

    // Enable shadow rendering
    renderer.shadowMap.enabled = true;

    // Add the DOM element of the renderer to the 
    // container we created in the HTML
    var container = document.getElementById('world');
    container.appendChild(renderer.domElement);

    // Listen to the screen: if the user resizes it
    // we have to update the camera and the renderer size
    window.addEventListener('resize', handleWindowResize, false);
}

function handleWindowResize() {
    // update height and width of the renderer and the camera
    exports.HEIGHT = HEIGHT = window.innerHeight;
    exports.WIDTH = WIDTH = window.innerWidth;
    renderer.setSize(WIDTH, HEIGHT);
    camera.aspect = WIDTH / HEIGHT;
    camera.updateProjectionMatrix();
}

exports.createScene = createScene;
exports.scene = scene;
exports.camera = camera;
exports.renderer = renderer;
exports.WIDTH = WIDTH;
exports.HEIGHT = HEIGHT;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var COLORS = {
	red: 0xf25346,
	white: 0xd8d0d1,
	brown: 0x59332e,
	pink: 0xF5986E,
	brownDark: 0x23190f,
	blue: 0x68c3c0
};

exports.COLORS = COLORS;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.airplane = exports.createAirplane = undefined;

var _three = __webpack_require__(0);

var THREE = _interopRequireWildcard(_three);

var _colors = __webpack_require__(2);

var _pilot = __webpack_require__(4);

var _scene = __webpack_require__(1);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// TODO: convert to class
var AirPlane = function AirPlane() {

	this.mesh = new THREE.Object3D();

	// Create the cabin
	var geomCockpit = new THREE.BoxGeometry(60, 50, 50, 1, 1, 1);
	// Cooler cockpit
	geomCockpit.vertices[4].y -= 10;
	geomCockpit.vertices[4].z += 20;
	geomCockpit.vertices[5].y -= 10;
	geomCockpit.vertices[5].z -= 20;
	geomCockpit.vertices[6].y += 30;
	geomCockpit.vertices[6].z += 20;
	geomCockpit.vertices[7].y += 30;
	geomCockpit.vertices[7].z -= 20;

	var matCockpit = new THREE.MeshPhongMaterial({ color: _colors.COLORS.red, flatShading: THREE.FlatShading });
	var cockpit = new THREE.Mesh(geomCockpit, matCockpit);
	cockpit.castShadow = true;
	cockpit.receiveShadow = true;
	this.mesh.add(cockpit);

	// Create the engine
	var geomEngine = new THREE.BoxGeometry(20, 50, 50, 1, 1, 1);
	var matEngine = new THREE.MeshPhongMaterial({ color: _colors.COLORS.white, flatShading: THREE.FlatShading });
	var engine = new THREE.Mesh(geomEngine, matEngine);
	engine.position.x = 40;
	engine.castShadow = true;
	engine.receiveShadow = true;
	this.mesh.add(engine);

	// Create the tail
	var geomTailPlane = new THREE.BoxGeometry(15, 20, 5, 1, 1, 1);
	var matTailPlane = new THREE.MeshPhongMaterial({ color: _colors.COLORS.red, flatShading: THREE.FlatShading });
	var tailPlane = new THREE.Mesh(geomTailPlane, matTailPlane);
	tailPlane.position.set(-35, 25, 0);
	tailPlane.castShadow = true;
	tailPlane.receiveShadow = true;
	this.mesh.add(tailPlane);

	// Create the wing
	var geomSideWing = new THREE.BoxGeometry(40, 8, 150, 1, 1, 1);
	var matSideWing = new THREE.MeshPhongMaterial({ color: _colors.COLORS.red, flatShading: THREE.FlatShading });
	var sideWing = new THREE.Mesh(geomSideWing, matSideWing);
	sideWing.castShadow = true;
	sideWing.receiveShadow = true;
	this.mesh.add(sideWing);

	// propeller
	var geomPropeller = new THREE.BoxGeometry(20, 10, 10, 1, 1, 1);
	var matPropeller = new THREE.MeshPhongMaterial({ color: _colors.COLORS.brown, flatShading: THREE.FlatShading });
	this.propeller = new THREE.Mesh(geomPropeller, matPropeller);
	this.propeller.castShadow = true;
	this.propeller.receiveShadow = true;

	// blades
	var geomBlade = new THREE.BoxGeometry(1, 100, 20, 1, 1, 1);
	var matBlade = new THREE.MeshPhongMaterial({ color: _colors.COLORS.brownDark, flatShading: THREE.FlatShading });

	var blade = new THREE.Mesh(geomBlade, matBlade);
	blade.position.set(8, 0, 0);
	blade.castShadow = true;
	blade.receiveShadow = true;
	this.propeller.add(blade);
	this.propeller.position.set(50, 0, 0);
	this.mesh.add(this.propeller);

	// pilot
	this.pilot = (0, _pilot.createPilot)();
	this.pilot.mesh.position.set(-10, 27, 0);
	this.mesh.add(this.pilot.mesh);
};

var airplane = void 0;

function createAirplane() {
	exports.airplane = airplane = new AirPlane();
	airplane.mesh.scale.set(.25, .25, .25);
	airplane.mesh.position.y = 100;

	console.log('Create airplane:', airplane);

	_scene.scene.add(airplane.mesh);
}

exports.createAirplane = createAirplane;
exports.airplane = airplane;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
			value: true
});
exports.createPilot = undefined;

var _three = __webpack_require__(0);

var THREE = _interopRequireWildcard(_three);

var _colors = __webpack_require__(2);

var _scene = __webpack_require__(1);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// TODO: convert to class
var Pilot = function Pilot() {
			this.mesh = new THREE.Object3D();
			this.mesh.name = "pilot";

			// angleHairs is a property used to animate the hair later 
			this.angleHairs = 0;

			// Body of the pilot
			var bodyGeom = new THREE.BoxGeometry(15, 15, 15);
			var bodyMat = new THREE.MeshPhongMaterial({ color: _colors.COLORS.brown, flatShading: THREE.FlatShading });
			var body = new THREE.Mesh(bodyGeom, bodyMat);
			body.position.set(2, -12, 0);
			this.mesh.add(body);

			// Face of the pilot
			var faceGeom = new THREE.BoxGeometry(10, 10, 10);
			var faceMat = new THREE.MeshLambertMaterial({ color: _colors.COLORS.pink });
			var face = new THREE.Mesh(faceGeom, faceMat);
			this.mesh.add(face);

			// Hair element
			var hairGeom = new THREE.BoxGeometry(4, 4, 4);
			var hairMat = new THREE.MeshLambertMaterial({ color: _colors.COLORS.brown });
			var hair = new THREE.Mesh(hairGeom, hairMat);
			// Align the shape of the hair to its bottom boundary, that will make it easier to scale.
			hair.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 2, 0));

			// create a container for the hair
			var hairs = new THREE.Object3D();

			// create a container for the hairs at the top 
			// of the head (the ones that will be animated)
			this.hairsTop = new THREE.Object3D();

			// create the hairs at the top of the head 
			// and position them on a 3 x 4 grid
			for (var i = 0; i < 12; i++) {
						var h = hair.clone();
						var col = i % 3;
						var row = Math.floor(i / 3);
						var startPosZ = -4;
						var startPosX = -4;
						h.position.set(startPosX + row * 4, 0, startPosZ + col * 4);
						this.hairsTop.add(h);
			}
			hairs.add(this.hairsTop);

			// create the hairs at the side of the face
			var hairSideGeom = new THREE.BoxGeometry(12, 4, 2);
			hairSideGeom.applyMatrix(new THREE.Matrix4().makeTranslation(-6, 0, 0));
			var hairSideR = new THREE.Mesh(hairSideGeom, hairMat);
			var hairSideL = hairSideR.clone();
			hairSideR.position.set(8, -2, 6);
			hairSideL.position.set(8, -2, -6);
			hairs.add(hairSideR);
			hairs.add(hairSideL);

			// create the hairs at the back of the head
			var hairBackGeom = new THREE.BoxGeometry(2, 8, 10);
			var hairBack = new THREE.Mesh(hairBackGeom, hairMat);
			hairBack.position.set(-1, -4, 0);
			hairs.add(hairBack);
			hairs.position.set(-5, 5, 0);

			this.mesh.add(hairs);

			var glassGeom = new THREE.BoxGeometry(5, 5, 5);
			var glassMat = new THREE.MeshLambertMaterial({ color: _colors.COLORS.blue });
			var glassR = new THREE.Mesh(glassGeom, glassMat);
			glassR.position.set(6, 0, 3);
			var glassL = glassR.clone();
			glassL.position.z = -glassR.position.z;

			var glassAGeom = new THREE.BoxGeometry(11, 1, 11);
			var glassA = new THREE.Mesh(glassAGeom, glassMat);
			this.mesh.add(glassR);
			this.mesh.add(glassL);
			this.mesh.add(glassA);

			var earGeom = new THREE.BoxGeometry(2, 3, 2);
			var earL = new THREE.Mesh(earGeom, faceMat);
			earL.position.set(0, 0, -6);
			var earR = earL.clone();
			earR.position.set(0, 0, 6);
			this.mesh.add(earL);
			this.mesh.add(earR);
};

// TODO: add to clas Pilot
// move the hair
Pilot.prototype.updateHairs = function () {
			// get the hair
			var hairs = this.hairsTop.children;

			// update them according to the angle angleHairs
			var l = hairs.length;
			for (var i = 0; i < l; i++) {
						var h = hairs[i];
						// each hair element will scale on cyclical basis between 75% and 100% of its original size
						h.scale.y = .75 + Math.cos(this.angleHairs + i / 3) * .25;
			}
			// increment the angle for the next frame
			this.angleHairs += .16;
};

function createPilot() {
			return new Pilot();
}

exports.createPilot = createPilot;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.mousePos = exports.initHandleMouseMove = undefined;

var _scene = __webpack_require__(1);

function initHandleMouseMove() {
	document.addEventListener('mousemove', handleMouseMove, false);
}

var mousePos = { x: 0, y: 0 };

// now handle the mousemove event
function handleMouseMove(event) {
	// here we are converting the mouse position value received 
	// to a normalized value varying between -1 and 1;
	// this is the formula for the horizontal axis:

	var tx = -1 + event.clientX / _scene.WIDTH * 2;

	// for the vertical axis, we need to inverse the formula 
	// because the 2D y-axis goes the opposite direction of the 3D y-axis

	var ty = 1 - event.clientY / _scene.HEIGHT * 2;
	exports.mousePos = mousePos = { x: tx, y: ty };
}

exports.initHandleMouseMove = initHandleMouseMove;
exports.mousePos = mousePos;

/***/ }),
/* 6 */,
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _scene = __webpack_require__(1);

var _lights = __webpack_require__(8);

var _airplane = __webpack_require__(3);

var _sea = __webpack_require__(9);

var _sky = __webpack_require__(10);

var _pilot = __webpack_require__(4);

var _handleMouseMove = __webpack_require__(5);

var _airplaneControl = __webpack_require__(11);

window.addEventListener('load', init, false);

function init() {
	// set up the scene, the camera and the renderer
	(0, _scene.createScene)();

	// add the lights
	(0, _lights.createLights)();

	// add the objects
	(0, _airplane.createAirplane)();
	(0, _sea.createSea)();
	(0, _sky.createSky)();
	(0, _pilot.createPilot)();

	// add controls
	(0, _handleMouseMove.initHandleMouseMove)();

	// start a loop that will update the objects' positions 
	// and render the scene on each frame
	gameLoop();
}

function gameLoop() {
	(0, _sea.updateSea)();
	(0, _sky.updateSky)();
	(0, _airplaneControl.updatePlane)();

	// render the scene
	_scene.renderer.render(_scene.scene, _scene.camera);

	// call the loop function again
	requestAnimationFrame(gameLoop);
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.createLights = undefined;

var _three = __webpack_require__(0);

var THREE = _interopRequireWildcard(_three);

var _scene = __webpack_require__(1);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function createLights() {
	// an ambient light modifies the global color of a scene and makes the shadows softer
	var ambientLight = new THREE.AmbientLight(0xdc8874, .22);

	// A hemisphere light is a gradient colored light; 
	// the first parameter is the sky color, the second parameter is the ground color, 
	// the third parameter is the intensity of the light
	var hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, .9);

	// A directional light shines from a specific direction. 
	// It acts like the sun, that means that all the rays produced are parallel. 
	var shadowLight = new THREE.DirectionalLight(0xffffff, .9);

	// Set the direction of the light  
	shadowLight.position.set(150, 350, 350);

	// Allow shadow casting 
	shadowLight.castShadow = true;

	// define the visible area of the projected shadow
	shadowLight.shadow.camera.left = -400;
	shadowLight.shadow.camera.right = 400;
	shadowLight.shadow.camera.top = 400;
	shadowLight.shadow.camera.bottom = -400;
	shadowLight.shadow.camera.near = 1;
	shadowLight.shadow.camera.far = 1000;

	// define the resolution of the shadow; the higher the better, 
	// but also the more expensive and less performant
	shadowLight.shadow.mapSize.width = 2048;
	shadowLight.shadow.mapSize.height = 2048;

	// to activate the lights, just add them to the scene
	_scene.scene.add(hemisphereLight);
	_scene.scene.add(shadowLight);
	_scene.scene.add(ambientLight);
}

exports.createLights = createLights;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.sea = exports.updateSea = exports.createSea = undefined;

var _three = __webpack_require__(0);

var THREE = _interopRequireWildcard(_three);

var _colors = __webpack_require__(2);

var _scene = __webpack_require__(1);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// TODO: convert to class
var Sea = function Sea() {

	// create the geometry (shape) of the cylinder;
	// the parameters are: 
	// radius top, radius bottom, height, number of segments on the radius, number of segments vertically
	var geom = new THREE.CylinderGeometry(600, 600, 800, 40, 10);

	// rotate the geometry on the x axis
	geom.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2));

	// important: by merging vertices we ensure the continuity of the waves
	geom.mergeVertices();

	// get the vertices
	var l = geom.vertices.length;

	// create an array to store new data associated to each vertex
	this.waves = [];

	for (var i = 0; i < l; i++) {
		// get each vertex
		var v = geom.vertices[i];

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
			speed: 0.016 + Math.random() * 0.032
		});
	};

	// create the material 
	var mat = new THREE.MeshPhongMaterial({
		color: _colors.COLORS.blue,
		transparent: true,
		opacity: .8,
		flatShading: THREE.FlatShading
	});

	// To create an object in Three.js, we have to create a mesh 
	// which is a combination of a geometry and some material
	this.mesh = new THREE.Mesh(geom, mat);

	// Allow the sea to receive shadows
	this.mesh.receiveShadow = true;
};

// now we create the function that will be called in each frame 
// to update the position of the vertices to simulate the waves

Sea.prototype.moveWaves = function () {

	// get the vertices
	var verts = this.mesh.geometry.vertices;
	var l = verts.length;

	for (var i = 0; i < l; i++) {
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
	this.mesh.geometry.verticesNeedUpdate = true;

	sea.mesh.rotation.z += .005;
};

var sea = void 0;

function createSea() {
	exports.sea = sea = new Sea();

	// push it a little bit at the bottom of the scene
	sea.mesh.position.y = -600;

	// add the mesh of the sea to the scene
	_scene.scene.add(sea.mesh);
}

function updateSea() {
	sea.mesh.rotation.z += .005;
	sea.moveWaves();
}

exports.createSea = createSea;
exports.updateSea = updateSea;
exports.sea = sea;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.sky = exports.updateSky = exports.createSky = undefined;

var _three = __webpack_require__(0);

var THREE = _interopRequireWildcard(_three);

var _colors = __webpack_require__(2);

var _scene = __webpack_require__(1);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// TODO: convert to class
var Cloud = function Cloud() {
	// Create an empty container that will hold the different parts of the cloud
	this.mesh = new THREE.Object3D();

	// create a cube geometry;
	// this shape will be duplicated to create the cloud
	var geom = new THREE.BoxGeometry(20, 20, 20);

	// create a material; a simple white material will do the trick
	var mat = new THREE.MeshPhongMaterial({
		color: _colors.COLORS.white
	});

	// duplicate the geometry a random number of times
	var nBlocs = 3 + Math.floor(Math.random() * 3);
	for (var i = 0; i < nBlocs; i++) {

		// create the mesh by cloning the geometry
		var m = new THREE.Mesh(geom, mat);

		// set the position and the rotation of each cube randomly
		m.position.x = i * 15;
		m.position.y = Math.random() * 10;
		m.position.z = Math.random() * 10;
		m.rotation.z = Math.random() * Math.PI * 2;
		m.rotation.y = Math.random() * Math.PI * 2;

		// set the size of the cube randomly
		var s = .1 + Math.random() * .9;
		m.scale.set(s, s, s);

		// allow each cube to cast and to receive shadows
		m.castShadow = true;
		m.receiveShadow = true;

		// add the cube to the container we first created
		this.mesh.add(m);
	}
};

// Define a Sky Object
var Sky = function Sky() {
	// Create an empty container
	this.mesh = new THREE.Object3D();

	// choose a number of clouds to be scattered in the sky
	this.nClouds = 20;

	// To distribute the clouds consistently,
	// we need to place them according to a uniform angle
	var stepAngle = Math.PI * 2 / this.nClouds;

	// create the clouds
	for (var i = 0; i < this.nClouds; i++) {
		var c = new Cloud();

		// set the rotation and the position of each cloud;
		// for that we use a bit of trigonometry
		var a = stepAngle * i; // this is the final angle of the cloud
		var h = 750 + Math.random() * 200; // this is the distance between the center of the axis and the cloud itself

		// Trigonometry!!! I hope you remember what you've learned in Math :)
		// in case you don't: 
		// we are simply converting polar coordinates (angle, distance) into Cartesian coordinates (x, y)
		c.mesh.position.y = Math.sin(a) * h;
		c.mesh.position.x = Math.cos(a) * h;

		// rotate the cloud according to its position
		c.mesh.rotation.z = a + Math.PI / 2;

		// for a better result, we position the clouds 
		// at random depths inside of the scene
		c.mesh.position.z = -400 - Math.random() * 400;

		// we also set a random scale for each cloud
		var s = 1 + Math.random() * 2;
		c.mesh.scale.set(s, s, s);

		// do not forget to add the mesh of each cloud in the scene
		this.mesh.add(c.mesh);
	}
};

// Now we instantiate the sky and push its center a bit
// towards the bottom of the screen

var sky = void 0;

function createSky() {
	exports.sky = sky = new Sky();
	sky.mesh.position.y = -600;
	_scene.scene.add(sky.mesh);
}

function updateSky() {
	sky.mesh.rotation.z += .01;
}

exports.createSky = createSky;
exports.updateSky = updateSky;
exports.sky = sky;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.updatePlane = undefined;

var _handleMouseMove = __webpack_require__(5);

var _airplane = __webpack_require__(3);

function updatePlane() {
    // let's move the airplane between -100 and 100 on the horizontal axis, 
    // and between 25 and 175 on the vertical axis,
    // depending on the mouse position which ranges between -1 and 1 on both axes;
    // to achieve that we use a normalize function (see below)
    var targetX = normalize(_handleMouseMove.mousePos.x, -1, 1, -100, 100);
    var targetY = normalize(_handleMouseMove.mousePos.y, -1, 1, 25, 175);

    // Move the plane at each frame by adding a fraction of the remaining distance
    _airplane.airplane.mesh.position.y += (targetY - _airplane.airplane.mesh.position.y) * 0.1;

    // Rotate the plane proportionally to the remaining distance
    _airplane.airplane.mesh.rotation.z = (targetY - _airplane.airplane.mesh.position.y) * 0.0128;
    _airplane.airplane.mesh.rotation.x = (_airplane.airplane.mesh.position.y - targetY) * 0.0064;

    _airplane.airplane.propeller.rotation.x += 0.3;

    _airplane.airplane.pilot.updateHairs();
}

function normalize(v, vmin, vmax, tmin, tmax) {
    var nv = Math.max(Math.min(v, vmax), vmin);
    var dv = vmax - vmin;
    var pc = (nv - vmin) / dv;
    var dt = tmax - tmin;
    var tv = tmin + pc * dt;

    return tv;
}

exports.updatePlane = updatePlane;

/***/ })
],[7]);