/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./config.js":
/*!*******************!*\
  !*** ./config.js ***!
  \*******************/
/*! exports provided: game, physics, graphics */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "game", function() { return game; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "physics", function() { return physics; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "graphics", function() { return graphics; });
const game = {
    floor: 800,
    playerHeight: 50,
    platformDistance: 60
}

const physics = {
    gravity: 2000,
    jumpVel: 1000,
    playerSpeed: 800,
    playerAccel: 100000,
    friction: 50000,
    flareSpeed: 500,
    platformSpeeds: 15,
};

const graphics = {
    screenWidth: 1200,
    screenHeight: 800,
};

/***/ }),

/***/ "./src/display.js":
/*!************************!*\
  !*** ./src/display.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class Display {
    constructor(ctx) {
        this.ctx = ctx;
        this.lastEyeShift = Date.now();
        this.eyePos = 1;
    }

    draw(dx, dy, entities) {
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0,0, 1200, 800);
        this.drawPlayer(dx, dy, entities.player);
        entities.platforms.forEach(platform => this.drawPlatform(dx, dy, platform));
    }

    drawPlatform(dx, dy, platform) {
        const cx = platform.x - dx;
        const cy = platform.y - dy;
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(cx, cy, platform.width, platform.height);
        this.ctx.strokeStyle = 'white';
        this.ctx.strokeRect(cx, cy, platform.width, platform.height);
    }

    drawPlayer(dx, dy, player) {
        const cx = player.x - dx;
        const cy = player.y - dy;
        const vx = player.vx;
        const vy = player.vy;

        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(cx, cy, 50, 50);

        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(8 + cx, cy, 12, 12);
        this.ctx.fillRect(28 + cx, cy, 12, 12);
        this.strokeStyle = 'green';
        this.ctx.strokeRect(cx, cy, 50, 50);

        // Draw pupils
        const now = Date.now();
        this.ctx.fillStyle = 'black';   
        if (vx === 0 && vy === 0) {
            if (now - this.lastEyeShift > 600) {
                this.eyePos = Math.floor(Math.random()*3);
                this.lastEyeShift = now;
            }
            switch (this.eyePos) {
                case 0:
                    this.ctx.fillRect(8 + cx+7, cy+3, 6, 6);
                    this.ctx.fillRect(8 + cx+27, cy+3, 6, 6);
                    break;
                case 1: 
                    this.ctx.fillRect(8 + cx, cy+3, 6, 6);
                    this.ctx.fillRect(8 + cx+20, cy+3, 6, 6);
                    break;
                case 2:
                    this.ctx.fillRect(8 + cx+3, cy, 6, 6);
                    this.ctx.fillRect(8 + cx+23, cy, 6, 6);
                    break;
                default:
                    this.ctx.fillRect(8 + cx+3, cy+3, 6, 6);
                    this.ctx.fillRect(8 + cx+23, cy+3, 6, 6);
                    break;
            }
        } else {
            this.lastEyeShift = now;
        }
        if (vx > 0 && vy < 53) {
            this.ctx.fillRect(8 + cx+7, cy+3, 6, 6);
            this.ctx.fillRect(8 + cx+27, cy+3, 6, 6);
        }
        if (vx > 0 && vy < 0) { 
            this.ctx.fillRect(8 + cx+6, cy, 6, 6);
            this.ctx.fillRect(8 + cx+26, cy, 6, 6);
        }
        if (vx > 0 && vy > 53) {
            this.ctx.fillRect(8 + cx+6, cy+6, 6, 6);
            this.ctx.fillRect(8 + cx+26, cy+6, 6, 6);
        }
        if (vx === 0 && vy > 52) {
            this.ctx.fillRect(8 + cx+3, cy+6, 6, 6);
            this.ctx.fillRect(8 + cx+23, cy+6, 6, 6);
        }
        if (vx === 0 && vy < 0) {
            this.ctx.fillRect(8 + cx+3, cy, 6, 6);
            this.ctx.fillRect(8 + cx+23, cy, 6, 6);
        }
        if (vx < 0 && vy < 52) {
            this.ctx.fillRect(8 + cx, cy+3, 6, 6);
            this.ctx.fillRect(8 + cx+20, cy+3, 6, 6);
        }
        if (vx < 0 && vy < 0) {
            this.ctx.fillRect(8 + cx, cy, 6, 6);
            this.ctx.fillRect(8 + cx+20, cy, 6, 6);
        }
        if (vx < 0 && vy > 53) {
            this.ctx.fillRect(8 + cx, cy+6, 6, 6);
            this.ctx.fillRect(8 + cx+20, cy+6, 6, 6);
        }
    }
}

/* harmony default export */ __webpack_exports__["default"] = (Display);

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _input_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./input_manager */ "./src/input_manager.js");
/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./model */ "./src/model.js");



const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const input = new _input_manager__WEBPACK_IMPORTED_MODULE_0__["default"]();
const model = new _model__WEBPACK_IMPORTED_MODULE_1__["default"](ctx);

input.bindKeys();
let lastTime = Date.now();

const mainLoop = () => {
    let now = Date.now();
    let dt = (now - lastTime) / 1000;
    lastTime = now;

    model.update(input.pressedKeys, dt);
    requestAnimationFrame(() => mainLoop());
}
mainLoop();

/***/ }),

/***/ "./src/input_manager.js":
/*!******************************!*\
  !*** ./src/input_manager.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const KEY = {
    UP: 12,
    DOWN: 83,
    LEFT:  37,
    RIGHT: 39,
    ENTER: 13,
    JUMP: 38
};

class InputManager {
    constructor() {
        this.pressedKeys = { left: false, right: false, up: false, down: false, jump: false, enter: false };
        this.mousePos = {
            x: -1,
            y: -1
        };
    }

    bindKeys() {
        window.addEventListener('keyup', this.handleKeys.bind(this, false));
        window.addEventListener('keydown', this.handleKeys.bind(this, true));
    }
      
    unbindKeys() {
        window.removeEventListener('keyup', this.handleKeys);
        window.removeEventListener('keydown', this.handleKeys);
    }
      
    handleKeys(value, e){
        let keys = this.pressedKeys;
        switch (e.keyCode) {
            case KEY.UP:
                e.preventDefault();
                keys.up = value;
                break;
            case KEY.DOWN:
                e.preventDefault();
                keys.down = value;
                break;
            case KEY.LEFT:
                e.preventDefault();
                keys.left = value;
                break;
            case KEY.RIGHT:
                e.preventDefault();
                keys.right = value;
                break;
            case KEY.JUMP:
                e.preventDefault();
                keys.jump = value;
                break;
            case KEY.ENTER:
                e.preventDefault();
                keys.enter = value;
                break;
            default:
                break;
        }
        this.pressedKeys = keys;
    }
}

/* harmony default export */ __webpack_exports__["default"] = (InputManager);

/***/ }),

/***/ "./src/model.js":
/*!**********************!*\
  !*** ./src/model.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _display__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./display */ "./src/display.js");
/* harmony import */ var _platform__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./platform */ "./src/platform.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./player */ "./src/player.js");




class Model {
    constructor() {
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        this.entities = {
            player: new _player__WEBPACK_IMPORTED_MODULE_2__["default"](400, 4800),
            platforms: [
                new _platform__WEBPACK_IMPORTED_MODULE_1__["default"](0, 4900, 1200, 50)
            ],
            flares: [],
        }
        this.display = new _display__WEBPACK_IMPORTED_MODULE_0__["default"](ctx);
    }

    update(inputs, dt) {
        this.entities.player.update(inputs, dt);
        this.entities.player.handleCollisions(this.entities.platforms);
        this.display.draw(0, 4500, this.entities)       
    }
}

/* harmony default export */ __webpack_exports__["default"] = (Model);

/***/ }),

/***/ "./src/platform.js":
/*!*************************!*\
  !*** ./src/platform.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class Platform {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    update() {

    }
}

/* harmony default export */ __webpack_exports__["default"] = (Platform);

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config */ "./config.js");


class Player {
    constructor(x, y, ctx) {
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.ctx = ctx;
        this.onPlat = true;
        this.lastEyeShift = Date.now();
    }

    handleCollisions(platforms) {
        platforms.forEach(platform => {
            const sx = platform.x; //start x
            const ex = sx + platform.width;
            const sy = platform.y;
            const ey = sy + platform.height;
            if (this.y + 50 > sy && this.y + 50 < ey ) {
                this.vy = 0;
                this.y = sy - 50;
                this.onPlat = true;
            }
        });
    }

    update(inputs, dt) {
        if (this.onPlat) {
            if (inputs.right || inputs.left) {
                if (inputs.right) this.vx += _config__WEBPACK_IMPORTED_MODULE_0__["physics"].playerAccel * dt;
                if (inputs.left) this.vx -= _config__WEBPACK_IMPORTED_MODULE_0__["physics"].playerAccel * dt;
            } else {
                if (this.vx > 0) {
                    this.vx -= _config__WEBPACK_IMPORTED_MODULE_0__["physics"].friction * dt;
                    if (this.vx < 0) this.vx = 0;
                }
                if (this.vx < 0) {
                    this.vx += _config__WEBPACK_IMPORTED_MODULE_0__["physics"].friction * dt;
                    if (this.vx > 0) this.vx = 0
                }
            }
            if (inputs.jump) this.vy = -_config__WEBPACK_IMPORTED_MODULE_0__["physics"].jumpVel;
        }
        if (this.vx > _config__WEBPACK_IMPORTED_MODULE_0__["physics"].playerSpeed) this.vx = _config__WEBPACK_IMPORTED_MODULE_0__["physics"].playerSpeed;
        if (this.vx < -_config__WEBPACK_IMPORTED_MODULE_0__["physics"].playerSpeed) this.vx = -_config__WEBPACK_IMPORTED_MODULE_0__["physics"].playerSpeed;

        this.vy += _config__WEBPACK_IMPORTED_MODULE_0__["physics"].gravity * dt;
        this.x += this.vx * dt;
        this.y += this.vy * dt;
        this.onPlat = false;
    }
}

/* harmony default export */ __webpack_exports__["default"] = (Player);

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map