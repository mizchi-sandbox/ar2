import Battler = require('../battler');
import GroupId = require('../../../values/group-id')
import CreateBullet = require('../../../tasks/create-bullet');

export = Enemy;
class Enemy extends Battler {
  static type = 'enemy';
  constructor(){
    super();
    this.life = 1;
    this.groupId = GroupId.ENEMY;
    this.cnt = 0;
  }

  step(){
    this.cnt++;
    if(this.cnt % 12 === 0) {
      this.rad = 2 * Math.random() * Math.PI;
      this.stage.addTask(new CreateBullet(this, this.x, this.y, this.rad));
    }
  }
}
