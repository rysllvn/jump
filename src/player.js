import { physics, graphics } from "./config";

class Player {
    constructor(x, y, ctx) {
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.ctx = ctx;
        this.onPlat = true;
        this.lastEyeShift = Date.now();
    }

    handleCollisions(platforms) {
        if (this.x + 50 > graphics.width) {
            this.x = graphics.width - 50;
            this.vx = 0;
        } else if (this.x < 0) {
            this.x = 0;
            this.vx = 0;
        }
        platforms.forEach(platform => {
            const sx = platform.x; //start x
            const ex = sx + platform.width;
            const sy = platform.y;
            const ey = sy + platform.height;

            if (this.x + 50 > sx && this.x < ex) {
                // Handle floors
                if (this.y + 50 > sy && this.y + 50 < ey ) {
                    this.vy = 0;
                    this.y = sy - 50;
                    this.onPlat = true;
                }
                // Handle ceilings
                if (this.y < ey && this.y > sy) {
                    this.vy = 0;
                    this.y = ey;
                }
            }
        });
    }

    update(inputs, dt) {
        if (this.onPlat) {
            if (inputs.jump) this.vy = -physics.jumpVel;

            if (!inputs.right && !inputs.left) {
                if (this.vx > 0) {
                    this.vx -= physics.friction * dt;
                    if (this.vx < 0) this.vx = 0;
                }
                if (this.vx < 0) {
                    this.vx += physics.friction * dt;
                    if (this.vx > 0) this.vx = 0
                }
            }
        }
        if (inputs.right) this.vx += physics.playerAccel * dt;
        if (inputs.left) this.vx -= physics.playerAccel * dt;
        if (this.vx > physics.playerSpeed) this.vx = physics.playerSpeed;
        if (this.vx < -physics.playerSpeed) this.vx = -physics.playerSpeed;

        this.vy += physics.gravity * dt;
        this.x += this.vx * dt;
        this.y += this.vy * dt;
        this.onPlat = false;
    }
}

export default Player;