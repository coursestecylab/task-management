import { Injectable } from '@nestjs/common';
import { Task } from './task.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: number): Task {
    const taskId = +id;
    return this.tasks.find((task) => task.id === taskId);
  }

  createTask(title: string, description: string): Task {
    const newTask: Task = {
      id: Math.floor(Math.random() * 1000) + 1,
      title,
      description,
    };
    this.tasks.push(newTask);
    return newTask;
  }

  deleteTask() {}

  updateTask() {}
}
