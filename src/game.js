function init(){
  console.log("game init called")
  stage = new PIXI.Container();
  renderer = PIXI.autoDetectRenderer(
    800,
    600,
    {view:document.getElementById("canvas")}
  );
  var farTexture = PIXI.Texture.fromImage("res/tiles/fly.png");
  far = new PIXI.Sprite(farTexture);
  far.position.x = 12;
  far.position.y = 12;
  stage.addChild(far)


  renderer.render(stage)

}
