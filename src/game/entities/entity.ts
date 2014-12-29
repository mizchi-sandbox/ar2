var uuid = require('node-uuid');
var _ = require('lodash');
global.EventEmitter = require('events').EventEmitter;

export = Entity;
class Entity extends EventEmitter {
  static type:string = 'entity';
  id: string;
  x: number;
  y: number;
  rad: number;
  life: number;
  attackableTypes: any[];

  constructor() {
    super();
    this.id = uuid();
    this.x = 0;
    this.y = 0;
    this.rad = 0;
    this.life = 1;
    /*this.attackableTypes = null;*/
    this.attackableTypes = [];
  }

  step(){
    // console.log 'update:', this.id
  }

  isAlive(){ return this.life > 0; }
  isDead(){ return !this.isAlive();}

  dispose(){
  }

  serialize(){
    var cons: any = this.constructor;
    return {
      x: this.x,
      y:this.y,
      rad: this.rad,
      type: cons.type
    }
  }

  isAttackable(){
    return this.attackableTypes && Boolean(this.attackableTypes.length);
  }

  canAttackTo(entity) {
    return entity !== this &&
      entity.suffer &&  // TODO 攻撃対象となり得るのかを属性で定義する
      _.include(this.attackableTypes, entity.constructor.type) &&
      entity.isAlive() &&
      this.x - 15 <= entity.x && entity.x <= this.x + 15 &&
      this.y - 15 <= entity.y && entity.y <= this.y + 15
    ;
  }

  computeAttackPower(){ return 1; }

  attack(entity) {
    // TODO 対象と自分のパラメータからダメージ量を算出
    var damage = this.computeAttackPower();
    entity.suffer(damage);
  }
}
