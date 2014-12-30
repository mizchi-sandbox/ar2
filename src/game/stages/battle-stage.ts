import Stage = require('./stage');
import DeathChecker = require('../tasks/death-checker');

export = BattleStage;

class BattleStage extends Stage {
  constructor(){
    super();
    this.addTask(new DeathChecker);
  }
}
