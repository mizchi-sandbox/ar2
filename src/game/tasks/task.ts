interface Task {
  exec(): void | boolean | Promise<boolean> | Promise<void>;
}

export = Task;
