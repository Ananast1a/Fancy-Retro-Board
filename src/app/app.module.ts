import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ColumnComponent } from './columns/column/column.component';
import { TasksComponent } from './columns/column/tasks/tasks.component';
import { CommentsComponent } from './columns/column/tasks/comments/comments.component';
import { ColumnsComponent } from './columns/columns.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './auth/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AuthInterceptorSevice } from './auth/auth-interceptor.service';
import { DataStorageService } from './shared/data-storage.service';
import { ColumnsService } from './columns/columns.service';
import { ExcelService } from "./shared/excel.service";
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ColumnComponent,
    TasksComponent,
    CommentsComponent,
    ColumnsComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    LoadingSpinnerComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DragDropModule,
    HttpClientModule
  ],
  providers: [AuthService, 
    DataStorageService,
    ColumnsService,
    ExcelService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorSevice, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
