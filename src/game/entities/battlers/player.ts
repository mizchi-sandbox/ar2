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

  public get rad(): number {
    var mx = this.inputBuffer.focus.x;
    var my = this.inputBuffer.focus.y;
    return ~~(Math.atan2(my-this.y, mx-this.x)*180/3.14);
  }
  public set rad(v) {}

  private updateDirection(){
    var mx = this.inputBuffer.focus.x;
    var my = this.inputBuffer.focus.y;
    this.focusRad = ~~(Math.atan2(my-this.y, mx-this.x)*180/3.14);
  }

  private leftCooldown = 0;
  private rightCooldown = 0;
  private execSkills(){
    var mx = this.inputBuffer.focus.x;
    var my = this.inputBuffer.focus.y;
    if(this.inputBuffer.mouseLeft && this.leftCooldown <= 0) {
      this.stage.addTask(new CreateBullet(this, this.x, this.y, this.focusRad));
      this.leftCooldown = 3;
    } else if(this.leftCooldown > 0) this.leftCooldown--;

    if(this.inputBuffer.mouseRight && this.rightCooldown <= 0) {
      this.stage.addTask(new CreateBulletTrap(this, mx, my, this.focusRad));
      this.rightCooldown = 60;
    } else if(this.rightCooldown > 0) this.rightCooldown--;
  }

  step(){
    this.physicsBody.sleep(false);
    this.updateDirection();
    this.updateVelocity();
    this.execSkills();
  }
}
