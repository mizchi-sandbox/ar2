var Bullet = require('../objects/bullets/bullet');
import Battler = require('./battler');
declare var game: any;

export = Player;

class Player extends Battler {
  static type = 'player';

  constructor(public inputBuffer: any){
    super();
  }

  step(){
    var speed = 4;

    var nx = this.x;
    var ny = this.y;

    // update pos
    if(this.inputBuffer.left) {
      nx -= speed;
    } else if(this.inputBuffer.right){
      nx += speed;
    }

    if(this.inputBuffer.up) {
      ny -= speed;
    } else if(this.inputBuffer.down) {
      ny += speed;
    }

    this.x = nx;
    this.y = ny;

    // update rad
    var mx = this.inputBuffer.focus.x;
    var my = this.inputBuffer.focus.y;
    this.rad = Math.atan2(my-ny, mx-nx); // + Math.PI/2

    if(this.inputBuffer.mouseLeft) {
      var bullet = new Bullet(this.x, this.y, this.rad);
      game.stage.entities.push(bullet);
    }

    if(this.inputBuffer.mouseRight) {
      var bullet = new Bullet(mx, my, this.rad);
      game.stage.entities.push(bullet);
    }
  }
}
