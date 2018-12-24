class Field{
	constructor(width, height){
		this.width = width
		this.height = height
		this.entities = []
	}

	add_entity(entity){
		this.entities.push(entity)
	}
}