import {Injectable, EventEmitter} from '@angular/core';
import {CognitoCallback, CognitoUtil, LoggedInCallback} from './cognito.service';
import {_IDENTITY_POOL_ID, _REGION, _USER_POOL_ID, _CLIENT_ID} from './properties.service';
import 'aws-sdk/dist/aws-sdk';
import {after} from 'selenium-webdriver/testing';
import {DoctorCrudService} from '../auth/_services/doctor-crud.service';
import { environment } from '../../environments/environment';

// declare let AWS: any;
declare let AWSCognito: any;
const albumBucketName = environment.aws.s3.provider.bucket;
const bucketRegion = environment.aws.s3.provider.region;
const AWS = window.AWS;
let delKey = null;


@Injectable()
export class DoctorLoginService {

  constructor(
    public cUtil: CognitoUtil,
    private doctorCrudService: DoctorCrudService
  ) {}


  authenticate(username: string, password: string, callback: CognitoCallback) {
    // Need to provide placeholder keys unless unauthorised user access is enabled for user pool
    AWSCognito.config.update({accessKeyId: 'anything', secretAccessKey: 'anything'});
    const authenticationData = {
      Username: username,
      Password: password,
    };
    const authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);
    const userData = {
      Username: username,
      Pool: this.cUtil.getUserPool()
    };
    console.log('Authenticating the user');
    const cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
        callback.cognitoCallback(null, result);
        // mythis.eventService.sendLoggedInEvent();
      },
      onFailure: function (err) {
        callback.cognitoCallback(err.message, null);
        console.log(err.message);
      },
    });
  }

  forgotPassword(username: string, callback: CognitoCallback) {
    const userData = {
      Username: username,
      Pool: this.cUtil.getUserPool()
    };

    const cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);

    cognitoUser.forgotPassword({
      onSuccess: function (result) {
      },
      onFailure: function (err) {
        callback.cognitoCallback(err.message, null);
      },
      inputVerificationCode() {
        callback.cognitoCallback(null, null);
      }
    });
  }

  confirmNewPassword(email: string, verificationCode: string, password: string, callback: CognitoCallback) {
    const userData = {
      Username: email,
      Pool: this.cUtil.getUserPool()
    };

    const cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);

    cognitoUser.confirmPassword(verificationCode, password, {
      onSuccess: function (result) {
        callback.cognitoCallback(null, result);
      },
      onFailure: function (err) {
        callback.cognitoCallback(err.message, null);
      }
    });
  }

  logout() {
    console.log('Logging out');

    if (this.cUtil.getCurrentUser() !== null) {
      this.cUtil.getCurrentUser().signOut();
      console.log('Logging out TRUE');
    }
    // this.eventService.sendLogoutEvent();
  }

  isAuthenticated(callback: LoggedInCallback) {
    alert('ok');
    if (callback == null)
      throw('Callback in isAuthenticated() cannot be null');

    console.log('Getting the current user');
    const cognitoUser = this.cUtil.getCurrentUser();

    if (cognitoUser != null) {
      cognitoUser.getSession(function (err, session) {
        if (err) {
          console.log('Couldn\'t get the session: ' + err, err.stack);
          callback.isLoggedInCallback(err, false);
        } else {
          console.log('Session is valid: ' + session.isValid());
          callback.isLoggedInCallback(err, session.isValid());
        }
      });
    } else {
      callback.isLoggedInCallback('Can\'t retrieve the CurrentUser', false);
    }
  }

  /* CREATE PHOTO IN PERSONAL-DATA */

  /**
   * @info string in EventEmitter will contain a new image url
   */
  PhotoCreatedEvent: EventEmitter< string > = new EventEmitter();

  StartedLoadingImageEvent: EventEmitter< string > = new EventEmitter();

  PhotoRemovedEvent: EventEmitter< string > = new EventEmitter();

  createPhoto(filename, body) {
    this.StartedLoadingImageEvent.emit();
    const cognitoUser = this.cUtil.getCurrentUser();
    console.log(cognitoUser);
    cognitoUser.getSession(
      (err, session) => {
        if (err) {
          alert(err);
          return;
        }
        AWS.config.region = 'eu-central-1';
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
          IdentityPoolId: _IDENTITY_POOL_ID,
          Logins: {
            [`cognito-idp.${_REGION}.amazonaws.com/${_USER_POOL_ID}`]: session.getIdToken().getJwtToken()
          }
        });
        console.log(AWS.config);
        const s3 = new AWS.S3({
          apiVersion: '2006-03-01',
          params: {Bucket: albumBucketName},
          region: bucketRegion
        });

        filename = filename.trim();

        if (!filename) {
          return alert('Album names must contain at least one non-space character.');
        }
        if (filename.indexOf('/') !== -1) {
          return alert('Album names cannot contain slashes 3.');
        }

        // const params = {
        //   Body: body,
        //   Bucket: albumBucketName,
        //   Key: filename,
        //   ContentType: 'image/jpeg'
        // };

        delKey = cognitoUser.getUsername() + '/' + 'avatar.jpeg';

        s3.upload(
          {
            Key: delKey,
            Body: body,
            ContentType: 'image/jpeg',
            ACL: 'public-read'
          },
          (error, data) => {
            if (error) {
              console.log('There was an error uploading your photo: ', error.message);
              return;
            }
            console.log('Successfully uploaded photo.');
            console.log('A new image url: ', data.Location);

            const avatarHover: Element = document.getElementById('avatarHover');
            avatarHover && avatarHover.classList.add('hover');
            !avatarHover && console.warn('Cannot find element #avatarHover');

            const newImageUrl: string = data.Location;
            this.PhotoCreatedEvent.emit( newImageUrl );
          }
        );
      }
    );
  }

  /* DELETE PHOTO IN PERSONAL-DATA */
  deletePhoto() {
    const s3 = new AWS.S3({
      apiVersion: '2006-03-01',
      params: {Bucket: albumBucketName},
      region: bucketRegion
    });

    s3.deleteObject({Key: delKey}, (err, data) => {
      if (err) {
        console.log(err.message);
        return;
      }
      console.log('Successfully deleted photo');
      const avatarHover: Element = document.getElementById('avatarHover');
      avatarHover && avatarHover.classList.remove('hover');
      !avatarHover && console.warn('Cannot find element #avatarHover');

      this.PhotoRemovedEvent.emit();
    });
  }

  // rememberDevice(){
  //   const cognitoUser = this.cUtil.getCurrentUser();
  //   cognitoUser.setDeviceStatusRemembered({
  //     onSuccess: function (result) {
  //       console.log('call result: ' + result);
  //     },
  //     onFailure: function(err) {
  //       alert(err);
  //     }
  //   });
  // }

}
