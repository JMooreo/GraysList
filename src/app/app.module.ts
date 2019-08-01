import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CreateTaskPageModule } from './pages/create-task/create-task.module';
import { environment } from 'src/environments/environment';
import { TasksService } from './services/tasks/tasks.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  exports: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    CreateTaskPageModule,
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyB5oZ24rtCaxzQ0Rn-qMlqxRsHc7zN2eV8',
      authDomain: 'grayslist-4a7c7.firebaseapp.com',
      databaseURL: 'https://grayslist-4a7c7.firebaseio.com',
      projectId: 'grayslist-4a7c7',
      storageBucket: 'grayslist-4a7c7.appspot.com',
      messagingSenderId: '384825461497',
      appId: '1:384825461497:web:41b683e39c8c4482'
    }),
    AngularFirestoreModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    TasksService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
