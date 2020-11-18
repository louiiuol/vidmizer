import { Injectable } from '@angular/core';
import { UserInfos } from '../../../models/user-infos.model';
import { UsersStore } from '../../utils/users.store';
import { UsersPage } from '../../../models/users-pages.model';
import { FormFactory } from '../../forms/form.factory';
import { ErrorMessages, SuccessMessages } from '../../forms/utils';
/**
 * Buisiness Service providing tools to manages Users
 */
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private users: UsersPage;
  readonly errorMsg = ErrorMessages;
  readonly successMsg = SuccessMessages;

  constructor(
    private usersStore: UsersStore,
    private forms: FormFactory) {
    this.users = this.usersStore.hasUsers() ? this.usersStore.getUsers() : new UsersPage(0, true, []);
  }

  /**
   * Add given user in localStorage IF the name nor the phone is already taken
   * @return true if the user was created
   */
  addUser(user: UserInfos): boolean {

    // Find In localstorage the given user, filtering by firstname & lastname OR by phone number
    const exist = this.usersStore.users?.items.find((current) => {
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
      this.users.items.push(user);
      this.usersStore.setUsers(this.users.items);
      this.users = this.usersStore.getUsers();
      this.forms.displayMessage(this.successMsg.add_user);
    }
    return !exist;
  }

  // Pagination coming ..
  getUsers(): UsersPage {
    return this.users;
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
}
