//import make_border from 'src/level.js'

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
  Phaser.Loader.crossOrigin="anonymous"
  game.load.image('tank','res/tiles/tank.png')
  game.load.image('fly','res/tiles/fly.png')
  game.load.image('sandblock','res/tiles/sandblock.png')
  cursors = game.input.keyboard.createCursorKeys()
}
function create(){
  make_border(game,'sandblock')
  fill(game,'sandblock')
  tank = game.add.sprite(50,50,'tank')
  tank.anchor.set(0)
  fly = game.add.sprite(320,320,'fly')
  game.physics.arcade.enable(tank)
  game.physics.arcade.enable(fly)
  game.physics.arcade.enable(rocks)
  rocks.

  tank.body.collideWorldBounds = true;
  fly.body.collideWorldBounds = true;
  tank.anchor.set(0.5)



}
function update(){
  game.physics.arcade.collide(tank,rocks)
  tank.body.velocity.x = 0
  tank.body.velocity.y =0
  //tank.scale.x = 1

  if (cursors.left.isDown)
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
}
