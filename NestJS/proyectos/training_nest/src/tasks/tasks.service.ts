import { Body, Injectable } from '@nestjs/common';

export interface Task {
  id: number;
  name: string;
  description: string;
  isDone: boolean;
}

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getTasks() {
    return this.tasks;
  }

  createTask(task: Task) {
    task.id = this.tasks.length + 1;
    this.tasks.push(task);
    console.log(task);
    return `Tarea Agregada: ${task.name}`;
  }

  deleteTask(task: Task) {
    const index = this.tasks.indexOf(task);
    this.tasks.splice(index, 1);
  }

  // updateTask(task: Task) {
  //   // const index = this.tasks.indexOf(task);
  // }
}
