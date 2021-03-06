import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {CognitoUtil} from '../../service/cognito.service';
import {DoctorCrudService} from '../_services/doctor-crud.service';

@Injectable()
export class ProfileCheckGuardService implements CanActivate {
  constructor(private _router: Router, private cUtil: CognitoUtil,
              private  doctorCrudService: DoctorCrudService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.cUtil.getCurrentUser()) {
      return true;
    } else {
      this._router.navigate(['/index']);
      return false;
    }
  }
}
