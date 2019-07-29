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
      title: 'Feed Scar',
      nextRefresh: new Date('2019-07-18'),
      completed: true,
      completedBy: 'Joe'
    }
  ];

  constructor() { }

  getAllTasks() {
    return [...this.tasks];
  }
}
