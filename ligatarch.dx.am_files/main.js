var canvas = document.getElementById("canv")
var ctx = canvas.getContext("2d")

var render = new Render(ctx)
var game = new Game(1000, 1000, canvas.width, canvas.height*0.9)

var gui = new GUI(0, canvas.height*0.9, canvas.width, canvas.height*0.1, ctx)

var delta, accumulator = 0, frametime = 1/60;
var then = Date.now(), now

var isClicked = false

function timerEvent(){
	now = Date.now()
	delta = (now - then)/1000
	accumulator += delta
	then = now
	//console.log(delta)
	var flag = 0
	while(accumulator > frametime){
		//game.field.entities[0].x++
		accumulator -= frametime
		flag = 1
		game.update()
		game.player.update(game)
	}
	if(flag == 1){
		render.render(game.field, game.camera)
		gui.render()
	}
	window.requestAnimationFrame(timerEvent)
}

document.addEventListener('keydown', event =>{
	if(event.keyCode == 65){
		game.player.setdir(-1, 0)
	}
	if(event.keyCode == 68){
		game.player.setdir(1, 0)
	}
	if(event.keyCode == 87){
		game.player.setdir(0, -1)
	}
	if(event.keyCode == 83){
		game.player.setdir(0, 1)
	}
	if(event.keyCode == 32){
		game.is_paused = !game.is_paused
	}
});

document.addEventListener('keyup', event =>{
	if(event.keyCode == 65){
		game.player.setdir(2, 0)
	}
	if(event.keyCode == 68){
		game.player.setdir(2, 0)
	}
	if(event.keyCode == 87){
		game.player.setdir(0, 2)
	}
	if(event.keyCode == 83){
		game.player.setdir(0, 2)
	}
});

canvas.addEventListener('mousedown', e =>{
	isClicked = true
	game.player.change_shooting_angle(Math.atan2((e.clientY-game.camera.height/2),(e.clientX-game.camera.width/2)))
	game.player.change_shooting_state(isClicked)
}, false);

canvas.addEventListener('mouseup', e =>{
	isClicked = false
	game.player.change_shooting_angle(Math.atan2((e.clientY-game.camera.height/2),(e.clientX-game.camera.width/2)))
	game.player.change_shooting_state(isClicked)
}, false);

canvas.addEventListener('mousemove', e =>{
	game.player.change_shooting_angle(Math.atan2((e.clientY-game.camera.height/2),(e.clientX-game.camera.width/2)))
}, false);

timerEvent();

