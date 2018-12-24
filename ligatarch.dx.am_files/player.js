class Player{
	constructor(x, y, game){
		this.entity = new PlayerEntity(x, y)
		game.field.add_entity(this.entity)

		this.is_shooting = false
		this.shooting_angle = 0
		this.weapon = new Weapon(100, 'player')
	}

	setdir(xc, yc){
		this.entity.setdir(xc, yc)
	}

	change_shooting_state(state){
		this.is_shooting = state
	}

	change_shooting_angle(angle){
		this.shooting_angle = angle
	}

	update(game){
		if(!game.is_paused){
			if(this.is_shooting && !this.entity.is_dead){
					this.shoot(game)
				}else{
					if(this.weapon.shooting_cooldown != 0)
						this.weapon.shooting_cooldown--;
				}
			}
	}

	shoot(game){
		var bullets = this.weapon.get_bullets(this.entity, this.shooting_angle)
		if(bullets == true){
			this.weapon = new Weapon(100, 'player')
			return
		}
		if(bullets != false){
			for(var i = 0; i < bullets.length; i++)
				game.field.add_entity(bullets[i])
		}
	}
}