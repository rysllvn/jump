class Player {
    constructor(x, y, ctx) {
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;

        this.ctx = ctx;

        this.lastEyeShift = Date.now();
    }

    update() {
        
    }

    draw() {
        const now = Date.now();

        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(this.x, this.y, 50, 50);
        
        // Draw eyes
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(8 + this.x, this.y, 12, 12);
        this.ctx.fillRect(8 + this.x+20, this.y, 12, 12);
        
        // Draw pupils
        this.ctx.fillStyle = 'black';   
        if (this.vx === 0 && this.vy < 51) {
            if (now - this.lastEyeShift > 600) {
                this.eyePos = Math.floor(Math.random()*3);
                this.lastEyeShift = now;
            }
            switch (this.eyePos) {
                case 0:
                    this.ctx.fillRect(8 + this.x+7, this.y+3, 6, 6);
                    this.ctx.fillRect(8 + this.x+27, this.y+3, 6, 6);
                    break;
                case 1: 
                    this.ctx.fillRect(8 + this.x, this.y+3, 6, 6);
                    this.ctx.fillRect(8 + this.x+20, this.y+3, 6, 6);
                    break;
                case 2:
                    this.ctx.fillRect(8 + this.x+3, this.y, 6, 6);
                    this.ctx.fillRect(8 + this.x+23, this.y, 6, 6);
                    break;
                default:
                    this.ctx.fillRect(8 + this.x+3, this.y+3, 6, 6);
                    this.ctx.fillRect(8 + this.x+23, this.y+3, 6, 6);
                    break;
            }
        } else {
            this.lastEyeShift = now;
        }
    
        if (this.vx > 0 && this.vy < 53) {
            this.ctx.fillRect(8 + this.x+7, this.y+3, 6, 6);
            this.ctx.fillRect(8 + this.x+27, this.y+3, 6, 6);
        }
        if (this.vx > 0 && this.vy < 0) { 
            this.ctx.fillRect(8 + this.x+6, this.y, 6, 6);
            this.ctx.fillRect(8 + this.x+26, this.y, 6, 6);
        }
        if (this.vx > 0 && this.vy > 53) {
            this.ctx.fillRect(8 + this.x+6, this.y+6, 6, 6);
            this.ctx.fillRect(8 + this.x+26, this.y+6, 6, 6);
        }
        if (this.vx === 0 && this.vy > 52) {
            this.ctx.fillRect(8 + this.x+3, this.y+6, 6, 6);
            this.ctx.fillRect(8 + this.x+23, this.y+6, 6, 6);
        }
        if (this.vx === 0 && this.vy < 0) {
            this.ctx.fillRect(8 + this.x+3, this.y, 6, 6);
            this.ctx.fillRect(8 + this.x+23, this.y, 6, 6);
        }
        if (this.vx < 0 && this.vy < 52) {
            this.ctx.fillRect(8 + this.x, this.y+3, 6, 6);
            this.ctx.fillRect(8 + this.x+20, this.y+3, 6, 6);
        }
        if (this.vx < 0 && this.vy < 0) {
            this.ctx.fillRect(8 + this.x, this.y, 6, 6);
            this.ctx.fillRect(8 + this.x+20, this.y, 6, 6);
        }
        if (this.vx < 0 && this.vy > 53) {
            this.ctx.fillRect(8 + this.x, y+6, 6, 6);
            this.ctx.fillRect(8 + this.x+20, y+6, 6, 6);
        }
    }
}

export default Player;