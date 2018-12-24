class Game{
	constructor(width, height, gameareaw, gameareah){
		this.width = width
		this.height = height
		this.field = new Field(width, height)
		this.camera = new Camera(width/4, height/4, gameareaw, gameareah)

		this.field.add_entity(new WallEntity(width/2,0, width, 40))
		this.field.add_entity(new WallEntity(width/2,height, width, 40))
		this.field.add_entity(new WallEntity(0,height/2, 40, height))
		this.field.add_entity(new WallEntity(width,height/2, 40, height))

		//this.field.add_entity(new WallEntity(width/2,height/2, width/10, height/10))
		this.field.add_entity(new WallEntity(width*0.25,height/2, width/10, height/10))
		this.field.add_entity(new WallEntity(width*0.75,height/2, width/10, height/10))

		this.player = new Player(width/2, height/2, this)

		this.MAX_TIME_UNTIL_NEXT_WAVE = 300
		this.time_until_next_wave = this.MAX_TIME_UNTIL_NEXT_WAVE

		this.wave_number = 1

		this.is_paused = false

		this.game_over = false

		//this.field.add_entity(new Entity(500, 500))

		//this.camera.center_at_point(this.field.entities[0].x, this.field.entities[0].y)
	}

	start_wave(){
		if(this.wave_number == 5){
			this.field.add_entity(new ShootingEnemyEntity(Math.floor(Math.random() * Math.floor(this.width-200))+100, Math.floor(Math.random() * Math.floor(this.height-200))+100, this.player.entity,
			255, 50, 1, 40, new BFG9KWeapon(100, 'enemy')))
			this.wave_number++
			return
		}
		if(this.wave_number == 10){
			var e = new ShootingEnemyEntity(Math.floor(Math.random() * Math.floor(this.width-200))+100, Math.floor(Math.random() * Math.floor(this.height-200))+100, this.player.entity,
			255, 50, 1, 80, new RoundKillWeapon(100, 'enemy'))
			e.weapon.bullet_damage = 50
			e.weapon.MAX_SHOOTING_COOLDOWN= 30
			this.field.add_entity(e)
			//this.field.add_entity(new ShootingEnemyEntity(Math.floor(Math.random() * Math.floor(this.width-200))+100, Math.floor(Math.random() * Math.floor(this.height-200))+100, this.player.entity,
			//255, 50, 1, 40, new BFG9KWeapon(100, 'enemy')))
			//this.field.add_entity(new ShootingEnemyEntity(Math.floor(Math.random() * Math.floor(this.width-200))+100, Math.floor(Math.random() * Math.floor(this.height-200))+100, this.player.entity,
			//255, 50, 1, 40, new BFG9KWeapon(100, 'enemy')))
			this.wave_number++
			return
		}
		for(var i = 0; i < Math.floor(this.wave_number*2); i++){
			this.spawnEnemy(this.wave_number)
		}
		this.wave_number++
	}

	spawnEnemy(wave_number){
		var e =  new EnemyEntity(Math.floor(Math.random() * Math.floor(this.width-200))+100, Math.floor(Math.random() * Math.floor(this.height-200))+100, this.player.entity,
			Math.min(Math.floor(Math.random() * Math.floor(20*wave_number)), 255), 2*wave_number, Math.floor(wave_number*0.25 + 1), 20 + Math.floor(Math.random() * Math.floor(wave_number*2)) - wave_number)
		var r = Math.floor(Math.random() * 20)
		if(wave_number >= 3 && r == 0){
			e =  new ShootingEnemyEntity(Math.floor(Math.random() * Math.floor(this.width-200))+100, Math.floor(Math.random() * Math.floor(this.height-200))+100, this.player.entity,
			Math.min(Math.floor(Math.random() * Math.floor(20*wave_number)), 255), 2*wave_number, Math.floor(wave_number*0.25 + 1), 20 + Math.floor(Math.random() * Math.floor(wave_number*2)) - wave_number, new Weapon(1000, 'enemy'))
		}else if(wave_number >= 6 && r == 1){
			e =  new ShootingEnemyEntity(Math.floor(Math.random() * Math.floor(this.width-200))+100, Math.floor(Math.random() * Math.floor(this.height-200))+100, this.player.entity,
			Math.min(Math.floor(Math.random() * Math.floor(20*wave_number)), 255), 2*wave_number, Math.floor(wave_number*0.25 + 1), 20 + Math.floor(Math.random() * Math.floor(wave_number*2)) - wave_number, new MachineGunWeapon(1000, 'enemy'))
		}else if(wave_number >= 9 && r == 2){
			e =  new ShootingEnemyEntity(Math.floor(Math.random() * Math.floor(this.width-200))+100, Math.floor(Math.random() * Math.floor(this.height-200))+100, this.player.entity,
			Math.min(Math.floor(Math.random() * Math.floor(20*wave_number)), 255), 2*wave_number, Math.floor(wave_number*0.25 + 1), 20 + Math.floor(Math.random() * Math.floor(wave_number*2)) - wave_number, new ShotgunWeapon(1000, 'enemy'))
		}else if(wave_number >= 12 && r == 3){
			e =  new ShootingEnemyEntity(Math.floor(Math.random() * Math.floor(this.width-200))+100, Math.floor(Math.random() * Math.floor(this.height-200))+100, this.player.entity,
			Math.min(Math.floor(Math.random() * Math.floor(20*wave_number)), 255), 2*wave_number, Math.floor(wave_number*0.25 + 1), 20 + Math.floor(Math.random() * Math.floor(wave_number*2)) - wave_number, new BFG9KWeapon(1000, 'enemy'))
		}else if(wave_number >= 15 && r == 4){
			e =  new ShootingEnemyEntity(Math.floor(Math.random() * Math.floor(this.width-200))+100, Math.floor(Math.random() * Math.floor(this.height-200))+100, this.player.entity,
			Math.min(Math.floor(Math.random() * Math.floor(20*wave_number)), 255), 2*wave_number, Math.floor(wave_number*0.25 + 1), 20 + Math.floor(Math.random() * Math.floor(wave_number*2)) - wave_number, new RoundKillWeapon(1000, 'enemy'))
		}

		this.field.add_entity(e)
	}

	update(){
		if(this.player.entity.is_dead){
			this.game_over = true
		}
		if(this.is_paused == false && this.game_over == false){
			if(this.time_until_next_wave == 0){
				this.start_wave()
				this.time_until_next_wave = this.MAX_TIME_UNTIL_NEXT_WAVE
			}else{
				this.time_until_next_wave--
			}
			for(var i = 0; i < this.field.entities.length; i++){
				if(this.field.entities[i].group == 'enemy'){
					this.time_until_next_wave = this.MAX_TIME_UNTIL_NEXT_WAVE
				}
				this.field.entities[i].update(1, 0)
				for(var j = 0; j < this.field.entities.length; j++){
					if(j == i){
						continue
					}
					if(CollisionManager.check_collision(this.field.entities[i], this.field.entities[j])){
						this.field.entities[i].resolve_collision(this.field.entities[j], 1, 0)
					}
				}
			}
			for(var i = 0; i < this.field.entities.length; i++){
				var isdead = this.field.entities[i].update(0, 1)
				for(var j = 0; j < this.field.entities.length; j++){
					if(j == i){
						continue
					}
					if(CollisionManager.check_collision(this.field.entities[i], this.field.entities[j])){
						this.field.entities[i].resolve_collision(this.field.entities[j], 0, 1)
					}
				}
				if(isdead == true){
					this.field.entities.splice(i, 1)
				}
			}
			this.camera.center_at_point(this.player.entity.x, this.player.entity.y)
		}
	}
}