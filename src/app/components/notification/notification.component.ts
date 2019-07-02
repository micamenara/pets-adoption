import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../../services/general.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  public show: boolean;
  public message: string;
  constructor(
    private _generalService: GeneralService
  ) {
    this._generalService.message.subscribe(value => {
      this.message = value.message;
      this.show = true;
    });
  }

  ngOnInit() {
  }

  toggle() {
    this.show = false;
  }

}
