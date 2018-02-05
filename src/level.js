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
function randint(x){
  return Math.floor(Math.random()*x)
}
function dfs_init_tiles(w, h){

    let tile_data = [];
    let row = [];
    let vis = [];
    total = w * h
  	for( let y=0; y<h; y++) {
        let row = [];
        let rowv = []
      	for( let x=0; x<w; x++) {
            row.push(1);
            rowv.push(false);
      	}
        vis.push(rowv)
        tile_data.push( row);
     }
     console.log("buidling a maze of size : ",vis.length,vis[0].length)
     let cell = [Math.floor(Math.random()*h), Math.floor(Math.random()*w)];

     let visited = 1
     let old_candidate = Array()
     let failsafe = 0
     while (visited < total && failsafe < w*h){
       failsafe++ // this is only to prevent a browser crash
       var candidate = Array()
       // step 1 : build a list of visitable block
       // a block is valid if it is in the map's range
       // and if it has not been visited before
       if (is_valid(cell[0]-1,cell[1],vis)){
         visited++
         candidate.push([cell[0]-1,cell[1]])
       }
       if (is_valid(cell[0],cell[1]-1,vis)){
         visited++
         candidate.push([cell[0],cell[1]-1])
       }
       if (is_valid(cell[0]+1,cell[1],vis)){
         visited++
         candidate.push([cell[0]+1,cell[1]])
       }
       if (is_valid(cell[0],cell[1]+1,vis)){
          visited++
          candidate.push([cell[0],cell[1]+1])
       }
       //there is no valide candidate?
       //let's fallback to old_candidate
       //we will try to find if opening an old_candidate
       //can allow to reach unreached position
       if (candidate.length == 0){
          if(old_candidate.length == 0){
            console.log("couic") //stupid failsafe
            break
          }
          cell = old_candidate.pop()
        }
        else{
          //current cell is eligible as a path
          // we clear the path \o/
          vis[cell[0]][cell[1]] = true
          tile_data[cell[0]][cell[1]] = 0
          //now we randomly pick the next path
          cell = candidate[randint(candidate.length)]
          //because it is new, it is safe to clean it
          vis[cell[0]][cell[1]] = true
          tile_data[cell[0]][cell[1]] = 0
          var old_index = candidate.indexOf(cell)
          candidate.slice(0,old_index)
          candidate.forEach(function(c){
            vis[c[0]][c[1]] = true
          })
          //we add the current candidate to the old_candidate list
          old_candidate = old_candidate.concat(candidate)
        }

     }
     return tile_data
}
function is_valid(x,y,vis){
   //border check
   if (x < 0 || y < 0 || x >= vis.length ||  y>= vis[x].length)
    return false
   // is visited?
   if (vis[x][y] == true)
     return false
   return true
}

function make_border() {}

function makeRocks( tile_data) {
	rocks = game.add.group();

  for( let y=0; y<tile_data.length; y++)
    for( let x=0; x<tile_data[0].length; x++)
    {
    	if( tile_data[y][x] === 1) {
        /*if(y==0 || x==0 || y==(tile_data.length-1) || x==(tile_data[y].length-1)){
          console.log("no border!")
          //borders.create(x*32,y*32,'sandblock')
        }
      	else{*/
          rocks.create( x*32, y*32, 'sandblock');
        //}
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
  game.tile_data = dfs_init_tiles( game.width/32, game.height/32);
  //addBorder(game.tile_data);
  makeRocks(game.tile_data)
}
