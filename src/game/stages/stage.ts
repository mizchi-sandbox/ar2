global.EventEmitter = require('events').EventEmitter;

import Player = require('../entities/battlers/player');
import Entity = require('../entities/entity');
import Task = require('../tasks/task');
import Priority = require('../values/priority');

var _ = require('lodash');

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

  public update(): Promise<any>{
    return new Promise(done => {
      this.cnt++;
      Promise.all(this.entities.map(e => e.step(this))).then(() => {
        this.execAllTasks().then((nextTasks) => {
          this.taskQueues = nextTasks;
          done();
        });
      });
    });
  }
}
