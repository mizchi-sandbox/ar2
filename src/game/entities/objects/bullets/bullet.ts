import Entity = require('../../entity');
import GroupId = require('../../../values/group-id');

export = Bullet;
class Bullet extends Entity {
  static type = 'bullet';
  constructor(x: number, y: number, rad: number) {
    super();
    this.x = x;
    this.y = y;
    this.rad = rad;
    this.life = 40;
    this.groupId = GroupId.ALLY;
  }

  private canAttackTo(other: Entity) {
    return other.isAlive() &&
      this.x - 15 <= other.x && other.x <= this.x + 15 &&
      this.y - 15 <= other.y && other.y <= this.y + 15
    ;
  }

  private computeAttackPower(){ return 1; }

  public attack(other: Entity) {
    // TODO 対象と自分のパラメータからダメージ量を算出
    var damage = this.computeAttackPower();
    other['suffer'](damage);
  }

  public step(stage){
    var speed = 8;
    this.x += Math.cos(this.rad) * speed;
    this.y += Math.sin(this.rad) * speed;
    if(this.life > 0)
      this.life--;

    stage.entities
      .filter(e => e.groupId !== this.groupId && e.groupId != null)
      .filter(e => this.canAttackTo(e))
      .forEach(target => {
        this.attack(target);
      });
  }
}
