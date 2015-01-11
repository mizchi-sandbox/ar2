import Task = require('./task');
import Priority = require('../values/priority');
import GroupId = require('../values/group-id');
import Enemy = require('../entities/battlers/enemies/enemy');
var _ = require('lodash');

export = SimpleSpawner;
class SimpleSpawner implements Task {
  public get priority(): Priority {return Priority.SPAWN;}
  exec(stage){
    var enemyCount = stage.entities.filter(e => e.groupId === GroupId.ENEMY).length;
    if(enemyCount < 10) {
      _.range(40).forEach(() => {
        var enemy = new Enemy();
        enemy.setPosition(
          Math.random() * stage.width,
          Math.random() * stage.height
        );
        stage.addChild(enemy);
      });
    }
    return true;
  }
}
