import { graphics } from './config';
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

class Display {
    constructor() {
        this.lastEyeShift = Date.now();
        this.eyePos = 1;
    }

    draw(dx, dy, entities) {
        ctx.fillStyle = 'black';
        ctx.fillRect(0,0, graphics.width, graphics.height);
        entities.flares.forEach(flare => this.drawFlare(dx, dy, flare));
        entities.platforms.forEach(platform => this.drawPlatform(dx, dy, platform));
        this.drawPlayer(dx, dy, entities.player);
    }

    drawFlare(dx, dy, flare) {
        const cx = flare.x - dx;
        const cy = flare.y - dy;
        const gradient = ctx.createRadialGradient(cx, cy, 5, cx, cy, flare.radius);
        gradient.addColorStop(0, flare.color1);
        gradient.addColorStop(0.4, flare.color2);
        gradient.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(cx-flare.radius, cy-flare.radius, flare.radius*2, flare.radius*2);
    }

    drawPlatform(dx, dy, platform) {
        const cx = platform.x - dx;
        const cy = platform.y - dy;
        // ctx.fillStyle = '#040404';
        ctx.fillStyle = 'rgba(0,0,0,1)';
        if (platform.touched) {
            ctx.shadowBlur = 30;
            ctx.shadowColor = "white";
        } else if (platform.bumped) {
            ctx.shadowBlur = (Date.now() - platform.bumpedAt)*0.5;
            ctx.shadowColor = "white";
            platform.turnOffBumped();
        }

        ctx.fillRect(cx, cy, platform.width, platform.height);
        ctx.shadowBlur = 0;
        ctx.strokeStyle = 'white';
        // ctx.strokeRect(cx, cy, platform.width, platform.height);
    }

    drawPlayer(dx, dy, player) {
        const cx = player.x - dx;
        const cy = player.y - dy;
        const vx = player.vx;
        const vy = player.vy;

        // Draw body
        ctx.fillStyle = 'black';
        ctx.fillRect(cx, cy+14, 50, 36);
        ctx.beginPath();
        ctx.arc(cx+25, cy+18, 25, 0, Math.PI, true);
        ctx.fill();
        
        // Draw eyes
        ctx.fillStyle = 'white';
        ctx.fillRect(8 + cx, cy, 12, 12);
        ctx.fillRect(28 + cx, cy, 12, 12);

        // Draw pupils
        const now = Date.now();
        ctx.fillStyle = 'black';   
        if (vx === 0 && vy === 0) {
            if (now - this.lastEyeShift > 600) {
                this.eyePos = Math.floor(Math.random()*3);
                this.lastEyeShift = now;
            }
            switch (this.eyePos) {
                case 0:
                    ctx.fillRect(8 + cx+7, cy+3, 6, 6);
                    ctx.fillRect(8 + cx+27, cy+3, 6, 6);
                    break;
                case 1: 
                    ctx.fillRect(8 + cx, cy+3, 6, 6);
                    ctx.fillRect(8 + cx+20, cy+3, 6, 6);
                    break;
                case 2:
                    ctx.fillRect(8 + cx+3, cy, 6, 6);
                    ctx.fillRect(8 + cx+23, cy, 6, 6);
                    break;
                default:
                    ctx.fillRect(8 + cx+3, cy+3, 6, 6);
                    ctx.fillRect(8 + cx+23, cy+3, 6, 6);
                    break;
            }
        } else {
            this.lastEyeShift = now;
        }
        if (vx > 0 && vy < 53) {
            ctx.fillRect(8 + cx+7, cy+3, 6, 6);
            ctx.fillRect(8 + cx+27, cy+3, 6, 6);
        }
        if (vx > 0 && vy < 0) { 
            ctx.fillRect(8 + cx+6, cy, 6, 6);
            ctx.fillRect(8 + cx+26, cy, 6, 6);
        }
        if (vx > 0 && vy > 53) {
            ctx.fillRect(8 + cx+6, cy+6, 6, 6);
            ctx.fillRect(8 + cx+26, cy+6, 6, 6);
        }
        if (vx === 0 && vy > 52) {
            ctx.fillRect(8 + cx+3, cy+6, 6, 6);
            ctx.fillRect(8 + cx+23, cy+6, 6, 6);
        }
        if (vx === 0 && vy < 0) {
            ctx.fillRect(8 + cx+3, cy, 6, 6);
            ctx.fillRect(8 + cx+23, cy, 6, 6);
        }
        if (vx < 0 && vy < 52) {
            ctx.fillRect(8 + cx, cy+3, 6, 6);
            ctx.fillRect(8 + cx+20, cy+3, 6, 6);
        }
        if (vx < 0 && vy < 0) {
            ctx.fillRect(8 + cx, cy, 6, 6);
            ctx.fillRect(8 + cx+20, cy, 6, 6);
        }
        if (vx < 0 && vy > 53) {
            ctx.fillRect(8 + cx, cy+6, 6, 6);
            ctx.fillRect(8 + cx+20, cy+6, 6, 6);
        }
    }
}

export default Display;