import Entity = require('../entity');
import GroupId = require('../../values/group-id');
var Physics = require('PhysicsJS');

export = Polygon;

class Polygon extends Entity {
  static type = 'polygon';
  constructor() {
    super();
    this.life = Infinity;
  }

  public createPhysicsShape() {
    return Physics.body('convex-polygon', {
      vertices: [
        { x: 0  , y: -30},
        { x: -29, y: -9 },
        { x: -18, y: 24 },
        { x: 18 , y: 24 },
        { x: 29 , y: -9 }
      ],
      treatment: 'static',
    });
  }
}
