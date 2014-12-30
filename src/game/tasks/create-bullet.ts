import Task = require('./task');
import Bullet = require('../entities/objects/bullets/bullet');
import Battler = require('../entities/battlers/battler')

export = CreateBullet;

class CreateBullet implements Task {
  constructor(
    public owner:Battler,
    public x: number, public y: number, public rad: number
  ){}

  exec(stage){
    /*var bullet = new Bullet(this.owner, this.x, this.y, this.rad);*/
    var bullet = new Bullet(this.owner);
    bullet.x = this.x;
    bullet.y = this.y;
    bullet.rad = this.rad;
    stage.entities.push(bullet);
  }
}
