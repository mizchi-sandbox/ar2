import Task = require('./task');
import Priority = require('../values/priority');
import GroupId = require('../values/group-id');
import Enemy = require('../entities/battlers/enemies/enemy');
var _ = require('lodash');

// Sweep all dead entities
// Always active if it exists.
// TODO: Giving exp and gold is here.
export = SimpleSpawner;
class SimpleSpawner implements Task {
  public get priority(): Priority {return Priority.SPAWN;}
  exec(stage){
    var enemyCount = stage.entities.filter(e => e.groupId === GroupId.ENEMY).length;
    if(enemyCount < 4) {
      _.range(10).forEach(() => {
        var enemy = new Enemy();
        enemy.x = Math.random() * 640;
        enemy.y = Math.random() * 480;
        stage.addChild(enemy);
      });
    }
    return true;
  }
}
