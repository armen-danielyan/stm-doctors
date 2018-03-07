import {Injectable} from '@angular/core';
import {CognitoCallback, CognitoUtil, RegistrationUser} from './cognito.service';


declare let AWS: any;
declare let AWSCognito: any;


@Injectable()
export class DoctorRegistrationService {

  public phone_global: string;
  public email_global: string;
  public password_global: string;
  public isloginpassword_global: string;
  public errormessagePassword: string;

  public reset_phone_number: string;

  constructor(public cUtil: CognitoUtil) {
  }

  register(user: RegistrationUser, callback: CognitoCallback): void {
    console.log('user: ' + user);
    const attributeList = [];
    const dataEmail = {
      Name: 'email',
      Value: user.email
    };
    const dataNickname = {
      Name: 'phone_number',
      Value: user.phone_number
    };
    attributeList.push(new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataEmail));
    attributeList.push(new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataNickname));

    this.cUtil.getUserPool().signUp(user.phone_number, user.password, attributeList, null, function (err, result) {
      if (err) {
        callback.cognitoCallback(err.message, null);
      } else {
        console.log('registered user: ' + result);
        callback.cognitoCallback(null, result);
      }
    });
  }

  confirmRegistration(username: string, confirmationCode: string, callback: CognitoCallback): void {

    const userData = {
      Username: username,
      Pool: this.cUtil.getUserPool()
    };

    const cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);

    cognitoUser.confirmRegistration(confirmationCode, true, function (err, result) {
      if (err) {
        callback.cognitoCallback(err.message, null);
      } else {
        callback.cognitoCallback(null, result);
      }
    });
  }


  resendCode(username: string, callback: CognitoCallback): void {
    const userData = {
      Username: username,
      Pool: this.cUtil.getUserPool()
    };

    const cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);

    cognitoUser.resendConfirmationCode(function (err, result) {
      if (err) {
        callback.cognitoCallback(err.message, null);
      } else {
        callback.cognitoCallback(null, result);
      }
    });
  }

  changePassword(oldpass: string, newpass: string, callback: CognitoCallback): void {
    const cognitoUser = this.cUtil.getCurrentUser();
    console.log('oldpassword_global -' + this.isloginpassword_global);

    if (cognitoUser != null) {
      cognitoUser.getSession(function (err, session) {
        if (err) {
          alert(err);
          return;
        }
      });
    }

    cognitoUser.changePassword(oldpass, newpass, function (err, result) {
      if (err) {
        callback.cognitoCallback(err.message, null);
        return;
      }
       callback.cognitoCallback(null, result);
      return;
    });
  }

  forgotpass(username: string): void {
    const userData = {
      Username: username,
      Pool: this.cUtil.getUserPool()
    };

    const cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
    cognitoUser.forgotPassword({
      onSuccess: function (data) {
        // successfully initiated reset password request
        console.log('CodeDeliveryData from forgotPassword: ' + data);
      },
      onFailure: function (err) {
        alert(err);
      },
      // Optional automatic callback
      inputVerificationCode: function (data) {
        console.log('Code sent to: ' + data);
        return data;
       }
    });
  }

  confirmnewpass(username: string, verificationCode: string, newPassword: string): void {
    const userData = {
      Username: username,
      Pool: this.cUtil.getUserPool()
    };
    const cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
    cognitoUser.confirmPassword(verificationCode, newPassword, {
      onSuccess() {
        console.log('Password confirmed!');
      },
      onFailure(err) {
        console.log('Password not confirmed!');
      }
    });
  }

  changeNumber(username: string, callback: CognitoCallback) {

    const cognitoUser = this.cUtil.getCurrentUser();
    console.log(this.cUtil.getUserPool());

    if (cognitoUser != null) {
      cognitoUser.getSession(function (err, session) {
        if (err) {
          alert(err);
          return;
        }
      });
    }
    const attributeList = [];
    const attributes = {
      Name: 'phone_number',
      Value: username,
    };
console.log(attributes);
    const attribute = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(attributes);
    attributeList.push(attribute);

    cognitoUser.updateAttributes(attributeList, function (err, result) {
      if (err) {
        callback.cognitoCallback(err, null);
        return;
      }

    });


  }
  VerificationCode(code: string, callback: CognitoCallback) {
    const cognitoUser = this.cUtil.getCurrentUser();
    if (cognitoUser != null) {
      cognitoUser.getSession(function (err, session) {
        if (err) {
          alert(err);
          return;
        }
      });
      cognitoUser.verifyAttribute('phone_number', code, {
        onSuccess: success => {
          console.log(success);
        },
        onFailure: err => {
          callback.cognitoCallback(err, null);
        }
      });
    }
  }
  resendCodeRegister(username: string): void {
    const userData = {
      Username: username,
      Pool: this.cUtil.getUserPool()
    };
    const cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
    cognitoUser.resendConfirmationCode(function (err, result) {
      if (err) {
        console.log(err.message);
      } else {
        console.log(result);      }
    });
  }
}
