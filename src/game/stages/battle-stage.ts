import Stage = require('./stage');
import DeathChecker = require('../tasks/death-checker');
import SimpleSpawner = require('../tasks/simple-spawner');

export = BattleStage;

class BattleStage extends Stage {
  constructor(){
    super();
    this.addTask(new DeathChecker);
    this.addTask(new SimpleSpawner);
  }
}
