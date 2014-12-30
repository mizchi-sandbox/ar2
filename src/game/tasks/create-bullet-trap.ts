import Task = require('./task');
import BulletTrap = require('../entities/objects/traps/bullet-trap');
import Battler = require('../entities/battlers/battler')

export = CreateBulletTrap;

class CreateBulletTrap implements Task {
  constructor(
    public owner:Battler,
    public x: number, public y: number, public rad: number
  ){}

  exec(stage){
    var bulletTrap = new BulletTrap(this.owner);
    bulletTrap.x = this.x;
    bulletTrap.y = this.y;
    bulletTrap.rad = this.rad;

    stage.entities.push(bulletTrap);
  }
}
