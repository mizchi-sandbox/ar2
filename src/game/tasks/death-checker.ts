import Task = require('./task');
/*import RemoveEntity = require('./remove-entity');*/
import Priority = require('../values/priority');
import GroupId = require('../values/group-id');
import Game = require('../core');
declare var game: Game;

// Sweep all dead entities
// Always active if it exists.
// TODO: Giving exp and gold is here.
export = DeathChecker;
class DeathChecker implements Task {
  public get priority(): Priority {return Priority.DEATH_CHECKER;}
  exec(stage){
    var point = stage.entities.filter(
      e => e.groupId === GroupId.ENEMY && e.isDead()
    ).length;
    game.addScore(point);

    stage.entities = stage.entities.filter(e => e.isAlive());
    /*stage.entities
      .filter(e => e.isDead())
      .forEach(e => {
        e.remove()
      });*/
    return true;
  }
}
