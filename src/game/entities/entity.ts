var uuid = require('node-uuid');
var _ = require('lodash');
global.EventEmitter = require('events').EventEmitter;
import Stage = require('../stages/stage');
import GroupId = require('../values/group-id');

import RemoveEntity = require('../tasks/remove-entity');
import Game = require('../core');
declare var game: Game;
var Physics = require('PhysicsJS');

export = Entity;
class Entity extends EventEmitter {
  public static type:string = 'entity';

  public id: string;
  public rad: number;
  public life: number;
  public groupId: GroupId;
  public physicsBody: any;
  public stage: Stage; // attached by addChild

  public suffer(damage: number): void {
    if(this.isAlive())
      this.life -= damage;
  }

  // Alias to Physics world
  public get x(): number {return this.physicsBody.state.pos.x;}
  public set x(val) {this.physicsBody.state.pos.x = val;}
  public get y(): number {return this.physicsBody.state.pos.y;}
  public set y(val) {this.physicsBody.state.pos.y = val;}

  public get vx(): number {return this.physicsBody.state.vel.vx;}
  public get vy(): number {return this.physicsBody.state.vel.vy;}

  remove(): void {
    game.stage.addTask(new RemoveEntity(this.id));
  }

  constructor() {
    super();
    this.stage = null;
    this.physicsBody = Physics.body('circle', {
      radius: 10
    });

    this.id = uuid();
    this.x = 0;
    this.y = 0;
    this.rad = 0;
    this.life = 1;
  }

  step(stage?: Stage): Promise<any> | any{}

  public isAlive(): boolean { return this.life > 0; }

  public isDead(): boolean { return !this.isAlive();}

  public dispose(){}

  public onHit(other: Entity){}

  public serialize(): {x: number; y:number; rad: number; id: string; type: string;} {
    return {
      id: this.id,
      x: this.x, y:this.y,
      rad: this.rad,
      type: (<any>this.constructor).type
    };
  }
}
