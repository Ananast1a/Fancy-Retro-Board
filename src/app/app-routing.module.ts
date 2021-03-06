import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ColumnsComponent } from "./columns/columns.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";
import { AuthGuard } from "./auth/auth.guard";

const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'boards', component: ColumnsComponent, canActivate: [AuthGuard]},
    {path: 'register', component: RegisterComponent},
    {path: 'login', component: LoginComponent},
]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})

export class AppRoutingModule {

}