import InputManager from './input_manager';
import Model from './model';

const input = new InputManager();
let model = new Model();
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