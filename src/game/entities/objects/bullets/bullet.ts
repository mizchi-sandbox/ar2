import Entity = require('../../entity');
import Battler = require('../../battlers/battler');
import GroupId = require('../../../values/group-id');
import Game = require('../../../core');
declare var Physics: any;

export = Bullet;
class Bullet extends Entity {
  static type = 'bullet';
  private cnt: number;
  constructor(public owner: Battler) {
    super();
    this.life = 1;
    this.cnt = 0;
    this.groupId = owner.groupId;
  }

  public createPhysicsShape() {
    // default shape
    return this.physicsBody = Physics.body('circle', {
      radius: 10,
      cof: 0,
    });
  }

  onHit(other: Battler) {
    if(this.groupId !== other.groupId){
      this.attack(other);
      this.remove();
    }
  }

  private computeAttackPower(){ return 1; }

  public attack(other: Battler) {
    // TODO 対象と自分のパラメータからダメージ量を算出
    var damage = this.computeAttackPower();
    other.suffer(damage);
  }

  public step(stage){
    this.cnt++
    if(this.cnt > 40)
      this.remove()
  }
}
