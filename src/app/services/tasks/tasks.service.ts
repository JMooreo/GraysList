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

  addTask(task: Task) {
    this.firestore.collection('tasks').add(task);
  }

  updateTask(task: Task) {
    this.firestore.doc('tasks/' + task.id).update(task);
  }

  deleteTask(task: Task) {
    this.firestore.doc('tasks/' + task.id).delete();
  }

  toggleCompleted(task: Task) {
    const newTask = {...task, completed: !task.completed, completedBy: 'Justin' }; // Get Name from User Service
    this.firestore.doc('tasks/' + task.id).update(newTask);
  }
}
