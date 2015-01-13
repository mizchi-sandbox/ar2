import Entity = require('../entity');
import Battler = require('../battlers/battler');
import GroupId = require('../../values/group-id');
var Physics = require('PhysicsJS');

export = Block;

class Block extends Entity {
  static type = 'wall';
  public size: number;
  constructor(size: number) {
    this.size = size;
    super();
    this.life = Infinity;
  }

  isAlive() {return true;}

  public createPhysicsShape() {
    return Physics.body('rectangle', {
      width: this.size,
      height: this.size,
      treatment: 'static'
    });
  }

  public step(stage){
  }
}
