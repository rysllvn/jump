import InputManager from './input_manager';
import Model from './model';

const input = new InputManager();
let model = new Model();
input.bindKeys();
let lastTime = Date.now();
let status = 'welcome';

const restartGame = () => {
    model = new Model();
};

const mainLoop = () => {
    if (status === 'welcome') {
        if (input.pressedKeys.enter) {
            status = 'playing';
            const h2s = document.querySelectorAll('h2');
            h2s.forEach(ele => ele.className = 'hidden');
        }
    }

    if (status === 'gameOver') {

    }

    if (status === 'playing') {
        if (model.gameOver) {
            if (input.pressedKeys.enter) restartGame();
        }
        let now = Date.now();
        let dt = (now - lastTime) / 1000;
        lastTime = now;
        model.update(input.pressedKeys, dt);
    }
    requestAnimationFrame(() => mainLoop());
}
mainLoop();