import Entity = require('../../entity');
import Battler = require('../../battlers/battler');
import GroupId = require('../../../values/group-id');
import Game = require('../../../core');

declare var game: Game;

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

  private computeAttackPower(){ return 1; }

  onHit(other: Battler) {

    if(this.groupId !== other.groupId){
      this.attack(other);
      this.remove();
    }
  }

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
