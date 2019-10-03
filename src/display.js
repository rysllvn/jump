class Display {
    constructor(ctx) {
        this.ctx = ctx;
        this.lastEyeShift = Date.now();
        this.eyePos = 1;
    }

    draw(dx, dy, entities) {
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0,0, 1200, 800);
        this.drawPlayer(dx, dy, entities.player);
        entities.platforms.forEach(platform => this.drawPlatform(dx, dy, platform));
    }

    drawPlatform(dx, dy, platform) {
        const cx = platform.x - dx;
        const cy = platform.y - dy;
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(cx, cy, platform.width, platform.height);
        this.ctx.strokeStyle = 'white';
        this.ctx.strokeRect(cx, cy, platform.width, platform.height);
    }

    drawPlayer(dx, dy, player) {
        const cx = player.x - dx;
        const cy = player.y - dy;
        const vx = player.vx;
        const vy = player.vy;

        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(cx, cy, 50, 50);

        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(8 + cx, cy, 12, 12);
        this.ctx.fillRect(28 + cx, cy, 12, 12);
        this.strokeStyle = 'green';
        this.ctx.strokeRect(cx, cy, 50, 50);

        // Draw pupils
        const now = Date.now();
        this.ctx.fillStyle = 'black';   
        if (vx === 0 && vy === 0) {
            if (now - this.lastEyeShift > 600) {
                this.eyePos = Math.floor(Math.random()*3);
                this.lastEyeShift = now;
            }
            switch (this.eyePos) {
                case 0:
                    this.ctx.fillRect(8 + cx+7, cy+3, 6, 6);
                    this.ctx.fillRect(8 + cx+27, cy+3, 6, 6);
                    break;
                case 1: 
                    this.ctx.fillRect(8 + cx, cy+3, 6, 6);
                    this.ctx.fillRect(8 + cx+20, cy+3, 6, 6);
                    break;
                case 2:
                    this.ctx.fillRect(8 + cx+3, cy, 6, 6);
                    this.ctx.fillRect(8 + cx+23, cy, 6, 6);
                    break;
                default:
                    this.ctx.fillRect(8 + cx+3, cy+3, 6, 6);
                    this.ctx.fillRect(8 + cx+23, cy+3, 6, 6);
                    break;
            }
        } else {
            this.lastEyeShift = now;
        }
        if (vx > 0 && vy < 53) {
            this.ctx.fillRect(8 + cx+7, cy+3, 6, 6);
            this.ctx.fillRect(8 + cx+27, cy+3, 6, 6);
        }
        if (vx > 0 && vy < 0) { 
            this.ctx.fillRect(8 + cx+6, cy, 6, 6);
            this.ctx.fillRect(8 + cx+26, cy, 6, 6);
        }
        if (vx > 0 && vy > 53) {
            this.ctx.fillRect(8 + cx+6, cy+6, 6, 6);
            this.ctx.fillRect(8 + cx+26, cy+6, 6, 6);
        }
        if (vx === 0 && vy > 52) {
            this.ctx.fillRect(8 + cx+3, cy+6, 6, 6);
            this.ctx.fillRect(8 + cx+23, cy+6, 6, 6);
        }
        if (vx === 0 && vy < 0) {
            this.ctx.fillRect(8 + cx+3, cy, 6, 6);
            this.ctx.fillRect(8 + cx+23, cy, 6, 6);
        }
        if (vx < 0 && vy < 52) {
            this.ctx.fillRect(8 + cx, cy+3, 6, 6);
            this.ctx.fillRect(8 + cx+20, cy+3, 6, 6);
        }
        if (vx < 0 && vy < 0) {
            this.ctx.fillRect(8 + cx, cy, 6, 6);
            this.ctx.fillRect(8 + cx+20, cy, 6, 6);
        }
        if (vx < 0 && vy > 53) {
            this.ctx.fillRect(8 + cx, cy+6, 6, 6);
            this.ctx.fillRect(8 + cx+20, cy+6, 6, 6);
        }
    }
}

export default Display;