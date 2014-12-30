import Battler = require('./battler');
import CreateBullet = require('../../tasks/create-bullet');

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
      game.stage.addTask(new CreateBullet(this, this.x, this.y, this.rad));
    }

    if(this.inputBuffer.mouseRight) {
      game.stage.addTask(new CreateBullet(this, mx, my, this.rad));
    }
  }
}
