import Display from './display';
import Flare from './flare';
import Platform from './platform';
import Player from './player';
import { level1 } from './levels';

const colors = [
    '#a450fd',
    '#fd5053',
    '#a9fd50',
    '#50fdfa'
]

class Model {
    constructor() {
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        this.entities = {
            player: new Player(400, 4800),
            platforms: level1,
            flares: [
                new Flare(600, 4250,300, 400, '#3bf5d3', '#3bf5d3')
            ],
        }
        this.viewSpeeds = [2, 15, 30, 50, 100];
        this.dy = 4500;
        this.display = new Display(ctx);
        this.lastFlare = Date.now();
        this.level = 0;
    }

    generateFlares() {
        const now = Date.now();
        if (now - this.lastFlare > 3000) {
            const color1 = Math.floor(Math.random()*3);
            const color2 = Math.floor(Math.random()*3);
            const flare = new Flare(Math.random()*1150+50, this.dy - 500, 100, 120, colors[color1], colors[color2]);
            this.entities.flares.push(flare);
            this.lastFlare = now;
        }
    }

    update(inputs, dt) {
        this.dy -= this.viewSpeeds[1] * dt;
        this.generateFlares();
        this.entities.flares.forEach(flare => flare.update(dt));
        this.entities.player.update(inputs, dt);
        this.entities.player.handleCollisions(this.entities.platforms);
        this.display.draw(0, this.dy, this.entities)       
    }
}

export default Model;