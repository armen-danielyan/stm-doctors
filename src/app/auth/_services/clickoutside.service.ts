import {Injectable} from '@angular/core';

@Injectable()
export class ClickoutsideService {
  isOpen;

  constructor() {
  }

  onClickedOutside(e: Event) {
    this.isOpen = false;
    // console.log('Clicked outside:', e);
  }
}
