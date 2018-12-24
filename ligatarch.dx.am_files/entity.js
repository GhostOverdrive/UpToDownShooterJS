class Entity{
	constructor(x ,y){
		this.group = 'neutral'

		this.x = x
		this.y = y

		this.w = 20
		this.h = 20
		
		this.color = 'white'

		this.is_killable = false
		this.is_dead = false
		this.is_affected_by_bullets = true
		this.has_collision = true
	}
	update(){
		return this.is_dead
	}
	resolve_collision(collision_entity){

	}
}

class CreatureEntity extends Entity{
	constructor(x, y){
		super(x, y)

		this.maxspeed = 10
		this.xvel = 0
		this.yvel = 0

		this.is_killable = true

		this.health = 255
	}
	move(xc, yc){
		this.x += this.xvel*xc
		this.y += this.yvel*yc
	}
	update(xc, yc){
		this.move(xc, yc)
		return this.is_dead
	}
	setdir(xc, yc){
		if(xc != 0)
			this.xvel = xc*this.maxspeed
		if(yc != 0)
			this.yvel = yc*this.maxspeed

		if(xc == 2)
			this.xvel = 0
		if(yc == 2)
			this.yvel = 0

		if(xc == -2)
			this.xvel *= -1
		if(yc == -2)
			this.yvel *= -1
	}
	resolve_collision(ce, xc, yc){
		if(ce.has_collision){
			var left = this.x - this.w/2, right = this.x + this.w/2
			var top = this.y - this.h/2, bottom = this.y + this.h/2

			var ce_left = ce.x - ce.w/2, ce_right = ce.x + ce.w/2
			var ce_top = ce.y - ce.h/2, ce_bottom = ce.y + ce.h/2
			if(xc == 1){
				if(right > ce_left && right < ce_right){
					this.x = ce_left - this.w/2
				}
				if(left < ce_right && left > ce_left){
					this.x = ce_right + this.w/2
				}
			}
			if(yc == 1){
				if(bottom > ce_top && bottom < ce_bottom){
					this.y = ce_top - this.h/2
				}
				if(top < ce_bottom && top > ce_top){
					this.y = ce_bottom + this.h/2
				}
			}
		}
	}
}

class WallEntity extends Entity{
	constructor(x, y, w, h){
		super(x, y)

		this.w = w
		this.h = h
	}
}

class PlayerEntity extends CreatureEntity{
	constructor(x, y){
		super(x, y)

		this.group = 'player'

		this.maxspeed = 4

		this.MAX_HEALTH = 255
		this.health = this.MAX_HEALTH

		this.color = 'rgb(0,' + this.health + ', 0)'
	}
	update(xc, yc){
		if(this.health < 0){
			this.is_dead = true
		}
		this.move(xc, yc)
		this.color = 'rgb(30,' + this.health + ', 30)'
		return this.is_dead
	}
	heal(amount_of_healing){
		this.health = Math.min(this.health+amount_of_healing, this.MAX_HEALTH)
	}
}

class EnemyEntity extends CreatureEntity{
	constructor(x, y, target, health, attack, maxspeed, w){
		super(x, y)

		this.group = 'enemy'

		this.target = target

		this.attack = attack

		this.maxspeed = maxspeed

		this.stun = 0

		this.health = health

		this.w = w
		this.h = this.w

		this.color = 'rgb(' + this.health + ', 30, 30)'
	}
	head_to_point(x, y){
		var xdiff = this.x - x
		var ydiff = this.y - y

		var dirx, diry

		if(xdiff == 0)
			dirx = 0
		if(xdiff > 0)
			dirx = -1
		if(xdiff < 0)
			dirx = 1

		if(ydiff == 0)
			diry = 0
		if(ydiff > 0)
			diry = -1
		if(ydiff < 0)
			diry = 1

		this.setdir(dirx, diry)

	}
	update(xc, yc){
		if(this.health < 0){
			this.is_dead = 1
		}
		this.color = 'rgb(' + this.health + ', 30, 30)'
		if(this.stun == 0){
			this.head_to_point(this.target.x, this.target.y)
		}else{
			this.stun--
		}
		this.move(xc, yc)

		if(this.is_dead){
			if(Math.floor(Math.random() * Math.floor(10)) == 0){
				game.field.add_entity(new WeaponBoxEntity(this.x, this.y))
			}else{
				if(Math.floor(Math.random() * Math.floor(10)) == 0){
					game.field.add_entity(new HealBoxEntity(this.x, this.y))
				}
			}
		}

		return this.is_dead
	}

	resolve_collision(ce, xc, yc){
		if(ce.has_collision){
			if(ce.group == 'player')
				ce.health -= this.attack

			var left = this.x - this.w/2, right = this.x + this.w/2
			var top = this.y - this.h/2, bottom = this.y + this.h/2

			var ce_left = ce.x - ce.w/2, ce_right = ce.x + ce.w/2
			var ce_top = ce.y - ce.h/2, ce_bottom = ce.y + ce.h/2
			if(xc == 1){
				if(right > ce_left && right < ce_right){
					this.x = ce_left - this.w/2
				}
				if(left < ce_right && left > ce_left){
					this.x = ce_right + this.w/2
				}
			}
			if(yc == 1){
				if(bottom > ce_top && bottom < ce_bottom){
					this.y = ce_top - this.h/2
				}
				if(top < ce_bottom && top > ce_top){
					this.y = ce_bottom + this.h/2
				}
			}
		if(Math.floor(Math.random()*2) != 0){
			this.setdir(2, 2)
		}else{
			this.setdir(-2, -2)
		}
		this.stun = 30
		}
	}
}

class ShootingEnemyEntity extends EnemyEntity{
	constructor(x, y, target, health, attack, maxspeed, w, weapon){
		super(x, y, target, health, attack, maxspeed, w)

		this.weapon = weapon

		this.shooting_angle = 0
	}

	update(xc, yc){
		if(!this.is_dead && xc==1){
			this.shoot(game)
		}
		this.change_shooting_angle()

		if(this.health < 0){
			this.is_dead = 1
		}
		this.color = 'rgb(' + this.health + ', 30, 30)'
		if(this.stun == 0){
			this.head_to_point(this.target.x, this.target.y)
		}else{
			this.stun--
		}
		this.move(xc, yc)

		if(this.is_dead){
			if(Math.floor(Math.random() * Math.floor(10)) == 0){
				game.field.add_entity(new WeaponBoxEntity(this.x, this.y))
			}else{
				if(Math.floor(Math.random() * Math.floor(10)) == 0){
					game.field.add_entity(new HealBoxEntity(this.x, this.y))
				}
			}
		}

		return this.is_dead
	}

	change_shooting_angle(){
		this.shooting_angle = Math.atan2((this.target.y-this.y),(this.target.x-this.x))
	}

	shoot(game){
		var bullets = this.weapon.get_bullets(this, this.shooting_angle)
		if(bullets == true){
			//this.weapon = new Weapon(100, 'enemy')
			return
		}
		if(bullets != false){
			for(var i = 0; i < bullets.length; i++)
				game.field.add_entity(bullets[i])
		}
	}
}

class BulletEntity extends CreatureEntity{
	constructor(x, y, angle, maxspeed, w, h, damage, is_peircing, group){
		super(x,y)

		this.maxspeed = maxspeed
		this.w = w
		this.h = h
		this.is_peircing = is_peircing

		this.group = group

		if(this.group == 'player'){
			this.color = 'yellow'
		}

		this.damage = damage

		this.xvel = Math.cos(angle)*this.maxspeed
		this.yvel = Math.sin(angle)*this.maxspeed

		this.has_collision = false
		this.is_affected_by_bullets = false
		this.killable = false

	}

	resolve_collision(ce, xc, yc){
		if(ce.is_affected_by_bullets && ce.group != this.group){
			if(ce.group == 'neutral' || !this.is_peircing){
				this.is_dead = true
			}
			ce.health -= this.damage
		}
	}
}

class WeaponBoxEntity extends CreatureEntity{
	constructor(x, y){
		super(x, y)

		this.color = 'orange'
		this.w = 10
		this.h = 10

		this.is_affected_by_bullets = 0
		this.is_killable = 0
		this.has_collision = 0
	}

	resolve_collision(ce, xc, yc){
		if(ce.group == 'player' && ce.has_collision){
			this.is_dead = true
			game.player.weapon = this.choose_random_weapon()
		}
	}

	choose_random_weapon(){
		var weaponlist = [
			new MachineGunWeapon(50, 'player'),
			new ShotgunWeapon(10, 'player'),
			new BFG9KWeapon(1, 'player'),
			new RoundKillWeapon(2, 'player')
		]

		return weaponlist[Math.floor(Math.random() * Math.floor(weaponlist.length))]
	}
}

class HealBoxEntity extends CreatureEntity{
	constructor(x, y){
		super(x, y)

		this.color = 'green'
		this.w = 10
		this.h = 10

		this.is_affected_by_bullets = 0
		this.is_killable = 0
		this.has_collision = 0
	}

	resolve_collision(ce, xc, yc){
		if(ce.group == 'player' && ce.has_collision){
			this.is_dead = true
			game.player.entity.heal(Math.floor(Math.random() * Math.floor(50))+25)
		}
	}

	choose_random_weapon(){
		var weaponlist = [
			new MachineGunWeapon(50),
			new ShotgunWeapon(10),
			new BFG9KWeapon(1),
		]

		return weaponlist[Math.floor(Math.random() * Math.floor(weaponlist.length))]
	}
}