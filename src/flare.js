import {game, physics} from './config';

class Flare {
    constructor(x, y, radius, maxRadius, color1, color2) {
        this.x = x;
        this.y = y;
        this.color1 = color1;
        this.color2 = color2;
        this.radius = radius;
        this.minRadius = radius;
        this.maxRadius = maxRadius;
        this.growing = true;
        this.vx = 0;
        this.vy = 0;
    }

    update(dt) {
        if (this.growing) {
            this.radius += game.flareGrowSpeed * dt;
        } else {
            this.radius -= game.flareGrowSpeed * dt;
        }
        if (this.radius > this.maxRadius) {
            this.growing = false;
        } else if (this.radius < this.minRadius) {
            this.growing = true;
        }
        // this.vy += physics.gravity/10 * dt;
        this.y += 100 * dt;
    }
}

export default Flare;