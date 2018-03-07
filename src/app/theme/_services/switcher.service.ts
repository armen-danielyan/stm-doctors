import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class SwitcherService {


  // private addAppointment = new BehaviorSubject({});
  // appointment = this.addAppointment.asObservable();


  private addChatMessage = new BehaviorSubject('');
  chatmessage = this.addChatMessage.asObservable();

  imageURL = new Subject<any>();

  constructor() {
  }

  addChatMessageMethod(chatmesage) {   // show hide interrupt components
    this.addChatMessage.next(chatmesage);
  }




}
