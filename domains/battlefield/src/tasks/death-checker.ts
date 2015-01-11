import Task = require('./task');
import RemoveEntity = require('./remove-entity');
import Priority = require('../values/priority');
import GroupId = require('../values/group-id');
import Game = require('../core');
declare var game: Game;
var _ = require('lodash');

// Sweep all dead entities
// Always active if it exists.
// TODO: Giving exp and gold is here.
export = DeathChecker;
class DeathChecker implements Task {
  public get priority(): Priority {return Priority.DEATH_CHECKER;}
  exec(stage){
    // calc point
    var deadEntities = stage.entities.filter(
      e => e.groupId === GroupId.ENEMY && e.isDead()
    );
    game.addScore(deadEntities.length);

    // TODO: work around for miss about death
    /*var deadPhysicsIds = deadEntities.map(e => e.physicsBody.uid);
    stage.physicsWorld.getBodies().forEach(body => {
      if(_.include(deadPhysicsIds, body.uid)){
        stage.physicsWorld.remove(body);
      }
    });
    stage.entities = stage.entities
      .filter(e => e.isAlive());*/

    stage.entities
      .filter(e => e.isDead())
      .forEach(e => e.remove());

    return true;
  }
}
