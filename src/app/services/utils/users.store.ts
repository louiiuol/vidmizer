import { Injectable } from '@angular/core';
import { UsersPage } from '../../models/users-pages.model';
import { UserInfos } from '../../models/user-infos.model';

/**
 * Provides Store to check, get or update users
 * in local storage
 */
@Injectable({ providedIn: 'root' })
export class UsersStore {

  private readonly storeKey = 'vidmizer-users';
  users: UsersPage;

  constructor() {
    this.users = this.hasUsers() ? this.getUsers() : new UsersPage(0, true, []);
  }

  /**
   * Check if localStorage is empty
   */
  hasUsers = (): boolean =>
    !!window.localStorage.getItem(this.storeKey)

  /**
   * Retrieve local storage as custom Pagination object
   */
  getUsers = (): UsersPage =>
    JSON.parse(window.localStorage.getItem(this.storeKey))

  /**
   * Update current local storage with given list of users
   */
  setUsers = (users: UserInfos[]): void =>
    window.localStorage.setItem(this.storeKey, JSON.stringify(new UsersPage(users.length, users.length < 20, users)))

}
