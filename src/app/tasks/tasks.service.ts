import { Injectable } from '@angular/core';
import { Task } from '../models/task-model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private tasks: Task[] = [
    {
      id: 't1',
      title: 'Feed Bailey',
      refreshInterval: 1,
      nextRefresh: new Date('2019-07-18'),
      completed: false,
      completedBy: null
    },
    {
      id: 't2',
      title: 'a very long name that could just keep going and going',
      refreshInterval: 1,
      nextRefresh: new Date('2019-07-18'),
      completed: true,
      completedBy: 'Joe'
    }
  ];

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

  updateTask(id, newTitle, newInterval, newRefreshDate) {
    const newTasks = [];
    this.tasks.forEach(task => {
      if (task.id === id) {
        task = {...task, title: newTitle, refreshInterval: newInterval, nextRefresh: newRefreshDate};
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
    taskNextRefresh: Date,
    taskCompleted: boolean,
    taskCompletedBy: string
  ) {
    this.tasks.push({
      id: taskId,
      title: taskTitle,
      refreshInterval: taskRefreshInterval,
      nextRefresh: taskNextRefresh,
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
