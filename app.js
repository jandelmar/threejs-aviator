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

var _scene = __webpack_require__(1);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var AirPlane = function AirPlane() {

	this.mesh = new THREE.Object3D();

	// Create the cabin
	var geomCockpit = new THREE.BoxGeometry(60, 50, 50, 1, 1, 1);
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
};

var airplane = void 0;

function createAirplane() {
	exports.airplane = airplane = new AirPlane();
	airplane.mesh.scale.set(.25, .25, .25);
	airplane.mesh.position.y = 100;
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
/* 5 */,
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _scene = __webpack_require__(1);

var _lights = __webpack_require__(7);

var _airplane = __webpack_require__(3);

var _sea = __webpack_require__(8);

var _sky = __webpack_require__(9);

var _handleMouseMove = __webpack_require__(4);

var _airplaneControl = __webpack_require__(10);

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

	// add controls
	(0, _handleMouseMove.initHandleMouseMove)();

	// start a loop that will update the objects' positions 
	// and render the scene on each frame
	gameLoop();
}

function gameLoop() {
	// Rotate the propeller, the sea and the sky
	_sea.sea.mesh.rotation.z += .005; // TODO : put to sea.updateSea()
	_sky.sky.mesh.rotation.z += .01; // TODO: put to sky.updateSky()

	(0, _airplaneControl.updatePlane)();

	// render the scene
	_scene.renderer.render(_scene.scene, _scene.camera);

	// call the loop function again
	requestAnimationFrame(gameLoop);
}

/***/ }),
/* 7 */
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
}

exports.createLights = createLights;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.sea = exports.createSea = undefined;

var _three = __webpack_require__(0);

var THREE = _interopRequireWildcard(_three);

var _colors = __webpack_require__(2);

var _scene = __webpack_require__(1);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// First let's define a Sea object :
var Sea = function Sea() {

	// create the geometry (shape) of the cylinder;
	// the parameters are: 
	// radius top, radius bottom, height, number of segments on the radius, number of segments vertically
	var geom = new THREE.CylinderGeometry(600, 600, 800, 40, 10);

	// rotate the geometry on the x axis
	geom.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2));

	// create the material 
	var mat = new THREE.MeshPhongMaterial({
		color: _colors.COLORS.blue,
		transparent: true,
		opacity: .6,
		flatShading: THREE.FlatShading
	});

	// To create an object in Three.js, we have to create a mesh 
	// which is a combination of a geometry and some material
	this.mesh = new THREE.Mesh(geom, mat);

	// Allow the sea to receive shadows
	this.mesh.receiveShadow = true;
};

var sea = void 0;

function createSea() {
	exports.sea = sea = new Sea();

	// push it a little bit at the bottom of the scene
	sea.mesh.position.y = -600;

	// add the mesh of the sea to the scene
	_scene.scene.add(sea.mesh);
}

exports.createSea = createSea;
exports.sea = sea;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.sky = exports.createSky = undefined;

var _three = __webpack_require__(0);

var THREE = _interopRequireWildcard(_three);

var _colors = __webpack_require__(2);

var _scene = __webpack_require__(1);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

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

exports.createSky = createSky;
exports.sky = sky;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.updatePlane = undefined;

var _handleMouseMove = __webpack_require__(4);

var _airplane = __webpack_require__(3);

function updatePlane() {
    // let's move the airplane between -100 and 100 on the horizontal axis, 
    // and between 25 and 175 on the vertical axis,
    // depending on the mouse position which ranges between -1 and 1 on both axes;
    // to achieve that we use a normalize function (see below)
    var targetX = normalize(_handleMouseMove.mousePos.x, -1, 1, -100, 100);
    var targetY = normalize(_handleMouseMove.mousePos.y, -1, 1, 25, 175);

    // update the airplane's position
    _airplane.airplane.mesh.position.y = targetY;
    _airplane.airplane.mesh.position.x = targetX;
    _airplane.airplane.propeller.rotation.x += 0.3;
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
],[6]);