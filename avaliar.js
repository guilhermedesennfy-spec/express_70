

const isMobile = /Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent);

const BASE_W = 800;
const BASE_H = 1295;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const W = canvas.width;
const H = canvas.height;



function loadImages(paths) {
    return Promise.all(
        paths.map(src => {
            return new Promise(res => {
                const img = new Image();
                img.onload = () => res(img);
                img.src = src;
            });
        })
    );
}

const spritePaths = [
    ...Array.from({ length: 24 }, (_, i) => `express_70/${i}.png`)
];



class Obj {
    constructor(image, x, y, tipo = "sprite") {
        this.image = image;
        this.position = [x, y];
        this.frame = 0;
        this.tick = 0;
        this.tipo = tipo;
    }

    draw() {
        if (this.tipo === "bg") {
            ctx.drawImage(this.image, this.position[0], this.position[1], W, H);
        } else {
            ctx.drawImage(this.image, this.position[0], this.position[1],W,H);
        }
    }

    anim(tick, inicio, frames, sprites) {
        if (this.frame < inicio) this.frame = inicio;

        this.tick++;
        if (this.tick >= tick) {
            this.tick = 0;
            this.frame++;
        }

        if (this.frame >= frames) {
            this.frame = inicio;
        }

        this.image = sprites[this.frame];
    }
}




let clicando = false;
let  sk, sprites;

function startGame(loadedSprites) {
    sprites = loadedSprites;

    sk = new Obj(sprites[0], 0, 0);

    requestAnimationFrame(gameLoop);
}

function gameLoop() {
    ctx.clearRect(0, 0, W, H);

    sk.draw();


    if (!clicando) {
        sk.anim(108, 0, 2, sprites);

    } else {
        sk.anim(108, 2, 24, sprites);
    }

    requestAnimationFrame(gameLoop);
}


if (!isMobile) {
    document.addEventListener("mousedown", () => clicando = true);
    document.addEventListener("mouseup", () => clicando = false);
} else {
    document.addEventListener("touchstart", () => clicando = true);
    document.addEventListener("touchend", () => clicando = false);
}


loadImages(spritePaths).then(startGame);
