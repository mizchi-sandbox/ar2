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

  public createPhysicsShape() {
    return Physics.body('rectangle', {
      width: 30,
      height: 30,
        /*treatment: 'static'*/
    });
  }

  public step(stage){
  }
}
