class Platform {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.touched = false;
        this.bumped = false;
        this.bumpedAt = null;
    }

    turnOffBumped() {
        if (this.bumped && Date.now() - this.bumpedAt > 600) {
            this.bumped = false;
        }
    }
}

export default Platform;