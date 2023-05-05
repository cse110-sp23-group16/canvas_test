// Get Canvas and Context
var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var ctx = canvas.getContext('2d');

// Class for background
class Background {
    draw() {
        ctx.fillStyle = "#40104a";
        ctx.fillRect(0,0,canvas.width, canvas.height);
    }
    update() {
        this.draw();
    }
}

// Class for background star
class BackgroundStar {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }
    draw() {
        ctx.strokeStyle = '#a3a2a3';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.stroke();
    }
    update() {
        this.draw();
    }
}



// Class for foreground star
class ForegroundStar {
    /*
    This constructor takes the x y for the foreground star,
    along with the radius for the star. The selected state
    enables or disables the selected swelling animation, and
    the swell ratio tells how much to swell by
    */
    constructor(x, y, radius, selected, swell_ratio) {
        this.x = x;
        this.y = y;
        this.default_radius = radius;
        this.radius = radius;
        this.selected = selected;
        this.max_swell = this.radius * swell_ratio;
        this.dswell = 0.05;
    }

    /*
    Draws the circle based on the current values
    */
    draw() {
        if (!this.selected){
            ctx.strokeStyle = 'white';
            ctx.fillStyle = 'white';
        } else {
            ctx.strokeStyle = '#2ec1db';
            ctx.fillStyle = '#2ec1db';
        }
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.stroke();
    }

    /*
    Call with animation loop, updates the swell amount if it is selected
    else set the swell to 0
    */
    update() {
        if (this.selected) {
            this.radius += this.dswell;

            if (this.radius > this.default_radius + this.max_swell) {
                this.dswell = -0.05;
            }
            
            if (this.radius < this.default_radius - this.max_swell) {
                this.dswell = 0.05;
            }
        } else {
            this.radius = this.default_radius;
        }
        this.draw();
    }

    /*
    Click event handler, if the click fell within the region of the circle
    change its selected mode
    */
    click(x, y) {
        if ((this.x - x) ** 2 + (this.y - y) ** 2 < (2*this.default_radius) ** 2) {
            this.selected = !this.selected;
        }
    }
}

// Create background
sky_background = new Background()

let background_star_list = []
// Create background stars
for (let i = 0; i < 100; i++) {
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;

    let bstar = new BackgroundStar(x, y, 2);
    background_star_list.push(bstar);
}
console.log(background_star_list);

// Create foreground stars (interactable)
let coordlist = [[40,60],[100, 400],[500, 600],[100, 600],[700, 25],[30, 600]];
let starlist = []
for (let i = 0; i < coordlist.length; i++) {
    let fstar = new ForegroundStar(coordlist[i][0], coordlist[i][1], 4, false, 0.5);
    starlist.push(fstar);
}

// Capture click event
canvas.addEventListener('click', (event) => {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.x;
    let y = event.clientY - rect.y;

    for (let i = 0; i < starlist.length; i++) {
        starlist[i].click(x,y);
    }
})

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update background
    sky_background.update();
    
    // Update background stars
    for (let i = 0; i < background_star_list.length; i++) {
        background_star_list[i].update();
    }

    // Update foreground stars
    for (let i = 0; i < starlist.length; i++) {
        starlist[i].update();
    }
}

// Begin animation
animate();