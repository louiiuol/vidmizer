import { Injectable } from '@angular/core';
import { UserInfos } from '../../../models/user-infos.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {



  constructor() { }

  addUser(user: UserInfos): Observable<UserInfos> {
    console.log(user);
    return new Observable(null);
  }
}
