import Task = require('./task');
import Priority = require('./priority');

export = DeathChecker;

// Sweep all dead entities
// Always active if it exists.
// TODO: Giving exp and gold is here.
class DeathChecker implements Task {
  public get priority(): Priority {return Priority.DEATH_CHECKER;}
  exec(stage){
    stage.entities = stage.entities.filter(e => e.isAlive());
    return true;
  }
}
