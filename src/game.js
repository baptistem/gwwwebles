//import make_border from 'src/level.js'
let spaceKey;
function init(){
  console.log("init game in progress")
  const HEIGHT = 20
  const WIDTH = 25
  game = new Phaser.Game(32 * WIDTH,32 * HEIGHT,Phaser.AUTO, '',
  {
    preload : preload,
    create : create,
    update : update
  })
}

function preload(){
  game.load.image('tank','res/tiles/tank.png')
  game.load.image('fly','res/tiles/fly.png')
  game.load.image('sandblock','res/tiles/sandblock.png')
  cursors = game.input.keyboard.createCursorKeys()
  spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
}
function create(){
  borders = game.add.group()
  fill(game,'sandblock')
  moving_block = game.add.group()
  forced_entity = game.add.group()
  tank = game.add.sprite(50,50,'tank')
  tank.anchor.set(0)
  fly = game.add.sprite(320,320,'fly')
  game.physics.arcade.enable(tank)
  game.physics.arcade.enable(fly)
  game.physics.arcade.enable(rocks)
  game.physics.arcade.enable(borders)
  game.physics.arcade.gravity.y = 0;
  game.physics.arcade.gravity.x = 0;
  borders.forEach(function(border){
    border.body.immovable = true
  })
  rocks.forEach(function(rock){
      rock.body.collideWorldBounds = true
      rock.body.bounce.set(0.8)
      rock.body.immovable = true
  })

  tank.body.collideWorldBounds = true;
  fly.body.collideWorldBounds = true;
  tank.anchor.set(0.5)

}
function update(){
  game.physics.arcade.overlap(moving_block,[moving_block,borders,rocks,tank],null,stop_or_bounce)

  //prevent collide between tank and all rocks
  game.physics.arcade.collide(tank,[moving_block,rocks,borders])

  //handle collition between moving_block and entity


  tank.body.velocity.x = 0
  tank.body.velocity.y = 0
  //tank.scale.x = 1

      if(cursors.left.isDown)
      {
          //  Move to the left
          tank.angle = 270
          tank.body.velocity.x = -150;
          move = true

      }
      if (cursors.right.isDown)
      {
          //  Move to the right
          tank.angle = 90
          tank.body.velocity.x = 150;
          move = true
          //player.animations.play('right');
      }
      if (cursors.up.isDown){
        tank.angle = 0
        tank.body.velocity.y = -150
        move = true

      }
      if (cursors.down.isDown){
        tank.angle = 180
        tank.body.velocity.y =+150
        move = true
      }
      if (spaceKey.isDown){
          var xy=apply_direction(tank.angle,8)
          tank.body.x+=xy[0]
          tank.body.y+=xy[1]
          tank.collideSize=38
          tank.collideE=null
          game.physics.arcade.collide(tank, [moving_block,rocks], null, checkBiggerCollide, this);
          if(tank.collideE !== null){
            var wh = apply_direction(tank.angle,14)

            if (xy[1] == 0){
              tank.body.height-= Math.abs(wh[0])
              tank.body.x+=xy[0]*4
              tank.body.y+=tank.body.height/2

            }
            if (xy[0] == 0){
              tank.body.width -= Math.abs(wh[1])
              tank.body.y+=xy[1]*4
              tank.body.x+=tank.body.width/2
            }
            rocks.remove(tank.collideE)
            if(game.physics.arcade.overlap(tank,[rocks,borders],null,null)){
              tank.collideE.kill()
              //tank.collideE.destroy()
            }
            if (xy[1] == 0){
              tank.body.y-=tank.body.height/2
              tank.body.height+= Math.abs(wh[0])
              tank.body.x-=xy[0]*4
            }
            if (xy[0] == 0){
              tank.body.x-=tank.body.width/2
              tank.body.width += Math.abs(wh[1])
              tank.body.y-=xy[1]*4

            }

            tank.collideE.immovable=false
            var entity_xy = apply_direction(tank.angle,200)
            tank.collideE.body.velocity.x = entity_xy[0]
            tank.collideE.body.velocity.y = entity_xy[1]
            moving_block.add(tank.collideE)
          }
          tank.body.x-=xy[0]
          tank.body.y-=xy[1]
      }
}
function checkBiggerCollide(e,f){
  if (tank.angle == 0 || tank.angle == -180 ){
      var x = Math.max(
        Math.abs(f.body.x - e.body.x),
        Math.abs(f.body.x + f.body.width - e.body.x),
        Math.abs(f.body.x - e.body.x - e.body.width),
        Math.abs(f.body.x + f.body.width - e.body.x - e.body.width)
      )
      if(tank.collideSize>x){
        tank.collideSize=x
        tank.collideE=f
      }

  }
  if (tank.angle == 90 || tank.angle == -90 ){
    var y = Math.max(
      Math.abs(f.body.y - e.body.y),
      Math.abs(f.body.y + f.body.height - e.body.y),
      Math.abs(f.body.y - e.body.y - e.body.height),
      Math.abs(f.body.y + f.body.height - e.body.y - e.body.height)
    )
    if(tank.collideSize>y){
      tank.collideSize=y
      tank.collideE=f
    }

  }
  return false
}
