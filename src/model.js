import Display from './display';
import Platform from './platform';
import Player from './player';

class Model {
    constructor() {
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        this.entities = {
            player: new Player(400, 4800),
            platforms: [
                new Platform(0, 4900, 1200, 50)
            ],
            flares: [],
        }
        this.display = new Display(ctx);
    }

    update(inputs, dt) {
        this.entities.player.update(inputs, dt);
        this.entities.player.handleCollisions(this.entities.platforms);
        this.display.draw(0, 4500, this.entities)       
    }
}

export default Model;