import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { UserComponent } from './user/user.component';
import { SharedModule } from './../shared/shared.module';
import { PetsListComponent } from './pets-list/pets-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule
  ],
  declarations: [
    UserListComponent,
    UserComponent,
    PetsListComponent,
  ]
})
export class UsersModule { }
