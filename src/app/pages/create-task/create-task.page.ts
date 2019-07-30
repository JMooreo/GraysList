import { Component } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { TasksService } from 'src/app/tasks/tasks.service';

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

  constructor(
    private ModalCtrl: ModalController,
    public TaskService: TasksService,
    public AlertCtrl: AlertController
  ) {}

  closeModal(): void {
    this.ModalCtrl.dismiss();
  }

  createId(): string {
    return this.TaskService.createId();
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

  addTask(id: string, title: string, interval: number, refreshDate: Date): void {
    if (this.isValidTask(id, title, interval, refreshDate)) {
      this.TaskService.addTask(id, title, interval, refreshDate, false, null);
      this.closeModal();
    }
  }

  updateTask(id: string, title: string, interval: number, refreshDate: Date) {
    if (this.isValidTask(id, title, interval, refreshDate)) {
      this.TaskService.updateTask(id, title, interval, refreshDate);
      this.closeModal();
    }
  }

  isValidTask(id: string, title: string, interval: number, refreshDate: Date): boolean {
    if (id != null) {
      id = this.createId();
    }
    if (title == null) {
      this.presentAlert('Description cannot be empty');
      return;
    }
    if (interval == null) {
      interval = 0;
    }
    if (interval !== 0 && refreshDate == null) {
      this.presentAlert('Please choose a day');
      return;
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
