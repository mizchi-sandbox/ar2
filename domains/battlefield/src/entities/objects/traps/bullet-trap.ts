import Entity = require('../../entity');
import Battler = require('../../battlers/battler');
import GroupId = require('../../../values/group-id');
import RemoveEntity = require('../../../tasks/remove-entity');
import CreateBullet = require('../../../tasks/create-bullet');
import Game = require('../../../core');

declare var game: Game;

export = BulletTrap;
class BulletTrap extends Battler {
  static type = 'bullet';
  private cnt: number;
  constructor(public owner: Battler) {
    super();
    this.life = 1;
    this.cnt = 0;
    this.groupId = owner.groupId;
  }

  private fire(){
    game.stage.addTask(new CreateBullet(this, this.x, this.y, this.dir));
  }

  public step(stage){
    this.cnt++;
    this.dir += 10;
    if(this.cnt%21 === 0) this.fire();
    if(this.cnt > 120) this.remove()
  }
}
