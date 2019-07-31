import { Injectable } from '@angular/core';
import { Task } from '../../models/task-model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private tasks: Task[] = [];

  constructor() {}

  getAllTasks() {
    return this.tasks;
  }

  toggleCompleted(id: string, userName: string) {
    const newTasks = [];
    this.tasks.forEach(task => {
      if (task.id === id) {
        task = {...task, completed: !task.completed, completedBy: userName};
      }
      newTasks.push(task);
    });
    this.tasks = newTasks;
  }

  updateTask(id: string, newTitle: string, newRefreshInterval: number, newRefreshDate: Date) {
    const newTasks = [];
    this.tasks.forEach(task => {
      if (task.id === id) {
        task = {...task, title: newTitle, refreshInterval: newRefreshInterval, refreshDate: newRefreshDate};
      }
      newTasks.push(task);
    });
    this.tasks = newTasks;
  }

  deleteTask(id: string) {
    const newTasks = [];
    this.tasks.forEach(task => {
      if (task.id !== id) {
        newTasks.push(task);
      }
    });
    this.tasks = newTasks;
  }

  addTask(
    taskId: string,
    taskTitle: string,
    taskRefreshInterval: number,
    taskrefreshDate: Date,
    taskCompleted: boolean,
    taskCompletedBy: string
  ) {
    this.tasks.push({
      id: taskId,
      title: taskTitle,
      refreshInterval: taskRefreshInterval,
      refreshDate: taskrefreshDate,
      completed: taskCompleted,
      completedBy: taskCompletedBy
    });
  }

  createId(): string {
    return (
      'tID-' +
      Math.floor(999999999 * Math.random() * Math.random() * Math.random())
    );
  }
}
