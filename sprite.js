function Sprite(pic, x, y) {
	this.pic = pic;
	this.x = x;
	this.y = y;
	
	this.name = function() {
		if(this.pic === link) {
			return "link";
		}
		if(this.pic === snake) {
			return "snake";
		}
	}
}
