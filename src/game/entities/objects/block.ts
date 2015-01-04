import Entity = require('../entity');
import Battler = require('../battlers/battler');
import GroupId = require('../../values/group-id');
var Physics = require('PhysicsJS');

export = Block;

class Block extends Entity {
  static type = 'wall';
  constructor() {
    super();
    this.life = Infinity;
  }

  isAlive() {return true;}

  createPhysicsShape() {
    return Physics.body('rect', {
      width: 100,
      height: 100,
      treatment: 'static'
    });
  }

  public step(stage){
  }
}
