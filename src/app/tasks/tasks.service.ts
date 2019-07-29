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
      nextRefresh: new Date('2019-07-18'),
      completed: false,
      completedBy: null
    },
    {
      id: 't2',
      title: 'a very long name that could just keep going and going',
      nextRefresh: new Date('2019-07-18'),
      completed: true,
      completedBy: 'Joe'
    }
  ];

  constructor() {}

  getAllTasks() {
    return [...this.tasks];
  }

  toggleCompleted(taskId: string) {
    this.tasks.forEach(task => {
      if (task.id === taskId) {
      }
    });
  }

  addTask(
    taskId: string,
    taskTitle: string,
    taskNextRefresh: Date,
    taskCompleted: boolean,
    taskCompletedBy: string
  ) {
    this.tasks.push({
      id: taskId,
      title: taskTitle,
      nextRefresh: taskNextRefresh,
      completed: taskCompleted,
      completedBy: taskCompletedBy
    });
  }
}
