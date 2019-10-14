import Display from './display';
import Flare from './flare';
import Platform from './platform';
import Player from './player';
import { level1 } from './levels';
import { graphics } from './config';

const colors = [
    '#a450fd',
    '#fd5053',
    '#a9fd50',
    '#50fdfa'
];
const introFlare = new Flare(600, 4250, 300, 500, '#a450fd', '#50fdfa');
const viewSpeeds = [0, 40, 80, 140, 220, 260];
const flareSpeeds = [400, 200, 180, 170, 160, 150]
const display = new Display();

class Model {
    constructor() {
        this.entities = {
            player: new Player(400, 4855),
            platforms: level1,
            flares: [introFlare]
        }
        this.dy = 4500;
        this.lastFlare = Date.now();
        this.level = 0;
        this.gameOver = false;
    }

    generatePlatform() {
        const lastY = this.entities.platforms[0].y;
        const x = Math.random() * (graphics.width - 320);
        const y = lastY - 200;
        this.entities.platforms.unshift(new Platform(x, y, 250, 28));
    }

    generateFlares() {
        const now = Date.now();
        if (now - this.lastFlare > flareSpeeds[this.level]) {
            const color1 = Math.floor(Math.random()*3);
            const color2 = Math.floor(Math.random()*3);
            const flare = new Flare(Math.random()*1100 + 50,
                                    this.dy - 500,
                                    Math.random()*100 + 1,
                                    Math.random()*2000 + 10,
                                    colors[color1],
                                    colors[color2]
                                );
            this.entities.flares.push(flare);
            this.lastFlare = now;
        }
    }

    resetGame() {
        this.entities.player.x = 400;
        this.entities.player.y = 4855;
        this.entities.player.vy = 0;

        this.entities.platforms = level1;
        this.entities.flares = [new Flare(600, 4250, 300, 500, '#a450fd', '#50fdfa')];
        this.entities.platforms.forEach(platform => platform.touched = false);
        this.level = 1;
        this.gameOver = false;
        this.entities.player.score = -1;
        this.dy = 4500;
    }

    start() {
        this.level = 1;
    }

    update(inputs, dt) {
        if (this.entities.player.score > 5) this.level = 2;
        if (this.entities.player.score > 15) this.level = 3;
        if (this.entities.player.score > 30) this.level = 4;
        
        if (this.entities.player.y > this.dy + 1.5*graphics.height) {
            this.gameOver = true;
        }
        this.dy -= viewSpeeds[this.level] * dt;
        // if (this.entities.player.y < this.dy) this.dy = this.entities.player.y;
        this.entities.flares = this.entities.flares.filter(flare => flare.y < this.dy + graphics.height + flare.maxRadius);
        this.entities.platforms = this.entities.platforms.filter(platform => platform.y < this.dy + graphics.height + 200);
        this.generateFlares();
        if (this.entities.player.score > this.entities.platforms.length - 3) this.generatePlatform();
        this.entities.flares.forEach(flare => flare.update(dt));
        this.entities.player.update(inputs, dt);
        this.entities.player.handleCollisions(this.entities.platforms);
        display.draw(0, this.dy, this.entities);
    }
}

export default Model;