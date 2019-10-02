import InputManager from './input_manager';
import Model from './model';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const input = new InputManager();
const model = new Model(ctx);

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