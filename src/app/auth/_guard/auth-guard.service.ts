import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {CognitoUtil} from '../../service/cognito.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private _router: Router, private cUtil: CognitoUtil) {}

      canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        if (this.cUtil.getCurrentUser())  {
          return true;
        } else  {
          this._router.navigate(['/login']);
          return false;
        }
      }
}
