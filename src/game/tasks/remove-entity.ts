import Task = require('./task');
export = RemoveEntity;
var _ = require('lodash');

class RemoveEntity implements Task {
  constructor(public entityId: string){}
  exec(stage){
    var target = _.find(stage.entities, e => e.id === this.entityId);
    stage.entities = stage.entities.filter(e => e.id !== this.entityId);
    stage.physicsWorld.remove(target.physicsBody);
  }
}
