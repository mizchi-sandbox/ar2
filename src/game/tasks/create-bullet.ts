import Task = require('./task');
import Bullet = require('../entities/objects/bullets/bullet');
/*import Priority = require('./priority');*/

export = CreateBullet;

// Sweep all dead entities
// Always active if it exists.
// TODO: Giving exp and gold is here.
class CreateBullet implements Task {
  constructor(
    public x: number, public y: number, public rad: number
  ){}

  exec(stage){
    var bullet = new Bullet(this.x, this.y, this.rad);
    stage.entities.push(bullet);
  }
}
