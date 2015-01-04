var uuid = require('node-uuid');
var _ = require('lodash');
var Physics = require('PhysicsJS');

global.EventEmitter = require('events').EventEmitter;
import Stage = require('../stages/stage');
import GroupId = require('../values/group-id');
import RemoveEntity = require('../tasks/remove-entity');

export = Entity;
class Entity extends EventEmitter {
  public static type:string = 'entity';

  public id: string;
  public rad: number;
  public life: number;
  public groupId: GroupId;
  public physicsBody: any;
  public stage: Stage; // attached by addChild
  public willRemove: boolean;

  // Alias to Physics world
  public get x(): number {return this.physicsBody.state.pos.x;}
  public set x(val) {throw 'Can\t set x'}
  public get y(): number {return this.physicsBody.state.pos.y;}
  public set y(val) {throw 'Can\t set y'}

  public setPosition(x: number, y: number) {
    this.physicsBody.state.pos.set(x, y);
  }

  public get vx(): number {return this.physicsBody.state.vel.vx;}
  public get vy(): number {return this.physicsBody.state.vel.vy;}
  public setVelocity(vx: number, vy: number) {
    this.physicsBody.state.vel.set(vx, vy);
  }

  constructor() {
    super();
    this.stage = null;
    this.physicsBody = this.createPhysicsShape();

    this.id = uuid();
    this.setPosition(0, 0);
    this.rad = 0;
    this.life = 1;
    this.willRemove = false;
  }

  public createPhysicsShape() {
    return this.physicsBody = Physics.body('circle', {
      radius: 10
    });
  }

  step(stage?: Stage): Promise<any> | any{}

  public isAlive(): boolean { return this.life > 0; }

  public isDead(): boolean { return !this.isAlive();}

  remove(): void {
    this.willRemove = true;
    this.stage.addTask(new RemoveEntity(this.id));
  }

  public dispose(){}

  public onHit(other: Entity){}

  public suffer(damage: number): void {
    if(this.isAlive())
      this.life -= damage;
  }
}
