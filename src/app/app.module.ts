import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ColumnComponent } from './columns/column/column.component';
import { TasksComponent } from './columns/column/tasks/tasks.component';
import { CommentsComponent } from './columns/column/tasks/comments/comments.component';
import { ColumnsComponent } from './columns/columns.component';
import { AboutComponent } from './about/about.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ColumnComponent,
    TasksComponent,
    CommentsComponent,
    ColumnsComponent,
    AboutComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DragDropModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
