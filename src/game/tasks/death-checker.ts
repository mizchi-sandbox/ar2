import Task = require('./task');
import RemoveEntity = require('./remove-entity');
import Priority = require('../values/priority');

// Sweep all dead entities
// Always active if it exists.
// TODO: Giving exp and gold is here.
export = DeathChecker;
class DeathChecker implements Task {
  public get priority(): Priority {return Priority.DEATH_CHECKER;}
  exec(stage){
    stage.entities
      .filter(e => e.isDead());
      .forEach(e => {
        stage.addTask(new RemoveEntity(e.id));
      });
    return true;
  }
}
