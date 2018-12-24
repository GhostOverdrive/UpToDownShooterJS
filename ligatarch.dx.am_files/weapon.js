class Weapon{
	constructor(ammo, group){
		this.group = group
		this.ammo = ammo
		this.bulletspeed = 10
		this.MAX_SHOOTING_COOLDOWN = 30
		this.shooting_cooldown = this.MAX_SHOOTING_COOLDOWN
		this.bulletw = 5
		this.bulleth = 5
		this.bullet_damage = 10
		this.amount_of_bullets = 1
		this.bullet_angle = 0.1
		this.piercing_bullets = 0
		this.accuracy = 0.1
		this.name = 'Pistol'
	}

	get_bullets(ent, angle){
		if(this.ammo == 0)
				return true
		if(this.shooting_cooldown == 0){
			this.shooting_cooldown = this.MAX_SHOOTING_COOLDOWN
			this.ammo--
			var bullets = []
			for(var i = (this.amount_of_bullets-1)/-2; i <= (this.amount_of_bullets-1)/2; i++)
				bullets.push(new BulletEntity(ent.x, ent.y, angle + Math.random()*this.accuracy*Math.floor(Math.random()*2-1) + this.bullet_angle*i, this.bulletspeed, this.bulletw, this.bulleth, this.bullet_damage, this.piercing_bullets, this.group))
			return bullets
		}else{
			this.shooting_cooldown--
			return false
		}
	}
}

class MachineGunWeapon extends Weapon{
	constructor(ammo, group){
		super(ammo, group)
		this.bulletspeed = 10
		this.MAX_SHOOTING_COOLDOWN = 5
		this.shooting_cooldown = this.MAX_SHOOTING_COOLDOWN
		this.bulletw = 5
		this.bulleth = 5
		this.bullet_damage = 10
		this.amount_of_bullets = 1
		this.bullet_angle = 0.1
		this.piercing_bullets = 0
		this.accuracy = 0.4
		this.name = 'SMG'
	}
}

class ShotgunWeapon extends Weapon{
	constructor(ammo, group){
		super(ammo, group)
		this.bulletspeed = 10
		this.MAX_SHOOTING_COOLDOWN = 30
		this.shooting_cooldown = this.MAX_SHOOTING_COOLDOWN
		this.bulletw = 5
		this.bulleth = 5
		this.bullet_damage = 10
		this.amount_of_bullets = 6
		this.bullet_angle = 0.1
		this.piercing_bullets = 0
		this.accuracy = 0
		this.name = 'Shotgun'
	}
}

class BFG9KWeapon extends Weapon{
	constructor(ammo, group){
		super(ammo, group)
		this.bulletspeed = 5
		this.MAX_SHOOTING_COOLDOWN = 100
		this.shooting_cooldown = this.MAX_SHOOTING_COOLDOWN
		this.bulletw = 100
		this.bulleth = 100
		this.bullet_damage = 1000
		this.amount_of_bullets = 1
		this.bullet_angle = 0.1
		this.piercing_bullets = 1
		this.accuracy = 0
		this.name = 'BFG9000'
	}
}

class RoundKillWeapon extends Weapon{
	constructor(ammo, group){
		super(ammo, group)
		this.bulletspeed = 20
		this.MAX_SHOOTING_COOLDOWN = 100
		this.shooting_cooldown = this.MAX_SHOOTING_COOLDOWN
		this.bulletw = 15
		this.bulleth = 15
		this.bullet_damage = 5
		this.amount_of_bullets = 30
		this.bullet_angle = 0.5
		this.piercing_bullets = 1
		this.accuracy = 0
		this.name = '...'
	}
}