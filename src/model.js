import Player from './player';

class Model {
    constructor() {
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        this.player = new Player(400, 750, ctx);
        this.platforms = [];
        this.flares = [];
        this.ctx = ctx;
    }

    clearScreen() {
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0,0, 1200, 800);
    }

    update(inputs, dt) {
        this.clearScreen();
        this.player.update(inputs, dt);
        // this.platforms.forEach(platform => platform.move(dt));
        // this.flares.forEach(flare => flare.move(dt));
        this.player.draw();
    }
}

export default Model;