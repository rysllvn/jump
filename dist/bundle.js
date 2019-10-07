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

/***/ "./src/config.js":
/*!***********************!*\
  !*** ./src/config.js ***!
  \***********************/
/*! exports provided: game, physics, graphics */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "game", function() { return game; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "physics", function() { return physics; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "graphics", function() { return graphics; });
const game = {
    flareStartRadius: 100,
    flareGrowSpeed: 20,
}

const physics = {
    gravity: 2400,
    jumpVel: 1200,
    playerSpeed: 500,
    playerAccel: 10000,
    friction: 6000,
    flareSpeed: 500,
    platformSpeeds: 15,
};

const graphics = {
    width: 1200,
    height: 800,
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
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

class Display {
    constructor() {
        this.lastEyeShift = Date.now();
        this.eyePos = 1;
    }

    draw(dx, dy, entities) {
        ctx.fillStyle = 'black';
        ctx.fillRect(0,0, 1200, 800);
        entities.flares.forEach(flare => this.drawFlare(dx, dy, flare));
        this.drawPlayer(dx, dy, entities.player);
        entities.platforms.forEach(platform => this.drawPlatform(dx, dy, platform));
    }

    drawFlare(dx, dy, flare) {
        const cx = flare.x - dx;
        const cy = flare.y - dy;
        const gradient = ctx.createRadialGradient(cx, cy, 5, cx, cy, flare.radius);
        gradient.addColorStop(0, flare.color1);
        gradient.addColorStop(0.4, flare.color2);
        gradient.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(cx-flare.radius, cy-flare.radius, flare.radius*2, flare.radius*2);
    }

    drawPlatform(dx, dy, platform) {
        const cx = platform.x - dx;
        const cy = platform.y - dy;
        // ctx.fillStyle = '#040404';
        ctx.fillStyle = '#000000';

        ctx.fillRect(cx, cy, platform.width, platform.height);
        ctx.strokeStyle = 'white';
        // ctx.strokeRect(cx, cy, platform.width, platform.height);
    }

    drawPlayer(dx, dy, player) {
        const cx = player.x - dx;
        const cy = player.y - dy;
        const vx = player.vx;
        const vy = player.vy;

        // Draw body
        ctx.fillStyle = 'black';
        ctx.fillRect(cx, cy+14, 50, 36);
        ctx.beginPath();
        ctx.arc(cx+25, cy+18, 25, 0, Math.PI, true);
        ctx.fill();
        
        // Draw eyes
        ctx.fillStyle = 'white';
        ctx.fillRect(8 + cx, cy, 12, 12);
        ctx.fillRect(28 + cx, cy, 12, 12);

        // Draw pupils
        const now = Date.now();
        ctx.fillStyle = 'black';   
        if (vx === 0 && vy === 0) {
            if (now - this.lastEyeShift > 600) {
                this.eyePos = Math.floor(Math.random()*3);
                this.lastEyeShift = now;
            }
            switch (this.eyePos) {
                case 0:
                    ctx.fillRect(8 + cx+7, cy+3, 6, 6);
                    ctx.fillRect(8 + cx+27, cy+3, 6, 6);
                    break;
                case 1: 
                    ctx.fillRect(8 + cx, cy+3, 6, 6);
                    ctx.fillRect(8 + cx+20, cy+3, 6, 6);
                    break;
                case 2:
                    ctx.fillRect(8 + cx+3, cy, 6, 6);
                    ctx.fillRect(8 + cx+23, cy, 6, 6);
                    break;
                default:
                    ctx.fillRect(8 + cx+3, cy+3, 6, 6);
                    ctx.fillRect(8 + cx+23, cy+3, 6, 6);
                    break;
            }
        } else {
            this.lastEyeShift = now;
        }
        if (vx > 0 && vy < 53) {
            ctx.fillRect(8 + cx+7, cy+3, 6, 6);
            ctx.fillRect(8 + cx+27, cy+3, 6, 6);
        }
        if (vx > 0 && vy < 0) { 
            ctx.fillRect(8 + cx+6, cy, 6, 6);
            ctx.fillRect(8 + cx+26, cy, 6, 6);
        }
        if (vx > 0 && vy > 53) {
            ctx.fillRect(8 + cx+6, cy+6, 6, 6);
            ctx.fillRect(8 + cx+26, cy+6, 6, 6);
        }
        if (vx === 0 && vy > 52) {
            ctx.fillRect(8 + cx+3, cy+6, 6, 6);
            ctx.fillRect(8 + cx+23, cy+6, 6, 6);
        }
        if (vx === 0 && vy < 0) {
            ctx.fillRect(8 + cx+3, cy, 6, 6);
            ctx.fillRect(8 + cx+23, cy, 6, 6);
        }
        if (vx < 0 && vy < 52) {
            ctx.fillRect(8 + cx, cy+3, 6, 6);
            ctx.fillRect(8 + cx+20, cy+3, 6, 6);
        }
        if (vx < 0 && vy < 0) {
            ctx.fillRect(8 + cx, cy, 6, 6);
            ctx.fillRect(8 + cx+20, cy, 6, 6);
        }
        if (vx < 0 && vy > 53) {
            ctx.fillRect(8 + cx, cy+6, 6, 6);
            ctx.fillRect(8 + cx+20, cy+6, 6, 6);
        }
    }
}

/* harmony default export */ __webpack_exports__["default"] = (Display);

/***/ }),

/***/ "./src/flare.js":
/*!**********************!*\
  !*** ./src/flare.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config */ "./src/config.js");


class Flare {
    constructor(x, y, radius, maxRadius, color1, color2) {
        this.x = x;
        this.y = y;
        this.color1 = color1;
        this.color2 = color2;
        this.radius = radius;
        this.minRadius = radius;
        this.maxRadius = maxRadius;
        this.growing = true;
        this.vx = 0;
        this.vy = 0;
        this.speed = Math.random()*200+50;
    }

    update(dt) {
        if (this.growing) {
            this.radius += _config__WEBPACK_IMPORTED_MODULE_0__["game"].flareGrowSpeed * dt;
        } else {
            this.radius -= _config__WEBPACK_IMPORTED_MODULE_0__["game"].flareGrowSpeed * dt;
        }
        if (this.radius > this.maxRadius) {
            this.growing = false;
        } else if (this.radius < this.minRadius) {
            this.growing = true;
        }
        // this.vy += physics.gravity/10 * dt;
        this.y += this.speed * dt;
    }
}

/* harmony default export */ __webpack_exports__["default"] = (Flare);

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



const input = new _input_manager__WEBPACK_IMPORTED_MODULE_0__["default"]();
let model = new _model__WEBPACK_IMPORTED_MODULE_1__["default"]();
input.bindKeys();
let lastTime = Date.now();
let status = 'welcome';

const mainLoop = () => {
    if (status === 'welcome') {
        if (input.pressedKeys.enter) {
            status = 'playing';
            const instructions = document.querySelector('.instructions');
            instructions.classList.add('hidden');
            model.start();
        }
    }

    if (model.gameOver) {
        const gameOverMessage = document.querySelector('.game-over');
        gameOverMessage.classList.remove('hidden');
        if (input.pressedKeys.enter) {
            model.resetGame();
            status === 'welcome';
            gameOverMessage.classList.add('hidden');
            console.log('hmm');
        }
    }

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
    LEFT:  37,
    RIGHT: 39,
    ENTER: 13,
    JUMP: 38
};

class InputManager {
    constructor() {
        this.pressedKeys = { left: false, right: false, up: false, jump: false, enter: false };
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
        switch (e.keyCode) {
            case KEY.UP:
                e.preventDefault();
                this.pressedKeys.up = value;
                break;
            case KEY.LEFT:
                e.preventDefault();
                this.pressedKeys.left = value;
                break;
            case KEY.RIGHT:
                e.preventDefault();
                this.pressedKeys.right = value;
                break;
            case KEY.JUMP:
                e.preventDefault();
                this.pressedKeys.jump = value;
                break;
            case KEY.ENTER:
                e.preventDefault();
                this.pressedKeys.enter = value;
                break;
            default:
                break;
        }
    }
}

/* harmony default export */ __webpack_exports__["default"] = (InputManager);

/***/ }),

/***/ "./src/levels.js":
/*!***********************!*\
  !*** ./src/levels.js ***!
  \***********************/
/*! exports provided: level1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "level1", function() { return level1; });
/* harmony import */ var _platform__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./platform */ "./src/platform.js");


const level1 = [
    new _platform__WEBPACK_IMPORTED_MODULE_0__["default"](100, 4200, 400, 28),
    new _platform__WEBPACK_IMPORTED_MODULE_0__["default"](520, 4400, 310, 28),
    new _platform__WEBPACK_IMPORTED_MODULE_0__["default"](800, 4580, 200, 28),
    new _platform__WEBPACK_IMPORTED_MODULE_0__["default"](400, 4700, 300, 28),
    new _platform__WEBPACK_IMPORTED_MODULE_0__["default"](0, 4900, 1200, 200)
];

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
/* harmony import */ var _flare__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./flare */ "./src/flare.js");
/* harmony import */ var _platform__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./platform */ "./src/platform.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./player */ "./src/player.js");
/* harmony import */ var _levels__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./levels */ "./src/levels.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./config */ "./src/config.js");







const colors = [
    '#a450fd',
    '#fd5053',
    '#a9fd50',
    '#50fdfa'
];
const introFlare = new _flare__WEBPACK_IMPORTED_MODULE_1__["default"](600, 4250, 300, 500, '#a450fd', '#50fdfa');
const viewSpeeds = [0, 40, 80, 140, 220, 260];
const display = new _display__WEBPACK_IMPORTED_MODULE_0__["default"]();

class Model {
    constructor() {
        this.entities = {
            player: new _player__WEBPACK_IMPORTED_MODULE_3__["default"](400, 4855),
            platforms: _levels__WEBPACK_IMPORTED_MODULE_4__["level1"],
            flares: [introFlare]
        }
        this.dy = 4500;
        this.lastFlare = Date.now();
        this.level = 0;
        this.gameOver = false;
    }

    generatePlatforms() {
        const lastX = this.entities.platforms[0].x;
        const lastY = this.entities.platforms[0].y;
        const x = Math.random() * (_config__WEBPACK_IMPORTED_MODULE_5__["graphics"].width - 500) + 100;
        const y = lastY - 200;
        if (lastY > this.dy + 200) this.entities.platforms.unshift(new _platform__WEBPACK_IMPORTED_MODULE_2__["default"](x, y, 300, 28));
    }

    generateFlares() {
        const now = Date.now();
        if (now - this.lastFlare > 250) {
            const color1 = Math.floor(Math.random()*3);
            const color2 = Math.floor(Math.random()*3);
            const flare = new _flare__WEBPACK_IMPORTED_MODULE_1__["default"](Math.random()*1100 + 50,
                                    this.dy - 500,
                                    Math.random()*100 + 1,
                                    Math.random()*2000 + 10,
                                    colors[color1],
                                    colors[color2]
                                );
            this.entities.flares.push(flare);
            this.lastFlare = now;
        }
    }

    resetGame() {
        this.entities.player.x = 400;
        this.entities.player.y = 4855;
        this.entities.player.vy = 0;

        this.entities.platforms = _levels__WEBPACK_IMPORTED_MODULE_4__["level1"];
        this.entities.platforms.forEach(platform => platform.touched = false);
        this.level = 1;
        this.gameOver = false;
        this.entities.player.score = -1;
        this.dy = 4500;
    }

    start() {
        this.level = 1;
    }

    update(inputs, dt) {
        if (this.entities.player.score > 5) this.level = 2;
        if (this.entities.player.score > 15) this.level = 3;
        if (this.entities.player.score > 30) this.level = 4;
        
        if (this.entities.player.y > this.dy + 1.5*_config__WEBPACK_IMPORTED_MODULE_5__["graphics"].height) {
            this.gameOver = true;
        }
        this.dy -= viewSpeeds[this.level] * dt;
        // if (this.entities.player.y < this.dy) this.dy = this.entities.player.y;
        this.entities.flares = this.entities.flares.filter(flare => flare.y < this.dy + _config__WEBPACK_IMPORTED_MODULE_5__["graphics"].height + flare.maxRadius);
        this.entities.platforms = this.entities.platforms.filter(platform => platform.y < this.dy + _config__WEBPACK_IMPORTED_MODULE_5__["graphics"].height + 200);
        this.generateFlares();
        this.generatePlatforms();
        this.entities.flares.forEach(flare => flare.update(dt));
        this.entities.player.update(inputs, dt);
        this.entities.player.handleCollisions(this.entities.platforms);
        display.draw(0, this.dy, this.entities);
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
        this.touched = false;
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
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config */ "./src/config.js");


class Player {
    constructor(x, y, ctx) {
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.ctx = ctx;
        this.onPlat = true;
        this.lastEyeShift = Date.now();
        this.score = -1;
    }

    handleCollisions(platforms) {
        if (this.x + 50 > _config__WEBPACK_IMPORTED_MODULE_0__["graphics"].width) {
            this.x = _config__WEBPACK_IMPORTED_MODULE_0__["graphics"].width - 50;
            this.vx = 0;
        } else if (this.x < 0) {
            this.x = 0;
            this.vx = 0;
        }
        platforms.forEach(platform => {
            const sx = platform.x; //start x
            const ex = sx + platform.width;
            const sy = platform.y;
            const ey = sy + platform.height;

            if (this.x + 50 > sx && this.x < ex) {
                // Handle floors
                if (this.y + 50 > sy && this.y + 50 < ey ) {
                    this.vy = 0;
                    this.y = sy - 50;
                    this.onPlat = true;
                    if (!platform.touched) {
                        platform.touched = true;
                        this.score += 1;
                    }
                }
                // Handle ceilings
                if (this.y < ey && this.y > sy) {
                    this.vy = 0;
                    this.y = ey;
                }
            }
        });
    }

    update(inputs, dt) {
        if (this.onPlat) {
            if (inputs.jump) this.vy = -_config__WEBPACK_IMPORTED_MODULE_0__["physics"].jumpVel;

            if (!inputs.right && !inputs.left) {
                if (this.vx > 0) {
                    this.vx -= _config__WEBPACK_IMPORTED_MODULE_0__["physics"].friction * dt;
                    if (this.vx < 0) this.vx = 0;
                }
                if (this.vx < 0) {
                    this.vx += _config__WEBPACK_IMPORTED_MODULE_0__["physics"].friction * dt;
                    if (this.vx > 0) this.vx = 0
                }
            }
        }
        if (inputs.right) this.vx += _config__WEBPACK_IMPORTED_MODULE_0__["physics"].playerAccel * dt;
        if (inputs.left) this.vx -= _config__WEBPACK_IMPORTED_MODULE_0__["physics"].playerAccel * dt;
        if (this.vx > _config__WEBPACK_IMPORTED_MODULE_0__["physics"].playerSpeed) this.vx = _config__WEBPACK_IMPORTED_MODULE_0__["physics"].playerSpeed;
        if (this.vx < -_config__WEBPACK_IMPORTED_MODULE_0__["physics"].playerSpeed) this.vx = -_config__WEBPACK_IMPORTED_MODULE_0__["physics"].playerSpeed;

        this.vy += _config__WEBPACK_IMPORTED_MODULE_0__["physics"].gravity * dt;
        this.x += this.vx * dt;
        this.y += this.vy * dt;
        this.onPlat = false;
        document.getElementById('score').innerHTML = `Platforms: ${this.score}`;
    }
}

/* harmony default export */ __webpack_exports__["default"] = (Player);

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map