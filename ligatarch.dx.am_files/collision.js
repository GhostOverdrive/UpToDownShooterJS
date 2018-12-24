class CollisionManager{
	static check_collision(a, b){
		if((a.x - a.w/2 < b.x + b.w/2) && (a.x + a.w/2 > b.x - b.w/2) 
			&& (a.y - a.h/2 < b.y + b.h/2) && (a.y + a.h/2 > b.y - b.h/2)){
			return true
		}
		return false
	}
}