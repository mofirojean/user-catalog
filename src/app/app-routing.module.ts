import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './component/users/users.component';
import { UserDetailComponent } from './component/user-detail/user-detail.component';
import { UserResolver } from './service/resolver/user.resolver';

const routes: Routes = [
  {path: "users", component: UsersComponent, title: "users"},
  {path: "user/:uuid", component: UserDetailComponent, title: "user", resolve: {resolvedResponse: UserResolver}},
  {path: "**", redirectTo: "users"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
