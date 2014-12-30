global.EventEmitter = require('events').EventEmitter;

import Player = require('../entities/battlers/player');
import Entity = require('../entities/entity');
import Task = require('../tasks/task');
import Priority = require('../values/priority');

declare var Physics: any;

var _ = require('lodash');

export = Stage;
class Stage extends EventEmitter {
  public cnt: number;
  public entities: Entity[];
  public taskQueues: Task[];
  public physicsWorld: any;

  constructor(){
    super();
    this.cnt = 0;
    this.entities = [];
    this.taskQueues = [];
    this.physicsWorld = this.createWorld();
  }

  createWorld(){
    var world = Physics({
      integrator: 'verlet',
      maxIPF: 16,
      timestep: 1000.0 / 60
    });

    var viewportBounds = Physics.aabb(0, 0, 640, 480);
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

    //debug
    var ball = Physics.body('circle',{
      x: 100,
      y: 100,
      vx: 0.1,
      vy: 0.1,
      radius: 20
    });
    world.add(ball)

    var ball2 = Physics.body('circle',{
      x: 100,
      y: 150,
      vx: 0.1,
      vy: 0,
      radius: 20
    });
    world.add(ball2)
    global.world = world;

    return world;
  }

  public addTask(task: Task): void{
    this.taskQueues.push(task);
  }

  private sortTasks(): void {
    this.taskQueues = _.sortBy(this.taskQueues, (task) => {
      return task.priority ? task.priority : Priority.LOW
    });
  }

  private execAllTasks(): Promise<Task[]>{
    this.sortTasks();
    return new Promise(done => {
      var nextTasks: Task[] = [];
      (<any>Promise).reduce(this.taskQueues, (p, task) => {
        return new Promise(done=> {
          Promise.resolve(task.exec(this)).then((val)=> {
            if(val === true) nextTasks.push(task);
            done();
          });
        });
      }, Promise.resolve()).then(()=>{
        done(nextTasks);
      });
    });
  }

  private updatePhysicsWorld(){
    this.physicsWorld.step(Date.now());
    /*console.log(this.physicsWorld.getBodies()[0].state.pos.x);*/
  }

  public update(): Promise<any>{
    this.cnt++;
    this.updatePhysicsWorld();

    return new Promise(done => {
      Promise.all(this.entities.map(e => e.step(this))).then(() => {
        this.execAllTasks().then((nextTasks) => {
          this.taskQueues = nextTasks;
          done();
        });
      });
    });
  }
}
