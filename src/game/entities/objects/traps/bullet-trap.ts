import Entity = require('../../entity');
import Battler = require('../../battlers/battler');
import GroupId = require('../../../values/group-id');
import RemoveEntity = require('../../../tasks/remove-entity');

import Game = require('../../../core');

declare var game: Game;

export = BulletTrap;
class BulletTrap extends Entity {
  static type = 'bullet';
  private cnt: number;
  constructor(public owner: Battler, x: number, y: number, rad: number) {
    super();
    this.x = x;
    this.y = y;
    this.rad = rad;
    this.life = 1;
    this.cnt = 0;
  }

  public attack(other: Battler) {
    // TODO 対象と自分のパラメータからダメージ量を算出
    var damage = this.computeAttackPower();
    other.suffer(damage);
  }

  public step(stage){
    this.cnt++
    var speed = 8;
    this.x += Math.cos(this.rad) * speed;
    this.y += Math.sin(this.rad) * speed;

    if(this.cnt > 40)
    game.stage.addTask(new RemoveEntity(this.id));

    // TODO: 物理エンジンいれる
    stage.entities
    .filter(e => e.groupId !== this.owner.groupId && e.groupId != null)
    .filter(e => this.canAttackTo(e))
    .forEach(target => {
      // 同時ヒットを許している
      this.attack(target);
      this.life = 0;
      game.stage.addTask(new RemoveEntity(this.id));
      });
    }
  }
