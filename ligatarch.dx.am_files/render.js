class Render{
	constructor(ctx){
		this.ctx = ctx
		this.BACKGROUND_COLOR = 'black'
	}

	draw_entity(entity, camera) {
		this.ctx.fillStyle = entity.color
		this.ctx.fillRect(entity.x - entity.w/2 - camera.x_offset,
						   entity.y - entity.h/2 - camera.y_offset,
						    entity.w,
						     entity.h)
	}

	draw_background(camera){
		this.ctx.fillStyle = this.BACKGROUND_COLOR
		this.ctx.fillRect(0, 0, camera.width, camera.height)
	}

	render(field, camera){
		this.draw_background(camera)

		for(var i = 0; i < field.entities.length; i++){
			this.draw_entity(field.entities[i], camera)
		}
	}
}