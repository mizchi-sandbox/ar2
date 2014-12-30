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
  }

  private canAttackTo(other: Entity) {
    return other.isAlive() &&
      this.x - 15 <= other.x && other.x <= this.x + 15 &&
      this.y - 15 <= other.y && other.y <= this.y + 15
    ;
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
