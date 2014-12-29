import Entity = require('../entity');

export = Battler;
class Battler extends Entity {
  static type = 'battler';

  public suffer(damage: number): void {
    if(this.isAlive())
      this.life -= damage;
  }
}
