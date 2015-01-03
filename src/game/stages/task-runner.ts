import Stage = require('./stage');
import Entity = require('../entities/entity');
import Task = require('../tasks/task');
import Priority = require('../values/priority');
var _ = require('lodash');

export = TaskRunner;
class TaskRunner {
  public taskQueues: Task[] = [];

  constructor(){
    this.taskQueues = [];
  }

  public addTask(task: Task): void{
    this.taskQueues.push(task);
  }

  private sortTasks(): void {
    this.taskQueues = _.sortBy(this.taskQueues, task => {
      return task.priority ? task.priority : Priority.LOW
    });
  }

  private execAllTasks(stage: Stage){
    this.sortTasks();
    var nextTasks: Task[] = [];
    var taskQueues = this.taskQueues.slice();
    this.taskQueues = [];

    return new Promise(done => {
      (<any>Promise).reduce(taskQueues, (p, task) => {
        return new Promise(done=> {
          Promise.resolve(task.exec(stage)).then((val)=> {
            if(val === true) nextTasks.push(task);
            done();
          });
        });
      }, Promise.resolve()).then(()=>{
        this.taskQueues = this.taskQueues.concat(nextTasks);
        done();
      });
    });
  }

  public run(stage: Stage): Promise<any>{
    return new Promise(done => {
      this.execAllTasks(stage).then(done);
    });
  }
}
