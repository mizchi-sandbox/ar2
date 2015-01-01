import Battler = require('./battler');
import CreateBullet = require('../../tasks/create-bullet');
import CreateBulletTrap = require('../../tasks/create-bullet-trap');
import GroupId = require('../../values/group-id')

declare var game: any;

export = Player;

class Player extends Battler {
  static type = 'player';

  constructor(public inputBuffer: any){
    super();
    this.groupId = GroupId.ALLY;
    this.life = Infinity;
  }

  private updateVelocity(){
    var speed = 0.3;
    var nx = 0;
    var ny = 0;
    // update pos
    if(this.inputBuffer.left) {
      nx = -speed;
    } else if(this.inputBuffer.right){
      nx = +speed;
    }

    if(this.inputBuffer.up) {
      ny = -speed;
    } else if(this.inputBuffer.down) {
      ny = +speed;
    }

    this.physicsBody.state.vel.set(nx, ny);
  }

  private updateDirection(){
    var mx = this.inputBuffer.focus.x;
    var my = this.inputBuffer.focus.y;
    this.rad = Math.atan2(my-this.y, mx-this.y);
  }

  private execSkills(){
    var mx = this.inputBuffer.focus.x;
    var my = this.inputBuffer.focus.y;
    if(this.inputBuffer.mouseLeft) {
      this.stage.addTask(new CreateBullet(this, this.x, this.y, this.rad));
    }
    if(this.inputBuffer.mouseRight) {
      this.stage.addTask(new CreateBulletTrap(this, mx, my, this.rad));
    }
  }

  step(){
    this.physicsBody.sleep(false);
    this.updateVelocity();
    this.updateDirection();
    this.execSkills();
  }
}
