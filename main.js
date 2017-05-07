var game= new Phaser.Game(1320,600,Phaser.AUTO,'gamediv');

var asgard;
var thor;
var loki;
var thunder;
var movement;

var thunder;

var thunderdelay=0;
var attack;

var score= 0;
var scoretext;

var win;



var mainstate = {

  preload: function(){

      game.load.image('background',"assets/background.png");
      game.load.image('thor',"assets/thor1.png");
      game.load.image('loki',"assets/lok2.png");
      game.load.image('thunder',"assets/lightning1.png");


  },
  create: function(){

      asgard = game.add.tileSprite(0,0,1320,600,'background');

      thor = game.add.sprite(game.world.centerX -500, game.world.centerY, 'thor');
      game.physics.enable(thor,Phaser.Physics.ARCADE);


      movement= game.input.keyboard.createCursorKeys();

      thunder = game.add.physicsGroup();

    //  game.physics.enable([thunder],Phaser.Physics.ARCADE);

      game.physics.arcade.enable([thunder])

      thunder.createMultiple(400,'thunder');

      thunder.setAll('anchor.x',0.5);
      thunder.setAll('anchor.y',1);
      thunder.setAll('outofBoundsKill', true);
      thunder.setAll('checkWorldBounds',true);

      attack = game.input.keyboard.createCursorKeys();



      loki = game.add.physicsGroup();

      game.physics.arcade.enable([loki]);

      createEnemies();


      scoretext = game.add.text(0,550,'Score:',{font: '32px Arial',fill : '#fff'});
      win = game.add.text(game.world.centerX,game.world.centerY,'You Win!',{font: '32px Arial', fill: '#fff'})
      win.visible= false;








  },
  update: function(){

      game.physics.arcade.overlap(thunder,loki,collision,null,this);

      thor.body.velocity.y = 0;
      asgard.tilePosition.x -= 2;

      if(movement.up.isDown)
      {
        thor.body.velocity.y = - 200;
      }

      if(movement.down.isDown)
      {
        thor.body.velocity.y= 200;
      }

      if(attack.right.isDown){

        fire();


      }

      scoretext.text = 'Score:' + score;

      if(score==a*b*50){

        win.visible=true;
      }




  }

}


function fire(){
  if(game.time.now > thunderdelay){
    bullet = thunder.getFirstExists(false);

    if(bullet)
    {

      bullet.reset(thor.x+ 150,thor.y + 45);
      bullet.body.velocity.x = 400;
      thunderdelay = game.time.now + 200;
    }
  }
}

function createEnemies(){
    a= Math.floor((Math.random() * 10) + 1);
    b = Math.floor((Math.random() * 10) + 1);
    for(var x = 0; x <= a; x++){
      for(var y = 0; y<= b; y ++){
          var enemy = loki.create(x*60,y*60,'loki');
        //  enemy.anchor.setTo(1);

      }
    }

    loki.x= 700;
    loki.y=0;

    var tween= game.add.tween(loki).to({y:200},2000,Phaser.Easing.Linear.None,true,0,1000,true);
    tween.onRepeat.add(descend,this);

    tween.onLoop.add(descend,this);

}

function descend()
{

    loki.x -= 20;
}

function collision(bullet,enemy){
  bullet.kill();
  enemy.kill();

  score += 50;
}




game.state.add('mainstate',mainstate);
game.state.start('mainstate');
