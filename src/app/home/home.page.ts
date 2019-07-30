import { Component } from '@angular/core';
import { TasksService } from '../tasks/tasks.service';
import { Task } from '../models/task-model';
import { ModalController } from '@ionic/angular';
import { CreateTaskPage } from '../pages/create-task/create-task.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  today: Date = new Date();
  tasks: Task[];

  constructor(
    private taskService: TasksService,
    public modalCtrl: ModalController
  ) {}

  ngOnInit() {
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

  async showTaskCreator() {
    const modal = await this.modalCtrl.create({
      component: CreateTaskPage
    });
    return await modal.present();
  }

  updateTask(id: string) {
    this.taskService.updateTask(id);
    this.tasks = this.taskService.getAllTasks();

  }
  deleteTask(id: string) {
    this.taskService.deleteTask(id);
    this.tasks = this.taskService.getAllTasks();

  }
  toggleCompleted(id: string) {
    this.taskService.toggleCompleted(id);
    this.tasks = this.taskService.getAllTasks();

  }
}
