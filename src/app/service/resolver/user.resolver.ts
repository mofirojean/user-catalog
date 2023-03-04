import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Response } from 'src/app/interface/response';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<Response> {

  constructor(private userService: UserService){

  }

  // the underscore tell angular compiler that the property state is going to be there
  // but we are not going touse it
  resolve(route: ActivatedRouteSnapshot, _: RouterStateSnapshot): Observable<Response> {
    return this.userService.getUser(route.paramMap.get('uuid')!);
  }
}
