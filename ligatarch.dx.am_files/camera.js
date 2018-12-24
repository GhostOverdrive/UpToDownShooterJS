class Camera{
	constructor(x_offset, y_offset, width, height){
		this.x_offset = x_offset
		this.y_offset = y_offset
		this.width = width
		this.height = height

	}

	/*change_offset(x_change, y_change){
		this.x_offset += x_change
		this.y_offset += y_change
	}*/

	center_at_point(x, y){
		this.x_offset = x - this.width/2
		this.y_offset = y - this.height/2
	}
}