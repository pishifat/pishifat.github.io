/*
click+drag to pan
scroll or up/down to zoom
left/right to rotate
*/

// written by Ringating

var rotSpeed = 180; // degrees per sec
var scaSpeed = 2; // % (out of 1) per sec
var scaStep = 0.15; // % (out of 1) that it scales for each scroll delta (a delta of 3 per scroll tick is common)
var minVertPercScale = 0.33333333; // % (out of 1) that image height scale can be relative to window height
var borderLimit = 0.25; // border in % of the window height that the image must remain on the window, horizontally and vertically
var speed = 500; // px/sec that image will move using WASD or arrow keys
var jumpScale = 5;
var lerpAlpha = 0.075;
var lerpSDist = 50; // how close (in pixels) that the target pos must be before transitioning into lerping scale

var inkWidth = 32512; // necessary to convert coordinates correctly
var inkHeight = 1920;

var bl;

var frame1;
var frame2;
var frame3;
var frame4;
var multiWidth;
var multiHeight;

var fitScale;

var lerping = false;
var lerpX;
var lerpY;
//var lerpS;
//var lerpingS = false;
//var prevSca;

//var img;
var posX;
var posY;
var rot;
var sca;

var pressX;
var pressY;
var wasPressed;

var dt;
var pmillis;

var font = 'Consolas';

var bg;

function preload()
{
	//img = loadImage('processing/assets/bigboy2.png');	
	
	bg = loadImage('processing/assets/bg.png');
	
	frame1 = loadImage('processing/assets/frame1.png');
	frame2 = loadImage('processing/assets/frame2.png');
	frame3 = loadImage('processing/assets/frame3.png');
	frame4 = loadImage('processing/assets/frame4.png');
}

function setup() 
{	
	multiWidth = frame1.width + frame2.width + frame3.width + frame4.width;
	multiHeight = Math.max(frame1.height, frame2.height, frame3.height, frame4.height);
	
	bl = windowHeight * borderLimit;
	
	frameRate(999);
	angleMode(DEGREES);
	createCanvas(windowWidth, windowHeight);
	//sca = windowHeight/img.height;
	fitScale = windowHeight / multiHeight;
	sca = fitScale;
	//posX = windowWidth/2;
	//posX = sca*(img.width/2);
	posX = sca*(multiWidth/2);
	posY = windowHeight/2;
	rot = 0;
	wasPressed = mouseIsPressed;
	pmillis = millis();
	
	//lerpS = fitScale * jumpScale;
}

function draw() 
{
	background(255);
	
	dtSet();
	
	imageMode(CORNER);
	if(bg.width/bg.height > windowWidth/windowHeight)
	{
		// bg's aspect ratio is wider than window's
		// so scale bg by height
		push();
		scale(windowHeight/bg.height);
		image(bg,0,0);
		pop();
	}
	else
	{
		// bg's aspect ratio is thinner than window's
		// so scale bg by width
		push();
		scale(windowWidth/bg.width);
		image(bg,0,0);
		pop();
	}
	
	textAlign(LEFT,BOTTOM);
	textSize(16)
	textFont(font);
	fill(255);
	text("click+drag to pan",4,16);
	text("left/right to rotate",4,36);
	text("up/down to zoom",4,56);
	//textAlign(RIGHT,TOP);
	//text((1/dt).toFixed(0) + " fps",windowWidth-4,4);
	
	//console.log("sca: " + sca);
	
	push();
		
		if(lerping)
		{
			posX = lerp(posX, lerpX, lerpAlpha);
			posY = lerp(posY, lerpY, lerpAlpha);
		}
		
		/*
		if(lerping && dist(posX,posY,lerpX,lerpY)/sca < lerpSDist)
		{
			lerping =  false;
			lerpingS = true;
			
			console.log(dist(posX,posY,lerpX,lerpY));
		}
		
		if(lerpingS)
		{
			prevSca = sca;
			sca = lerp(sca, lerpS, lerpAlpha);
			posX += (1-(sca-prevSca))*(posX);
			posY += (1-(sca-prevSca))*(posY);
		}
		*/
		
		move();
		//spin();
		zoom();
		
		imageMode(CENTER);
		//image(img,0,0);
		image(frame1, (0-(frame1.width/2))-frame2.width, 0);
		image(frame2, 0-(frame2.width/2), 0);
		image(frame3, frame3.width/2, 0);
		image(frame4, frame4.width/2+frame3.width, 0)
		
	pop();
	
	fill(10);
	textAlign(RIGHT,TOP);
	text((1/dt).toFixed(0) + " fps",windowWidth-4,4);
}

function jumpTo(x,y)
{
	// sets lerpX and lerpY to a pixel coordinate on the image (ignoring zoom scale) (origin top left)
	
	//sca = fitScale * jumpScale;
	
	lerpX = sca * ((-x) + multiWidth/2) + (windowWidth/2);
	lerpY = sca * ((-y) + multiHeight/2) + (windowHeight/2);
	
	lerping = true;
}

function convertInkCoordX(x)
{
	x = map(x, 0, inkWidth, 0, multiWidth);
	return x;
}

function convertInkCoordY(y)
{
	y = map(inkHeight - y, 0, inkHeight, 0, multiHeight);
	return y;
}

function move()
{
	if(mouseIsPressed)
	{
		posX += mouseX - pmouseX;
		posY += mouseY - pmouseY;
		lerping = false;
		//lerpingS = false;
	}
	
	if(keyIsDown(RIGHT_ARROW))
	{
		posX -= speed * dt;
		lerping = false;
		//lerpingS = false;
	}
	
	if(keyIsDown(LEFT_ARROW))
	{
		posX += speed * dt;
		lerping = false;
		//lerpingS = false;
	}
	
	if(keyIsDown(DOWN_ARROW))
	{
		posY -= speed * dt;
		lerping = false;
		//lerpingS = false;
	}
	
	if(keyIsDown(UP_ARROW))
	{
		posY += speed * dt;
		lerping = false;
		//lerpingS = false;
	}
	
	if(posX > windowWidth - bl + sca * (multiWidth/2))
	{
		posX = windowWidth - bl + sca * (multiWidth/2);
	}
	
	if(posX < bl - sca * (multiWidth/2))
	{
		posX = bl - sca * (multiWidth/2);
	}
	
	if(posY > windowHeight - bl + sca * (multiHeight/2))
	{
		posY = windowHeight - bl + sca * (multiHeight/2);
	}
	
	if(posY < bl - sca * (multiHeight/2))
	{
		posY = bl - sca * (multiHeight/2);
	}
	
	translate(posX,posY);
}

function spin()
{
	
	if(keyIsDown(RIGHT_ARROW))
	{
		rot += rotSpeed * dt;
	}
	
	if(keyIsDown(LEFT_ARROW))
	{
		rot -= rotSpeed * dt;
	}
	
	rotate(rot);
}

function zoom()
{
	
	/*
	if(keyIsDown(UP_ARROW))
	{
		sca *= 1+(scaSpeed*dt);
	}
	
	if(keyIsDown(DOWN_ARROW))
	{
		sca *= 1-(scaSpeed*dt);
	}
	*/
	
	scale(sca);
}

function dtSet()
{
	dt = (millis() - pmillis)/1000; // set delta time, in seconds
	pmillis = millis();
}

function mouseWheel(event)
{
	if (sca < minVertPercScale * windowHeight / multiHeight)
	{
		sca = minVertPercScale * windowHeight / multiHeight;
	}
	
	if(!(sca * (1 - (event.delta/Math.abs(event.delta) * scaStep)) < minVertPercScale * windowHeight / multiHeight))
	{
		sca *= 1 - (event.delta/Math.abs(event.delta) * scaStep);
		posX += (event.delta/Math.abs(event.delta) * scaStep)*(mouseX - posX);
		posY += (event.delta/Math.abs(event.delta) * scaStep)*(mouseY - posY);
	}
	
	//print(event.delta);
	lerping = false;
	//lerpingS = false;
	
	return false;
}





$(document).ready(function ()
{
	$("#submitBigBoy").submit(function(e)
	{
		e.preventDefault();
		var input = $("#user").val();
		
		$.each(db, function(i, val)
		{
			if (val[0].username.toLowerCase() === input.toLowerCase())
			{
				input = val[0].username;
				return false;
			}else if (typeof val[0].alt !== "undefined")
			{
				if (val[0].alt.toLowerCase() === input.toLowerCase())
				{
					input = val[0].alt;
					return false;
				}
			}
		});
		var user = db[input];
		if (user != null)
		{
			// do the jump
			if(user[0].xcoord != null && user[0].ycoord != null)
			{
				jumpTo(convertInkCoordX(parseInt(user[0].xcoord, 10)), convertInkCoordY(parseInt(user[0].ycoord, 10)));
			}
		}
	});
});