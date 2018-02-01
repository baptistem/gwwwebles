function make_border(game,tile_name){
  border = game.add.group()
  for (i = 0 ; i < game.height ; i+=32){
    console.log(i)
    border.create(0,i,tile_name)
    border.create(game.width-32,i,tile_name)
  }
  for (i = 32 ; i < game.width-32 ; i+=32){
    border.create(i,0,tile_name)
    border.create(i,game.height-32,tile_name)
  }
  border.immovable = true
}

function fill(game,tile_name){
  wall = game.add.group()
  for (x = 32 ; x < game.width-32;x+=32){
    for (y = 32 ; y < game.height-32;y+=32){
      wall.create(x,y,tile_name)
    }
  }
}

function spirale(game){

}
