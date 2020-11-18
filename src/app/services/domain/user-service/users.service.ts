import { Injectable } from '@angular/core';
import { UserInfos } from '../../../models/user-infos.model';
import { UsersPage } from '../../../models/users-pages.model';
import { FormFactory } from '../../forms/form.factory';
import { ErrorMessages, SuccessMessages } from '../../forms/utils';
import { BehaviorSubject, Observable } from 'rxjs';
/**
 * Buisiness Service providing tools to manages Users
 */
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  readonly errorMsg = ErrorMessages;
  readonly successMsg = SuccessMessages;
  private readonly storeKey = 'vidmizer-users';

  private readonly current = new BehaviorSubject<UserInfos[]>([]);
  public users$: Observable<UserInfos[]> = this.current.asObservable();

  constructor(private forms: FormFactory) {
    this.current.next(this.hasUsers() ? this.getLocalUsers() : []);
  }

  /**
   * Add given user in localStorage IF the name nor the phone is already taken
   * @return true if the user was created
   */
  addUser(user: UserInfos): boolean {

    // Find In localstorage the given user, filtering by firstname & lastname OR by phone number
    const exist = this.current.value.find((current) => {
      if (this.uniqueName(current, user)) {
        this.forms.displayMessage(this.errorMsg.uniqueName);
        return current;
      } else if (this.uniquePhone(current, user)) {
        this.forms.displayMessage(this.errorMsg.uniquePhone);
        return current;
      }
    });

    // If no one is found, we can add the user to localStorage and update all.
    if (!exist) {
      this.current.value.push(user);
      this.current.next(this.setLocalUsers([...this.current.value]));
      this.forms.displayMessage(this.successMsg.add_user);
    }
    return !exist;
  }

  /**
   * Removes given User from local storage and update current subject
   */
  removeUser(user: UserInfos): void {
    const updated =
      this.setLocalUsers(this.current.value.filter(current =>
        current.phone !== user.phone));
    this.current.next(updated);
  }

  /**
   * Check if both user have the same firstname & lastname
   */
  private uniqueName = (current: UserInfos, user: UserInfos) =>
    (current.firstname === user.firstname) && (current.lastname === user.lastname)

  /**
   * Check if both user have the same phone number
   */
  private uniquePhone = (current: UserInfos, user: UserInfos) =>
    current.phone === user.phone

    hasUsers = (): boolean =>
    !!window.localStorage.getItem(this.storeKey)

  /**
   * Retrieve local storage as custom Pagination object
   */
  private getLocalUsers = (): UserInfos[] =>
    JSON.parse(window.localStorage.getItem(this.storeKey))

  /**
   * Update current local storage with given list of users
   * @returns updated Users list
   */
  private setLocalUsers = (users: UserInfos[]): UserInfos[] => {
    window.localStorage.setItem(this.storeKey, JSON.stringify(users));
    return this.getLocalUsers();
  }

}
