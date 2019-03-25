import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../components/shared/header/header.component';
import { HeroComponent } from '../../components/shared/hero/hero.component';
import { FooterComponent } from '../../components/shared/footer/footer.component';
import { LoginComponent } from '../../components/shared/login/login.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [
    HeaderComponent,
    HeroComponent,
    FooterComponent,
    LoginComponent
  ],
  exports: [
    HeaderComponent,
    HeroComponent,
    FooterComponent,
    LoginComponent
  ]
})
export class SharedModule { }
