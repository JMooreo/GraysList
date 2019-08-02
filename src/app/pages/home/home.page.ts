import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../services/tasks/tasks.service';
import { Task } from '../../models/task-model';
import { ModalController, AlertController } from '@ionic/angular';
import { CreateTaskPage } from '../create-task/create-task.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  today: Date = new Date(Date.now());
  tasks: Task[];
  userName: string;

  constructor(
    private TaskService: TasksService,
    public ModalCtrl: ModalController,
    public AlertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.userName = 'Justin'; // will get from user service
    this.subscribeToTasks();
  }

  subscribeToTasks() {
    this.TaskService.getAllTasks().subscribe(res => {
      const tasks = res.map(item => {
        return {
          ...item.payload.doc.data(),
          id: item.payload.doc.id,
        } as Task;
      });
      this.tasks = tasks;
      this.refreshTasksThatExpired();
    });
  }

  refreshTasksThatExpired() {
    this.tasks.forEach(task => {
      if (new Date(task.refreshDate) < new Date(Date.now()) && task.refreshInterval !== 0) {
        this.TaskService.updateTask({...task, completed: false, refreshDate: this.createRefreshDate(task)});
      }
    });
  }

  createRefreshDate(task: Task): string {
    return this.addDaysToDate(task.refreshInterval, new Date(task.refreshDate)).toISOString();
  }

  addDaysToDate(days: number, date: Date): Date {
    const tempDate = new Date(Date.now());
    return new Date(tempDate.setTime(date.getTime() + 86400000 * days));
  }

  getDayName(date: Date): string {
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ];
    return days[date.getDay()];
  }

  async showTaskCreator(task: Task) {
    const modal = await this.ModalCtrl.create({
      component: CreateTaskPage,
      componentProps: {
        id: task != null ? task.id : null,
        title: task != null ? task.title : null,
        interval: task != null ? task.refreshInterval : 0,
        repeatDay: task != null
          ? task.refreshDate != null
            ? new Date(task.refreshDate).getDay()
            : null
          : null,
        time: task != null ? task.refreshDate : null,
        titleText: task == null ? 'Add a New Task' : 'Edit Task',
        editModeEnabled: task != null ? true : false
      }
    });
    return await modal.present();
  }

  getPrettyDateString(date: Date): string {
    let prettyDateString = this.getDayName(date);

    if (date.getHours() === 0) {
      // display nothing (default time)
    } else if (date.getHours() < 12) {
      prettyDateString += ', ' + date.getHours() + ':';
      if (date.getMinutes().toString().length === 1) {
        prettyDateString += '0';
        prettyDateString += date.getMinutes();
      } else {
        prettyDateString += date.getMinutes();
      }
      prettyDateString += ' am';
    } else if (date.getHours() === 12) {
      prettyDateString += ', 12:';
      if (date.getMinutes().toString().length === 1) {
        prettyDateString += '0';
        prettyDateString += date.getMinutes();
      } else {
        prettyDateString += date.getMinutes();
      }
      prettyDateString += ' pm';
    } else {
      prettyDateString += ', ' + (date.getHours() - 12) + ':';
      if (date.getMinutes().toString().length === 1) {
        prettyDateString += '0';
        prettyDateString += date.getMinutes();
      } else {
        prettyDateString += date.getMinutes();
      }
      prettyDateString += ' pm';
    }

    return prettyDateString;
  }

  getRefreshInfo(task: Task): string {
    let refreshInfo = '';
    if (task.refreshDate != null && task.refreshInterval !== 0) {
      refreshInfo += 'renews ';
      if (this.getDayName(this.today) === this.getDayName(new Date(task.refreshDate))) {
        refreshInfo += 'next ';
      }
      refreshInfo += this.getPrettyDateString(new Date(task.refreshDate));
    }

    return refreshInfo;
  }

  async deleteTask(task: Task) {
    const alert = await this.AlertCtrl.create({
      header: 'Confirm',
      subHeader: 'Are you sure you want to delete',
      message: task.title,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            // do nothing
          }
        },
        {
          text: 'Delete',
          handler: () => {
            this.TaskService.deleteTask(task);
            // this.refreshTasks();
          }
        }
      ]
    });

    await alert.present();
  }

  toggleCompleted(task: Task) {
     this.TaskService.toggleCompleted(task);
  }
}
