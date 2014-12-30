var uuid = require('node-uuid');
var _ = require('lodash');
global.EventEmitter = require('events').EventEmitter;
import Stage = require('../stages/stage');
import GroupId = require('../values/group-id');

import RemoveEntity = require('../tasks/remove-entity');
import Game = require('../core');
declare var game: Game;

export = Entity;
class Entity extends EventEmitter {
  public static type:string = 'entity';

  public id: string;
  public x: number;
  public y: number;
  public rad: number;
  public life: number;
  public groupId: GroupId;

  remove(): void{
    game.stage.addTask(new RemoveEntity(this.id));
  }

  constructor() {
    super();
    this.id = uuid();
    this.x = 0;
    this.y = 0;
    this.rad = 0;
    this.life = 1;
  }

  step(stage?: Stage): Promise<any> | any{
    // console.log 'update:', this.id
  }

  public isAlive(): boolean { return this.life > 0; }
  public isDead(): boolean { return !this.isAlive();}

  public dispose(){
  }

  public serialize(): {x: number; y:number; rad: number; id: string; type: string;} {
    return {
      id: this.id,
      x: this.x,
      y:this.y,
      rad: this.rad,
      type: (<any>this.constructor).type
    };
  }

  /*public isAttackable(): boolean {
    return this.attackableTypes && Boolean(this.attackableTypes.length);
  }

  canAttackTo(other: Entity) {
    return other !== this &&
      other['suffer'] &&  // TODO 攻撃対象となり得るのかを属性で定義する
      _.include(this.attackableTypes, (<any>other.constructor).type) &&
      other.isAlive() &&
      this.x - 15 <= other.x && other.x <= this.x + 15 &&
      this.y - 15 <= other.y && other.y <= this.y + 15
    ;
  }

  private computeAttackPower(){ return 1; }

  public attack(other: Entity) {
    // TODO 対象と自分のパラメータからダメージ量を算出
    var damage = this.computeAttackPower();
    other['suffer'](damage);
  }*/
}
