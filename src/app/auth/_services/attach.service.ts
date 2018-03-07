import { Injectable } from '@angular/core';
import {_IDENTITY_POOL_ID, _USER_POOL_ID, _REGION} from '../../service/properties.service';
import {CognitoUtil} from '../../service/cognito.service';
import { environment } from '../../../environments/environment';


declare let AWSCognito: any;
const albumBucketName = environment.aws.s3.provider.bucket;
const bucketRegion = environment.aws.s3.provider.region;
const AWS = window.AWS;
let delKey = null;



@Injectable()
export class AttachService {

  constructor(public cUtil: CognitoUtil) { }

  /* CREATE PHOTO IN PERSONAL-DATA */
  createPhoto(filename, body, folderName, actionDone) {
    const cognitoUser = this.cUtil.getCurrentUser();
   return cognitoUser.getSession(function (err, session) {
      if (err) {
        console.log(err);
        return;
      }
      AWS.config.region = _REGION;
      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: _IDENTITY_POOL_ID,
        Logins: {[`cognito-idp.${_REGION}.amazonaws.com/${_USER_POOL_ID}`]: session.getIdToken().getJwtToken()}
      });
      // console.log(AWS.config);
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
      delKey = cognitoUser.getUsername() + '/docs/' + folderName + '/' + 'passport.jpeg';
     let format = filename.split('.');
      format = format[1].toUpperCase();
      format =  format === 'PDF' ? format = 'application/pdf' : format = 'image/jpeg';
      // delKey = cognitoUser.getUsername() + '/' + 'avatar.jpeg';
      s3.upload({
        Key: delKey,
        Body: body,
        ContentType: format,
        ACL: 'public-read'
      }, function (error, data) {
        if (error) {
          // console.log('There was an error uploading your photo: ', error.message);
          return;
        }
        // console.log('Successfully uploaded photo.');
        actionDone(data);
      });

    });
  }

  /* DELETE PHOTO IN PERSONAL-DATA */
  deletePhoto(imageKey, actionDone) {
    const s3 = new AWS.S3({
      apiVersion: '2006-03-01',
      params: {Bucket: albumBucketName},
      region: bucketRegion
    });

    s3.deleteObject({Key: imageKey}, function (err, data) {
      if (err) {
        // console.log(err.message);
        return;
      }
      // console.log('Successfully deleted photo');
      actionDone('Successfully deleted photo');
    });
  }




}






