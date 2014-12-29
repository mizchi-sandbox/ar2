global.EventEmitter = require('events').EventEmitter;

import Player = require('../entities/battlers/player');
import Entity = require('../entities/entity');

export = Stage;
class Stage extends EventEmitter {
  cnt: number;
  entities: Entity[]
  constructor(public player: Player){
    super();
    this.cnt = 0;
    this.entities = [];
  }

  public update(){
    return new Promise(done => {
      this.cnt++;
      // TODO 計算量の圧縮と衝突判定すり抜け対策
      this.entities
        .filter(e => e.isAttackable() && e.isAlive())
        .forEach(attacker => {
          this.entities
            .filter(e => attacker.canAttackTo(e))
            .forEach(target => {
              attacker.attack(target);
              if(attacker.isDead()) return;
            });
          });
      Promise.all(this.entities.map(e => e.step())).then(() => {
        this.entities = this.entities.filter(e => e.isAlive());
        done();
      });
    });
  }
}
