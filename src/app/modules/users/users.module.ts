import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { UserComponent } from './user/user.component';
import { SharedModule } from './../shared/shared.module';
import { PetsListComponent } from './pets-list/pets-list.component';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule
  ],
  declarations: [
    UserListComponent,
    UserComponent,
    PetsListComponent,
  ]
})
export class UsersModule { }
