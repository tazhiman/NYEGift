
var canvas = document.getElementById("starfield");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function createCornerImages() {
    // First create the SVG mask for the heart shape
    const svgMask = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgMask.style.position = "absolute";
    svgMask.style.width = "0";
    svgMask.style.height = "0";
    svgMask.innerHTML = `
        <defs>
            <clipPath id="heartPath">
                <path d="M25,45 A20,20,0,0,1,5,25 A20,20,0,0,1,25,5 A20,20,0,0,1,45,25 A20,20,0,0,1,25,45 Z" />
            </defs>
        </clipPath>
    `;
    document.body.appendChild(svgMask);

    const images = [
       
        { src: "public/images/image2.jpg", position: "top-right" },
        { src: "public/images/image3.jpg", position: "bottom-left" }
    ];

    images.forEach(({ src, position }) => {
        // Create container for heart effect
        const heartContainer = document.createElement("div");
        const imgContainer = document.createElement("div");
        const img = document.createElement("img");
        
        // Set image properties
        img.src = src;
        
        // Style the heart container
        heartContainer.style.position = "fixed";
        heartContainer.style.zIndex = "1000";
        heartContainer.style.transition = "transform 0.3s ease, filter 0.3s ease";
        heartContainer.style.width = "150px";
        heartContainer.style.height = "150px";
        
        // Style the image container
        imgContainer.style.width = "100%";
        imgContainer.style.height = "100%";
        imgContainer.style.position = "relative";
        imgContainer.style.overflow = "hidden";
        imgContainer.style.clipPath = "path('M75,138.5 C38.7,99.4,2.3,67.4,11.1,37.3C19.9,7.3,61.3,6.9,75,33.4c13.7-26.5,55.1-26.1,63.9,3.9C147.7,67.4,111.3,99.4,75,138.5z')";
        
        // Style the image
        img.style.width = "100%";
        img.style.height = "100%";
        img.style.objectFit = "cover";
        
        // Add glowing border effect
        heartContainer.style.filter = "drop-shadow(0 0 10px rgba(45, 45, 255, 0.5))";
        
        // Position the container
        switch(position) {
            case "top-left":
                heartContainer.style.top = "20px";
                heartContainer.style.left = "20px";
                break;
            case "top-right":
                heartContainer.style.top = "20px";
                heartContainer.style.right = "20px";
                break;
            case "bottom-right":
                heartContainer.style.bottom = "20px";
                heartContainer.style.right = "20px";
                break;
        }
        
        // Add hover effects
        heartContainer.addEventListener("mouseover", () => {
            heartContainer.style.transform = "scale(1.1) rotate(-5deg)";
            heartContainer.style.filter = "drop-shadow(0 0 15px rgba(45, 45, 255, 0.8))";
        });
        
        heartContainer.addEventListener("mouseout", () => {
            heartContainer.style.transform = "scale(1) rotate(0deg)";
            heartContainer.style.filter = "drop-shadow(0 0 10px rgba(45, 45, 255, 0.5))";
        });
        
        // Assemble the elements
        imgContainer.appendChild(img);
        heartContainer.appendChild(imgContainer);
        document.body.appendChild(heartContainer);
    });
}

// Call the function to create images
createCornerImages();

// Rest of your existing starfield code
var context = canvas.getContext("2d");
var stars = 500;
var colorrange = [0, 60, 240];
var starArray = [];


function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Initialize stars with random opacity values
for (var i = 0; i < stars; i++) {
    var x = Math.random() * canvas.offsetWidth;
    var y = Math.random() * canvas.offsetHeight;
    var radius = Math.random() * 1.2;
    var hue = colorrange[getRandom(0, colorrange.length - 1)];
    var sat = getRandom(50, 100);
    var opacity = Math.random();
    starArray.push({ x, y, radius, hue, sat, opacity });
}

var frameNumber = 0;
var opacity = 0;
var secondOpacity = 0;
var thirdOpacity = 0;

var baseFrame = context.getImageData(0, 0, window.innerWidth, window.innerHeight);

function drawStars() {
    for (var i = 0; i < stars; i++) {
        var star = starArray[i];

        context.beginPath();
        context.arc(star.x, star.y, star.radius, 0, 360);
        context.fillStyle = "hsla(" + star.hue + ", " + star.sat + "%, 88%, " + star.opacity + ")";
        context.fill();
    }
}

function updateStars() {
    for (var i = 0; i < stars; i++) {
        if (Math.random() > 0.99) {
            starArray[i].opacity = Math.random();
        }
    }
}

const button = document.getElementById("valentinesButton");

button.addEventListener("click", () => {
  if (button.textContent === "Click Me! ❤") {
    button.textContent = "loading...";
    fetch('send_mail.php')
      .then(response => {
        if (response.ok) {
          button.textContent = "Check Your Email 🙃";
        } else {
          console.error('Failed to send email');
          button.textContent = "Error 😞";
        }
      })
      .catch(error => {
        // Handle network errors or other issues
        console.error('Error:', error);
        button.textContent = "Error 😞";
      });
  }
});

function drawTextWithLineBreaks(lines, x, y, fontSize, lineHeight) {
    lines.forEach((line, index) => {
        context.fillText(line, x, y + index * (fontSize + lineHeight));
    });
}

function drawText() {
    var fontSize = Math.min(30, window.innerWidth / 24); // Adjust font size based on screen width
    var lineHeight = 8;

    context.font = fontSize + "px Comic Sans MS";
    context.textAlign = "center";
    
    // glow effect
    context.shadowColor = "rgba(45, 45, 255, 1)";
    context.shadowBlur = 8;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;

    if(frameNumber < 250){
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;
        context.fillText("Every single day i wonder how i got so lucky", canvas.width/2, canvas.height/2);
        opacity = opacity + 0.01;
    }
    //fades out the text by decreasing the opacity
    if(frameNumber >= 250 && frameNumber < 500){
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;
        context.fillText("Every single day i wonder how i got so lucky", canvas.width/2, canvas.height/2);
        opacity = opacity - 0.01;
    }

    //needs this if statement to reset the opacity before next statement on canvas
    if(frameNumber == 500){
        opacity = 0;
    }
    if(frameNumber > 500 && frameNumber < 750){
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;

        if (window.innerWidth < 600) {           //shortens long sentence for mobile screens
            drawTextWithLineBreaks(["amongst billions and trillions of stars,", "over the span of billions of years"], canvas.width / 2, canvas.height / 2, fontSize, lineHeight);
        } else {
            context.fillText("amongst billions and trillions of stars, over the span of billions of years", canvas.width/2, canvas.height/2);
        }

        opacity = opacity + 0.01;
    }
    if(frameNumber >= 750 && frameNumber < 1000){
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;
        
        if (window.innerWidth < 600) {
            drawTextWithLineBreaks(["amongst billions and trillions of stars,", "over the span of billions of years"], canvas.width / 2, canvas.height / 2, fontSize, lineHeight);
        } else {
            context.fillText("amongst trillions and trillions of stars, over the span of billions of years", canvas.width/2, canvas.height/2);
        }

        opacity = opacity - 0.01;
    }

    if(frameNumber == 1000){
        opacity = 0;
    }
    if(frameNumber > 1000 && frameNumber < 1250){
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;
        context.fillText("somehow i got to meet you and got to spend a wonderful 2 years with you :(", canvas.width/2, canvas.height/2);
        opacity = opacity + 0.01;
    }
    if(frameNumber >= 1250 && frameNumber < 1500){
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;
        context.fillText("somehow i got to meet you and got to spend a wonderful 2 years with you :(", canvas.width/2, canvas.height/2);
        opacity = opacity - 0.01;
    }

    if(frameNumber == 1500){
        opacity = 0;
    }
    if(frameNumber > 1500 && frameNumber < 1750){
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;
        context.fillText("im so incredibly, unfathomably lucky", canvas.width/2, canvas.height/2);
        opacity = opacity + 0.01;
    }
    if(frameNumber >= 1750 && frameNumber < 2000){
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;
        context.fillText("im so incredibly, unfathomably lucky", canvas.width/2, canvas.height/2);
        opacity = opacity - 0.01;
    }

    if(frameNumber == 2000){
        opacity = 0;
    }
    if(frameNumber > 2000 && frameNumber < 2250){
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;

        if (window.innerWidth < 600) {
            drawTextWithLineBreaks(["Thank you for being", "with me my baby"], canvas.width / 2, canvas.height / 2, fontSize, lineHeight);
        } else {
            context.fillText("Thank you for being with me my baby", canvas.width/2, canvas.height/2);
        }

        opacity = opacity + 0.01;
    }
    if(frameNumber >= 2250 && frameNumber < 2500){
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;

        if (window.innerWidth < 600) {
            drawTextWithLineBreaks(["Thank you for being", "with me my baby"], canvas.width / 2, canvas.height / 2, fontSize, lineHeight);
        } else {
            context.fillText("Thank you for being with me my baby", canvas.width/2, canvas.height/2);
        }
        
        opacity = opacity - 0.01;
    }

    if(frameNumber == 2500){
        opacity = 0;
    }
    if(frameNumber > 2500 && frameNumber < 99999){
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;

        if (window.innerWidth < 600) {
            drawTextWithLineBreaks(["I love you so much Anis Nabilah, more than", "anything else in this vast universe"], canvas.width / 2, canvas.height / 2, fontSize, lineHeight);
        } else {
            context.fillText("I love you so much Anis Nabilah, more than, anything else in this vast universe", canvas.width/2, canvas.height/2);
        }

        opacity = opacity + 0.01;
    }
    
    if(frameNumber >= 2750 && frameNumber < 99999){
        context.fillStyle = `rgba(45, 45, 255, ${secondOpacity})`;


        if (window.innerWidth < 600) {
            drawTextWithLineBreaks(["and I can't wait to spend all my time ", "with you when you come back!"], canvas.width / 2, (canvas.height/2 + 60), fontSize, lineHeight);
        } else {
            context.fillText("and I can't wait to spend all my time with you when you come back!", canvas.width/2, (canvas.height/2 + 50));
        }

        secondOpacity = secondOpacity + 0.01;
    }

    if(frameNumber >= 3000 && frameNumber < 99999){
        context.fillStyle = `rgba(45, 45, 255, ${thirdOpacity})`;
        context.fillText("Happy New Years <3", canvas.width/2, (canvas.height/2 + 120));
        thirdOpacity = thirdOpacity + 0.01;

        button.style.display = "block";
    }   

     // Reset the shadow effect after drawing the text
     context.shadowColor = "transparent";
     context.shadowBlur = 0;
     context.shadowOffsetX = 0;
     context.shadowOffsetY = 0;
}

function draw() {
    context.putImageData(baseFrame, 0, 0);

    drawStars();
    updateStars();
    drawText();

    if (frameNumber < 99999) {
        frameNumber++;
    }
    window.requestAnimationFrame(draw);
}

window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    baseFrame = context.getImageData(0, 0, window.innerWidth, window.innerHeight);
});

window.requestAnimationFrame(draw);
