var map;

var eventType = "none";

var target = {
	now: false,
	x: 0,
	y: 0,
	width: 0,
	height: 0
}

var mouse = {
	x: 0,
	y: 0
};

var scal = 5;

var keys = [];

var events = [];
var sprites = [];

var oldGuy;
var carrot;
var cat;
var turtleMan;

var spriteList = [];
var currentSprite = 0;

var trans;

function preload() {
	map = loadImage("ortni.png");
	
	oldGuy = loadImage("oldguy.png");
	carrot = loadImage("carrot.png");
	cat = loadImage("cat.png");
	turtleMan = loadImage("turtleman.png");
}

function setup() {
	createCanvas(400, 400);
	
	spriteList = [oldGuy, carrot, cat, turtleMan];
	
	trans = {
		x: -width/2,
		y: -height/2
	}
}

function draw() {
	mouse.x = floor(mouseX/scal) - trans.x - width/2-1;
	mouse.y = floor(mouseY/scal) - trans.y - height/2-1;
	background(0);
	push();
	scale(scal);
	translate(width/2, height/2);
	translate(trans.x, trans.y);
	for(var i = 0;i < width/map.width/scal;i ++) {
		for(var u = 0;u < height/map.height/scal;u ++) {
			image(map, u*map.width, i*map.height);
		}
	}
	for(var i = 0;i < sprites.length;i ++) {
		image(sprites[i].pic, sprites[i].x, sprites[i].y);
	}
	for(var i = 0;i < events.length;i ++) {
		events[i].draw();
	}
	if(target.now) {
		target.width = mouse.x - target.x;
		target.height = mouse.y - target.y;
		new Event(target.x, target.y, target.width+1, target.height+1).draw();
	}
	noStroke();
	fill(150, 150, 150, 200);
	rect(mouse.x, mouse.y, 1, 1);
	if(eventType === "sprite") {
		image(spriteList[currentSprite], mouse.x, mouse.y);
	}
	pop();
	
	if(keys[UP_ARROW]) {
		trans.y ++;
	}
	if(keys[DOWN_ARROW]) {
		trans.y --;
	}
	if(keys[LEFT_ARROW]) {
		trans.x ++;
	}
	if(keys[RIGHT_ARROW]) {
		trans.x --;
	}
	if(keys[8]) {
		target.now = false;
	}
	if(keys[87] && scal < 10) {
		scal += 0.1;
	}
	if(keys[83] && scal > 1) {
		scal -= 0.1;
	}
	if(keys[48]) {
		eventType = "none";
		target.now = false;
	}
	if(keys[49]) {
		eventType = "collision";
	}
	if(keys[50]) {
		eventType = "sprite";
		target.now = false;
	}
}

function mouseClicked() {
	if(eventType === "collision") {
		if(!target.now) {
			target.now = true;
			target.x = mouse.x;
			target.y = mouse.y;
		} else {
			if(target.width < 0) {
				target.x += target.width+1;
				target.width *= -1;
				target.width -= 2;
			}
			if(target.height < 0) {
				target.y += target.height+1;
				target.height *= -1;
				target.height -= 2;
			}
			events.push(new Event(target.x, target.y, target.width+1, target.height+1));
			target.now = false;
		}
	}
	if(eventType === "sprite") {
		sprites.push(new Sprite(spriteList[currentSprite], mouse.x, mouse.y));
	}
}

function keyPressed() {
	keys[keyCode] = true;
}

function keyReleased() {
	if(keys[80]) {
		document.writeln("Event constructors:");
		for(var i = 0;i < events.length;i ++) {
			var comma = ",";
			if(i === events.length-1) {
				comma = "";
			}
			var string = "new Event(";
			string += events[i].x + ", " + events[i].y + ", " + events[i].width + ", " + events[i].height + ", true, 0)" + comma;
			document.writeln(string);
		}
		document.writeln("Sprites:");
		for(var i = 0;i < sprites.length;i ++) {
			var string = sprites[i].name() + ".draw(";
			string += "g, " + sprites[i].x + ", " + sprites[i].y + ");";
			document.writeln(string);
		}
	}
	if(eventType === "sprite" && keys[68]) {
		currentSprite ++;
		if(currentSprite > spriteList.length-1) {
			currentSprite = 0;
		}
	}
	keys[keyCode] = false;
}
