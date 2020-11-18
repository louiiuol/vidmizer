import {Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { UsersService } from '../../../services/domain/user-service/users.service';
import { UserInfos } from '../../../models/user-infos.model';

/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html'
})
export class UsersTableComponent {

  displayedColumns: string[] = ['lastname', 'firstname', 'phone', 'region', 'delete'];
  dataSource: MatTableDataSource<UserInfos>;
  users: UserInfos[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private usersService: UsersService) {
    // Assign the users subscription to the data source for the table to render
    this.usersService.users$.subscribe(users => {
      this.users = users;
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  delete(user: UserInfos): void {
    this.usersService.removeUser(user);
  }

}

