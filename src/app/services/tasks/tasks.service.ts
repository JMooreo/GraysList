import { Injectable } from '@angular/core';
import { Task } from '../../models/task-model';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  userName: string;

  constructor(
    private firestore: AngularFirestore,
    public afAuth: AngularFireAuth) {
      this.userName = this.afAuth.auth.currentUser.displayName;
    }

 getAllTasks() {
    return this.firestore.collection('tasks',
      ref => ref.orderBy('createdDate', 'desc')).snapshotChanges();
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
    let newTask: Task;
    if (!task.completed) {
      newTask = {...task, completed: true, completedBy: this.userName};
    } else { // if (userService.getUserName() == task.completedBy)
      newTask = {...task, completed: false, completedBy: ''};
     }
    this.firestore.doc('tasks/' + task.id).update(newTask);
  }
}


