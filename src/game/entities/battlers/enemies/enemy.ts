import Battler = require('../battler');
import GroupId = require('../../../values/group-id')
import CreateBullet = require('../../../tasks/create-bullet');

export = Enemy;
class Enemy extends Battler {
  static type = 'enemy';

  private cnt: number;
  constructor(){
    super();
    this.life = 1;
    this.groupId = GroupId.ENEMY;
    this.cnt = 0;
  }

  step(){
    this.cnt++;
    if(this.cnt % 12 === 0) {
      this.dir = 360*Math.random();
      this.stage.addTask(new CreateBullet(this, this.x, this.y, this.dir));
    }
  }
}
