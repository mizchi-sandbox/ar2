import Stage = require('./stage');
import DeathChecker = require('../tasks/death-checker');
import SimpleSpawner = require('../tasks/simple-spawner');
import Block = require('../entities/objects/block');

var _ = require('lodash');

export = BattleStage;

class BattleStage extends Stage {
  constructor(){
    super();
    this.addTask(new DeathChecker());
    /*this.addTask(new SimpleSpawner());*/

    _.range(10).forEach((i: number)=>{
      var block = new Block();
      block.setPosition(50*i, 40)
      this.addChild(block);
    });
  }
}
