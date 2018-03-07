import {Injectable} from '@angular/core';
import {ChatCallback, CognitoUtil, LoggedInCallback} from './cognito.service';
import {_IDENTITY_POOL_ID, _REGION, _USER_POOL_ID, _CLIENT_ID} from './properties.service';
import 'aws-sdk/dist/aws-sdk';
import { environment } from '../../environments/environment';


const albumBucketName = environment.aws.s3.provider.bucket;
const bucketRegion = environment.aws.s3.provider.region;
const IdentityPoolId = _IDENTITY_POOL_ID;
const AWS = window.AWS;


@Injectable()
export class ChatService {
  fileurl: string;
  fixed;

  constructor(public cUtil: CognitoUtil) {
  }


  fileUploadChat(filename, body, chatCallback: ChatCallback, result) {

    const cognitoUser = this.cUtil.getCurrentUser();
    console.log(cognitoUser);
    cognitoUser.getSession(function (err, session) {
      if (err) {
        alert(err);
        return;
      }
      AWS.config.region = environment.aws.cognito.region;
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
      console.log(filename);

      s3.upload({
        Key: cognitoUser.getUsername() + '/' + filename,
        Body: body,
        ContentType: 'image/jpeg',
        ACL: 'public-read'
      }, function (error, data) {
        if (error) {
          console.log('There was an error uploading your file: ', error.message);
          return;
        }
        console.log('Successfully uploaded file .');
        this.fileurl = data.Location;
        chatCallback.ChatCallback(this.fileurl, null);
        return;
      }).on('httpUploadProgress', function(event) {
        const upLoadFile = ((event.loaded * 100) / event.total);
        this.fixed = (upLoadFile.toFixed(0)) + '%';
        result((upLoadFile.toFixed(0)) + '%');
      });


    });
  }







}
