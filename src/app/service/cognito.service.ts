import {Injectable} from '@angular/core';
import {_POOL_DATA} from './properties.service';

declare let AWS: any;
declare let AWSCognito: any;

export class RegistrationUser {
  email?: string;
  phone_number: string;
  password: string;
}

export class User {
  last_name: string;
  first_name: string;
  mid_name: string;
  birth_date: string;
  leave_city: string;
  gender: string;
  height: string;
  weight: string;
  cognito_id: string;
}

export class DoctorEducation {
  study_country_city: string;
  university_name: string;
  faculty_name: string;
  release_date: string;
}

export class DoctorCareer {
  work_country_city: string;
  company_name: string;
  doctor_position: string;
  position_start_date: string;
  total_work_length: string;
  advisor_info: string;
}

export interface CognitoCallback {
  cognitoCallback(message: string, result: any): void;
}


export interface ChatCallback {
  ChatCallback(message: string, result: any): void;
}


export interface LoggedInCallback {
  isLoggedInCallback(message: string, loggedIn: boolean): void;
}

export interface Callback {
  callback(): void;

  callbackWithParam(result: any): void;
}

@Injectable()
export class CognitoUtil {

  constructor() {
  }

  getUserPool() {
    return new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(_POOL_DATA);
  }

  getCurrentUser() {
    return this.getUserPool().getCurrentUser();
  }


  getCognitoIdentity(): string {
    return AWS.config.credentials.identityId;
  }

  getAccessToken(callback: Callback): void {
    if (callback == null) {
      throw('callback in getAccessToken is null...returning');
    }
    this.getCurrentUser().getSession(function (err, session) {
      if (err) {
        console.log('Cant set the credentials:' + err);
        callback.callbackWithParam(null);
      } else {
        if (session.isValid()) {
          callback.callbackWithParam(session.getAccessToken().getJwtToken());
        }
      }
    });
  }

  getIdToken(callback: Callback): void {
    if (callback == null) {
      throw('callback in getIdToken is null...returning');
    }
    this.getCurrentUser().getSession(function (err, session) {
      if (err) {
        console.log('Can\'t set the credentials:' + err);
        callback.callbackWithParam(null);
      } else {
        if (session.isValid()) {
          callback.callbackWithParam(session.getIdToken().getJwtToken());
        } else {
          console.log('Got the id token, but the session isn\'t valid');
        }
      }
    });
  }

  getRefreshToken(callback: Callback): void {
    if (callback == null) {
      throw('callback in getRefreshToken is null...returning');
    }
    this.getCurrentUser().getSession(function (err, session) {
      if (err) {
        console.log('Can\'t set the credentials:' + err);
        callback.callbackWithParam(null);
      } else {
        if (session.isValid()) {
          callback.callbackWithParam(session.getRefreshToken());
        }
      }
    });
  }

}






