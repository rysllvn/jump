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

export default InputManager;