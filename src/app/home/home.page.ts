import { Component } from '@angular/core';
import { TasksService } from '../tasks/tasks.service';
import { Task } from '../models/task-model';
import { ModalController, AlertController } from '@ionic/angular';
import { CreateTaskPage } from '../pages/create-task/create-task.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  today: Date = new Date();
  tasks: Task[];
  userName: string;

  constructor(
    private taskService: TasksService,
    public modalCtrl: ModalController,
    public AlertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.userName = 'Justin'; // will get from user service
    this.tasks = this.taskService.getAllTasks();
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

  async showTaskCreator(task) {
    const modal = await this.modalCtrl.create({
      component: CreateTaskPage,
      componentProps: {
        id: task != null ? task.id : null,
        title: task != null ? task.title : null,
        date:
          task != null
            ? task.refreshDate != null
              ? task.refreshDate.substring(0, 10)
              : null
            : null,
        interval:
          task != null
            ? task.refreshDate != null
              ? task.refreshDate.substring(10)
              : null
            : null,
        titleText: task == null ? 'Add a New Task' : 'Edit Task',
        editModeEnabled: task != null ? true : false
      }
    });
    return await modal.present();
  }

  async deleteTask(task) {
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
            console.log('didn\'t delete' + task.title);
          }
        }, {
          text: 'Delete',
          handler: () => {
            this.taskService.deleteTask(task.id);
            this.tasks = this.taskService.getAllTasks();
          }
        }
      ]
    });

    await alert.present();
  }

  toggleCompleted(id: string) {
    this.taskService.toggleCompleted(id, this.userName);
    this.tasks = this.taskService.getAllTasks();
  }
}
