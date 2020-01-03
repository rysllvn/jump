const KEY = {
    LEFT:  37,
    RIGHT: 39,
    ENTER: 13,
    JUMP: 38,
    SEC_LEFT: 65,
    SEC_RIGHT: 68,
    SEC_JUMP: 87,
};

class InputManager {
    constructor() {
        this.pressedKeys = { left: false, right: false, jump: false, enter: false };
    }

    bindKeys() {
        addEventListener('keyup', this.handleKeys.bind(this, false));
        addEventListener('keydown', this.handleKeys.bind(this, true));
    }
      
    unbindKeys() {
        removeEventListener('keyup', this.handleKeys);
        removeEventListener('keydown', this.handleKeys);
    }
      
    handleKeys(value, e){
        switch (e.keyCode) {
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
            case KEY.SEC_LEFT:
                e.preventDefault();
                this.pressedKeys.left = value;
                break;
            case KEY.SEC_RIGHT:
                e.preventDefault();
                this.pressedKeys.right = value;
                break;
            case KEY.SEC_JUMP:
                e.preventDefault();
                this.pressedKeys.jump = value;
                break;
            default:
                break;
        }
    }
}

export default InputManager;