import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { TasksService } from 'src/app/tasks/tasks.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.page.html',
  styleUrls: ['./create-task.page.scss']
})
export class CreateTaskPage implements OnInit {
  id: string;
  title: string;
  date: Date;
  time: Date;
  interval: number;
  editModeEnabled: boolean;
  titleText: string;

  constructor(
    private ModalCtrl: ModalController,
    public TaskService: TasksService,
    public AlertCtrl: AlertController
  ) {}

  ngOnInit() {}

  closeModal(): void {
    this.ModalCtrl.dismiss();
  }

  createId(): string {
    return this.TaskService.createId();
  }

  getRefreshDate(date, time, repeatInterval): Date {
    if (repeatInterval === 7 && date != null) {
      const dateTime =
        time == null
          ? new Date(date.substring(0, 10) + 'T00:00:00')
          : new Date(date.substring(0, 10) + time.substring(10));

      return this.addDaysToDate(repeatInterval, dateTime);
    } else {
      return null;
    }
  }

  addDaysToDate(days: number, date: Date): Date {
    return new Date(date.setTime(date.getTime() + 86400000 * days));
  }

  addTask(id, title, interval, refreshDate): void {
    if (this.isValidTask(id, title, interval, refreshDate)) {
      this.TaskService.addTask(id, title, interval, refreshDate, false, null);
      this.closeModal();
    }
  }

  isValidTask(id, title, interval, refreshDate): boolean {
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
    if (interval === 7 && refreshDate == null) {
      this.presentAlert('Please choose a day');
      return;
    }
    return true;
  }

  clearAll(): void {
    this.title = null;
    this.date = null;
    this.time = null;
    this.interval = null;
  }

  updateTask(id, title, interval, refreshDate) {
    if (this.isValidTask(id, title, interval, refreshDate)) {
      this.TaskService.updateTask(id, title, interval, refreshDate);
      this.closeModal();
    }
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
