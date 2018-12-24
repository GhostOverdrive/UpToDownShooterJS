class GUI{
	constructor(x, y, width, height, ctx){
		this.x = x
		this.y = y
		this.width = width
		this.height = height

		this.ctx = ctx

		this.font = this.height/2.5 + "px Arcade"
		this.ctx.font= this.font
	}

	render(){
		this.ctx.fillStyle = 'black'
		this.ctx.fillRect(this.x, this.y, this.width, this.height)
		this.ctx.fillStyle = 'white'
		this.ctx.fillRect(this.x, this.y, this.width, this.height*0.1)

		this.draw_text("Health:  " + Math.max(game.player.entity.health, 0), this.width*0.01, this.height*0.4)
		this.draw_text("Weapon:  " + game.player.weapon.name, this.width*0.01, this.height*0.8)

		this.draw_text("Wave:  " + ((game.wave_number) - 1), this.width*0.4, this.height*0.4)
		this.draw_text("Ammo:  " + game.player.weapon.ammo, this.width*0.4, this.height*0.8)

		if(game.game_over)
			this.draw_text("GAME OVER  ", this.width*0.8, this.height*0.4)
		else
			if(game.is_paused)
				this.draw_text("Pause  ", this.width*0.8, this.height*0.4)

		if(game.time_until_next_wave != game.MAX_TIME_UNTIL_NEXT_WAVE)
			this.draw_text("Next  wave  in  " + Math.floor(((game.time_until_next_wave)/60)), this.width*0.8, this.height*0.8)
	}

	draw_text(text, x, y){
		ctx.fillText(text, this.x + x, this.y + y)
	}
}