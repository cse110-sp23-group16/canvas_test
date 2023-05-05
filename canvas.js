// Get Canvas and Context
var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var ctx = canvas.getContext('2d');

// Fill background
ctx.fillStyle = "#40104a";
ctx.fillRect(0,0,canvas.width, canvas.height);

// Create background stars
ctx.strokeStyle = '#a3a2a3';
ctx.fillStyle = '#a3a2a3';
for (let i = 0; i < 100; i++) {
    var x = Math.random() * canvas.width;
    var y = Math.random() * canvas.height;

    ctx.beginPath();
    ctx.arc(x, y, 1, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.stroke();
}

// Create foreground stars (interactable)

ctx.strokeStyle = 'white';
ctx.fillStyle = "white";

coordlist = [[40,60],[100, 400],[500, 600],[100, 600],[700, 25],[30, 600]];
for (let i = 0; i < coordlist.length; i++) {
    console.log("Drawing: " + i);
    ctx.beginPath();
    ctx.arc(coordlist[i][0], coordlist[i][1], 3, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.stroke();
}