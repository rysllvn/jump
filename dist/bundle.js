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

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _input_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./input_manager */ "./src/input_manager.js");
/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./model */ "./src/model.js");



const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const input = new _input_manager__WEBPACK_IMPORTED_MODULE_0__["default"]();
const model = new _model__WEBPACK_IMPORTED_MODULE_2__["default"](ctx);

input.bindKeys();
let lastTime = Date.now();

const mainLoop = () => {
    let now = Date.now();
    let dt = (now - lastTime) / 1000;
    lastTime = now;

    model.run(input.pressedKeys, dt);
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
class Model {

}

/* harmony default export */ __webpack_exports__["default"] = (Model);

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map