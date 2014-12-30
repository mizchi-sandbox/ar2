import Task = require('./task');
/*import RemoveEntity = require('./remove-entity');*/
import Priority = require('../values/priority');

// Sweep all dead entities
// Always active if it exists.
// TODO: Giving exp and gold is here.
export = DeathChecker;
class DeathChecker implements Task {
  public get priority(): Priority {return Priority.DEATH_CHECKER;}
  exec(stage){
    stage.entities = stage.entities.filter(e => e.isAlive());
    /*stage.entities
      .filter(e => e.isDead())
      .forEach(e => {
        e.remove()
      });*/
    return true;
  }
}
