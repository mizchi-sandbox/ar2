global.EventEmitter = require('events').EventEmitter;

import Player = require('../entities/battlers/player');
import Entity = require('../entities/entity');
import Task = require('../tasks/task');
import Priority = require('../values/priority');
import TaskRunner = require('./task-runner');

declare var Physics: any;
var _ = require('lodash');

export = Stage;
class Stage extends EventEmitter {
  public cnt: number;
  public entities: Entity[];
  /*public taskQueues: Task[];*/
  public taskRunner: TaskRunner;
  public physicsWorld: any;

  public width: number = 1000;
  public height: number = 1000;

  addChild(entity: Entity){
    this.entities.push(entity);
    entity.stage = this;
    this.physicsWorld.add(entity.physicsBody);
  }

  public get taskQueueCount(): number { return this.taskRunner.taskQueues.length; }

  constructor(){
    super();
    this.cnt = 0;
    this.entities = [];
    this.taskRunner = new TaskRunner();
    this.physicsWorld = this.createWorld();
  }

  createWorld(){
    var world = Physics({
      integrator: 'verlet',
      maxIPF: 16,
      timestep: 1000.0 / 60
    });

    var viewportBounds = Physics.aabb(0, 0, this.width, this.height);
    var edgeBounce = Physics.behavior('edge-collision-detection',{
      aabb: viewportBounds,
      restitution: 0.5,
      cof: 0.5
    });

    world.add([
      Physics.behavior('body-impulse-response'),
      Physics.behavior('body-collision-detection'),
      Physics.behavior('sweep-prune'),
      edgeBounce
    ]);

    world.on('collisions:detected', (data) => {
      data.collisions.forEach((col)=>{
        var bodyA = col.bodyA;
        var bodyB = col.bodyB;
        var entityA = _.find(this.entities, e => e.physicsBody.uid === bodyA.uid);
        var entityB = _.find(this.entities, e => e.physicsBody.uid === bodyB.uid);
        //TODO: research why get null object
        if(entityA && entityB) {
          entityA.onHit(entityB);
          entityB.onHit(entityA);
        }
      });
    });

    global.world = world;
    return world;
  }

  public addTask(task: Task): void{
    this.taskRunner.addTask(task);
  }

  private updatePhysicsWorld(){
    this.physicsWorld.step(Date.now());
  }

  public update(): Promise<any>{
    this.cnt++;
    this.updatePhysicsWorld();

    return new Promise(done => {
      Promise.all(this.entities.map(e => e.step(this))).then(() => {
        done(this.taskRunner.run(this));
      });
    });
  }
}
