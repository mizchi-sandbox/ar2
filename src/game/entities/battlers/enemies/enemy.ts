import Battler = require('../battler');
import GroupId = require('../../../values/group-id')

export = Enemy;
class Enemy extends Battler {
  static type = 'enemy';
  constructor(){
    super();
    this.life = 1;
    this.groupId = GroupId.ENEMY;
  }
}
