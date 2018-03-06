function Sprite(pic, x, y) {
	this.pic = pic;
	this.x = x;
	this.y = y;
	
	this.name = function() {
		if(this.pic === oldGuy) {
			return "oldGuy";
		}
		if(this.pic === carrot) {
			return "carrot";
		}
		if(this.pic === cat) {
			return "cat";
		}
		if(this.pic === turtleMan) {
			return "turtleMan";
		}
	}
}
