import Task = require('./task');
import BulletTrap = require('../entities/objects/traps/bullet-trap');
import Battler = require('../entities/battlers/battler')

export = CreateBulletTrap;

class CreateBulletTrap implements Task {
  constructor(
    public owner:Battler,
    public x: number, public y: number, public dir: number
  ){}

  exec(stage){
    var bulletTrap = new BulletTrap(this.owner);
    bulletTrap.setPosition(this.x, this.y);
    bulletTrap.dir = this.dir;

    stage.addChild(bulletTrap);
  }
}
