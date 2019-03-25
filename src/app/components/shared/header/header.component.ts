import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isActive: boolean;
  isModalActive = false;

  constructor() { }

  ngOnInit() {
    this.isActive = false;
  }

  toggleModal() {
    this.isModalActive = !this.isModalActive;
  }

}
