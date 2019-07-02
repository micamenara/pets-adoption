import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  @Output() message: EventEmitter<any> = new EventEmitter();

  constructor() { }

  showMessage(message) {
    this.message.emit({ message });
  }
}
