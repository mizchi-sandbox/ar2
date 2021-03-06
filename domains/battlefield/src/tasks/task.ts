import Stage = require('../stages/stage');
import Priority = require('../values/priority')

interface Task {
  priority?: Priority;
  exec(stage?: Stage): void | boolean | Promise<boolean> | Promise<void>;
}

export = Task;
