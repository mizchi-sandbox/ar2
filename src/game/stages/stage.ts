global.EventEmitter = require('events').EventEmitter;

import Player = require('../entities/battlers/player');
import Entity = require('../entities/entity');
import Task = require('../tasks/task');

export = Stage;
class Stage extends EventEmitter {
  public cnt: number;
  public entities: Entity[];
  public taskQueues: Task[];

  constructor(){
    super();
    this.cnt = 0;
    this.entities = [];
    this.taskQueues = [];
  }

  public addTask(task: Task): void{
    this.taskQueues.push(task);
  }

  private execAllTasks(): Promise<Task[]>{
    return new Promise(done => {
      var nextTasks: Task[] = [];
      (<any>Promise).reduce(this.taskQueues, (p, task) => {
        return new Promise(done=> {
          Promise.resolve(task.exec()).then((val)=> {
            if(val === true) nextTasks.push(task);
            done();
          });
        });
      }, Promise.resolve()).then(()=>{
        done(nextTasks);
      });
    });
  }

  public update(): Promise<any>{
    return new Promise(done => {
      this.cnt++;
      // TODO 計算量の圧縮と衝突判定すり抜け対策
      this.entities
        .filter(e => e.isAttackable() && e.isAlive())
        .forEach(attacker => {
          this.entities
            .filter(e => attacker.canAttackTo(e))
            .forEach(target => {
              attacker.attack(target);
              if(attacker.isDead()) return;
            });
          });

      Promise.all(this.entities.map(e => e.step())).then(() => {
        this.execAllTasks().then((nextTasks) => {
          this.taskQueues = nextTasks;
          this.entities = this.entities.filter(e => e.isAlive());
          done();
        });
      });
    });
  }
}
