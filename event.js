function Event(x, y, width, height) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	
	this.draw = function() {
		noStroke();
		fill(255, 0, 0, 150);
		rect(this.x, this.y, this.width, this.height);
	}
}
