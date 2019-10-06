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

export default InputManager;