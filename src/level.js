var $ = (x) => document.querySelector(x);
let tiles = [];
let rocks;

function init_tiles( w, h) {

  let tile_data = [];
  let row = [];

	for( let y=0; y<h; y++) {
      let row = [];
    	for( let x=0; x<w; x++) {
          row.push( Math.round(Math.random()));
    	}

      tile_data.push( row);
   }

   return tile_data;
}

function make_border() {}

function makeRocks( tile_data) {
	rocks = game.add.group();

  for( let y=0; y<tile_data.length; y++)
    for( let x=0; x<tile_data[0].length; x++)
    {
    	if( tile_data[y][x] === 1) {
        if(y==0 || x==0 || y==(tile_data.length-1) || x==(tile_data[y].length-1)){
          borders.create(x*32,y*32,'sandblock')
        }
      	else{
          rocks.create( x*32, y*32, 'sandblock');
        }
      }
    }

}

function addBorder(tile_data){

  for( let y=0; y<tile_data.length; y++) {
  	tile_data[y][0] = 1;
    tile_data[y][tile_data[0].length-1]=1;
  }

  for( let x=0; x<tile_data[0].length; x++) {
    tile_data[0][x] = 1;
    tile_data[tile_data.length-1][x] = 1;
  }
}

function fill(game,tile_name){
  game.tile_data = init_tiles( game.width/32, game.height/32);
  addBorder(game.tile_data);
  makeRocks(game.tile_data)
}
