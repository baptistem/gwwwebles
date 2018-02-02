function apply_direction(angle,value){
  var x=0;
  var y=0;
  if (angle == 0){
    y = -value
  }
  else if (angle == 90){
    x = value
  }
  else if (angle == -180){
    y = value
  }
  else if (angle == -90){
    x = -value
  }
  return [x,y]
}
function stop_or_bounce(e,f){
  e.body.x = Math.round(e.body.x/32)*32
  e.body.y = Math.round(e.body.y/32)*32
    if (Math.abs(e.body.velocity.x) < 51 && Math.abs(e.body.velocity.y) < 51){

      e.body.velocity.x=0
      e.body.velocity.y=0
      rocks.add(e)
    }
    else{
      e.body.velocity.x=-e.body.velocity.x/2
      e.body.velocity.y=-e.body.velocity.y/2
    }
    return false

}
