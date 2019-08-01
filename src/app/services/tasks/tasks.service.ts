import { Injectable } from '@angular/core';
import { Task } from '../../models/task-model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private firestore: AngularFirestore) {}

  getAllTasks() {
    return this.firestore.collection('tasks').snapshotChanges();
  }

  toggleCompleted(id: string, userName: string) {

  }

  updateTask(task: Task) {

  }

  deleteTask(task: Task) {

  }

  addTask(task: Task) {
    this.firestore.collection('tasks').add(task);
  }
}
