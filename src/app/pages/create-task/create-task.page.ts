import { Component } from '@angular/core';
import { ModalController, AlertController, ToastController } from '@ionic/angular';
import { TasksService } from 'src/app/services/tasks/tasks.service';
import { Task } from '../../models/task-model';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.page.html',
  styleUrls: ['./create-task.page.scss']
})
export class CreateTaskPage {
  id: string;
  title: string;
  repeatDay: number;
  time: Date;
  interval: number;
  editModeEnabled: boolean;
  titleText: string;
  task: Task;

  constructor(
    private ModalCtrl: ModalController,
    public TaskService: TasksService,
    public AlertCtrl: AlertController,
    public ToastCtrl: ToastController
  ) {}

  closeModal(): void {
    this.ModalCtrl.dismiss();
  }

  getNextDateByDayNumber(date: Date, desiredDay: number): Date {
    let daysToAdd = 0;
    while (
      this.addDaysToDate(daysToAdd, date).getDay() !== desiredDay &&
      daysToAdd < 7
    ) {
      daysToAdd += 1;
    }
    return this.addDaysToDate(daysToAdd, date);
  }

  createRefreshDate(time: Date, repeatInterval: number = 0, repeatDay: number): Date {
    let dateTime = new Date(Date.now());
    const timeCast = new Date(time);

    if (repeatInterval === 7) {
      dateTime = this.getNextDateByDayNumber(dateTime, repeatDay);
    } else {
      dateTime = this.addDaysToDate(repeatInterval, dateTime);
    }

    if (time != null) {
      dateTime.setHours(timeCast.getHours());
      dateTime.setMinutes(timeCast.getMinutes());
    } else {
      dateTime.setHours(0);
      dateTime.setMinutes(0);
    }
    return dateTime;
  }

  addDaysToDate(days: number, date: Date): Date {
    const tempDate = new Date(Date.now());
    return new Date(tempDate.setTime(date.getTime() + 86400000 * days));
  }

  async presentUpdateConfirmation() {
    const toast = await this.ToastCtrl.create({
      message: 'Task Updated. Pull down to refresh',
      duration: 3000
    });
    toast.present();
  }

  addTask(taskId: string, taskTitle: string, taskInterval: number, taskRefreshDate: Date): void {
    const task: Task = {
      title: taskTitle,
      refreshInterval: taskInterval != null ? taskInterval : 0,
      refreshDate: taskRefreshDate,
      completed: false,
      completedBy: ''
    };

    if (this.isValidTask(task)) {
      this.TaskService.addTask(task);
      this.closeModal();
    }
  }

  updateTask(taskId: string, taskTitle: string, taskInterval: number, taskRefreshDate: Date) {
    const task: Task = {
      title: taskTitle,
      refreshInterval: taskInterval != null ? taskInterval : 0,
      refreshDate: taskRefreshDate,
      completed: false,
      completedBy: ''
    };

    if (this.isValidTask(task)) {
      this.TaskService.updateTask(task);
      this.closeModal();
      this.presentUpdateConfirmation();
    }
  }

  isValidTask(task: Task): boolean {
    if (task.title == null) {
      this.presentAlert('Description cannot be empty');
      return false;
    } else if (task.refreshInterval !== 0 && task.refreshDate == null) {
      this.presentAlert('Please choose a day');
      return false;
    }
    return true;
  }

  clearAll(): void {
    this.title = null;
    this.repeatDay = null;
    this.time = null;
    this.interval = 0;
  }

  async presentAlert(myMessage) {
    const alert = await this.AlertCtrl.create({
      header: 'Failed to Create Task',
      message: myMessage,
      buttons: ['OK']
    });

    await alert.present();
  }
}
