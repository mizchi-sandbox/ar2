import Task = require('./task');
import Bullet = require('../entities/objects/bullets/bullet');
import Battler = require('../entities/battlers/battler')

export = CreateBullet;

class CreateBullet implements Task {
  constructor(
    public owner:Battler,
    public x: number, public y: number, public dir: number
  ){
  }

  exec(stage){
    var bullet = new Bullet(this.owner);
    bullet.setPosition(this.x, this.y)
    bullet.dir = this.dir;
    stage.addChild(bullet);

    var speed = 0.5;
    var rad = this.dir/180*3.14;
    var vx = Math.cos(rad) * speed;
    var vy = Math.sin(rad) * speed;
    bullet.setVelocity(vx, vy);
  }
}
