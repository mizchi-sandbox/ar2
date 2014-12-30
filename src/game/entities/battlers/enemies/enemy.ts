import Battler = require('../battler');
import GroupId = require('../../../values/group-id')

export = Enemy;
class Enemy extends Battler {
  static type = 'enemy';
  constructor(){
    super();
    this.groupId = GroupId.ENEMY;
  }
}
