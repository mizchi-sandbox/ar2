import Task = require('./task');
export = RemoveEntity;

class RemoveEntity implements Task {
  constructor(public entityId: string){}
  exec(stage){
    stage.entities = stage.entities.filter(e => e.id !== this.entityId);
  }
}
