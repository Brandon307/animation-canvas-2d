const canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');

const window_height = window.innerHeight;
const window_width = window.innerWidth;

canvas.height = window_height;
canvas.width = window_width;

canvas.style.backgroundColor = "#ff8";

class Circle {
    constructor(x, y, radius, color, text, speed) {
        this.posx = x;
        this.posy = y;
        this.radius = radius;
        this.color = color;
        this.text = text;
        this.speed = speed;
        this.dx = 1 * this.speed;
        this.dy = 1 * this.speed;
    }

    draw(context) {
        context.beginPath();
        context.strokeStyle = this.color;
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.font = "20px Arial";
        context.fillText(this.text, this.posx, this.posy)
        context.lineWidth = 5;
        context.arc(this.posx, this.posy, this.radius, 0, Math.PI * 2, false);
        context.stroke();
        context.closePath();
    }

    update(context) {
        this.posx += this.dx;
        this.posy += this.dy;
        
        if((this.posX + this.radius) > window_width)
        {
            //Invierte el cirulo o lo fokin regresa
            //Si el circulo supera el margen derecha entonces se mueve a la izquierda
            this.dx = -this.dx;
        }

        if((this.posX - this.radius) <0 )
        {
            //Invierte el cirulo o lo fokin regresa
            //Si el circulo supera el margen izquierda entonces se mueve a la derecha
            this.dx = -this.dx;
        }
        if((this.PosY - this.radius) < 0)
        {
            //Invierte el cirulo o lo fokin regresa
            //Si el circulo supera el margen superior entonces se mueve hacia abajo
            this.dy = -this.dy;
        }
        if((this.PosY + this.radius) > window_height)
        {
            //Invierte el cirulo o lo fokin regresa
            //Si el circulo supera el margen inferior entonces se mueve hacia arriba
            this.dy = -this.dy;
        }
        
        this.posx = Math.max(this.radius, Math.min(this.posx, window_width - this.radius));
        this.posy = Math.max(this.radius, Math.min(this.posy, window_height - this.radius));
        
        this.draw(context);
    }
    
}

let arrayCircle = [];

const n = 10;
for (let i = 0; i < n; i++) {
    let randomX = Math.random() * window_width;
    let randomY = Math.random() * window_height;
    let randomRadius = Math.floor(Math.random() * 100 + 30);
    let randomSpeed = Math.random() * (5 - 1) + 1; // Genera un número aleatorio entre 1 y 5
    let myCircle = new Circle(randomX, randomY, randomRadius, "purple", i + 1, randomSpeed);
    arrayCircle.push(myCircle);
}


let updateCircles = function () {
    requestAnimationFrame(updateCircles);
    ctx.clearRect(0, 0, window_width, window_height);
    for (let i = 0; i < arrayCircle.length; i++) {
        arrayCircle[i].update(ctx);
    }
}

updateCircles(); 