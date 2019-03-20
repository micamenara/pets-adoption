import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {
  @Input() imageClass: string;
  @Input() isFullHeight: boolean;
  @Input() title: string;
  @Input() subtitle: string;
  hasImage: boolean;

  constructor() { }

  ngOnInit() {
    this.hasImage = this.imageClass && this.imageClass.length > 0;
    this.isFullHeight = this.isFullHeight || false;
  }

}
