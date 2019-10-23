# Jump
> JavaScript and HTML 5 Canvas platform game. [Live!](https://device89.github.io/jump/)

## Table of contents
* [General info](#general-info)
* [Screenshots](#screenshots)
* [Technologies](#technologies)
* [Features](#features)
* [Status](#status)
* [Inspiration](#inspiration)
* [Contact](#contact)

## General info
This purpose of this project was to create a simple, but fun game using the awesome capabilities of JavaScript and the HTML 5 Canvas Element.

## Screenshots
![Gameplay](./screenshots/jump-gameplay.gif)

## Technologies
* HTML 5
* Canvas
* CSS 3
* JavaScript

## Code Examples
Moving viewport implemented by seperating game logic and viewport logic:
```
draw(dx, dy, entities) {
        ctx.fillStyle = 'black';
        ctx.fillRect(0,0, graphics.width, graphics.height);
        entities.flares.forEach(flare => this.drawFlare(dx, dy, flare));
        entities.platforms.forEach(platform => this.drawPlatform(dx, dy, platform));
        this.drawPlayer(dx, dy, entities.player);
    }
```

Friction calculations and player acceleration used to give the user a very smooth experience:
```
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
```

## Features
List of features ready and TODOs for future development
* Moving Viewport
* Extremely smooth movement

To-do list:
* Implement a leaderboard

## Status
Project is: _in progress_ until the leaderboard is implemented and the controls are finalized.

## Inpsiration
Ryan S, Parker Harris

## Contact
Created by [Ryan Sullivan](https://www.linkedin.com/in/ryan-sullivan-32080223/) - feel free to contact me!
