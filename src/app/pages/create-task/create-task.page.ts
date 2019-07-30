import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { TasksService } from 'src/app/tasks/tasks.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.page.html',
  styleUrls: ['./create-task.page.scss']
})
export class CreateTaskPage implements OnInit {
  title: string;
  date: any;
  time: any;
  interval: any;

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
    if (repeatInterval != null && repeatInterval !== 0 && date != null) {
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
      this.presentAlert('Please choose a start date');
      return;
    }
    this.TaskService.addTask(id, title, interval, refreshDate, false, null);
    this.closeModal();
  }

  clearAll(): void {
    this.title = null;
    this.date = null;
    this.time = null;
    this.interval = null;
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
