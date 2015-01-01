import Task = require('./task');
import Priority = require('../values/priority');
export = RemoveEntity;
var _ = require('lodash');

class RemoveEntity implements Task {
  constructor(public entityId: string){}
  public get priority(): Priority {return Priority.REMOVE_ENTITIES;}
  exec(stage){
    var target = _.find(stage.entities, e => e.id === this.entityId);
    if(target) stage.physicsWorld.remove(target.physicsBody);
    stage.entities = stage.entities.filter(e => e.id !== this.entityId);
  }
}
