import {Component, OnInit} from '@angular/core';
import {ClickoutsideService} from '../../../auth/_services/clickoutside.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit {
  default = 'Потерян доступ к аккаунту';
  isOpen = false;
  subjects = [
    {name: 'Потерян доступ к аккаунту'},
    {name: 'Неизвестная проблема'}
  ];

  isOpened() {
    this.isOpen = !this.isOpen;
  }

  onSelect(name) {
    this.default = name;
    this.isOpen = false;
  }

  constructor(private clickoutsideService: ClickoutsideService) {
  }

  clickOut() {
    this.clickoutsideService.onClickedOutside(event);
    this.isOpen = this.clickoutsideService.isOpen;
  }

  ngOnInit() {

  }
}
