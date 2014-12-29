import Entity = require('../../entity');

export = Bullet;
class Bullet extends Entity {
  static type = 'bullet';

  constructor(x: number, y: number, rad: number) {
    super();
    this.x = x;
    this.y = y;
    this.rad = rad;
    this.life = 40;
    this.attackableTypes = ['enemy'];
  }

  step(){
    var speed = 8;
    this.x += Math.cos(this.rad) * speed;
    this.y += Math.sin(this.rad) * speed;
    if(this.life > 0)
      this.life--;
  }
}
