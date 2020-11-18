import { Component, OnDestroy } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { ErrorMessages, Patterns, SuccessMessages } from '../../../services/forms/utils';
import { FormFactory } from '../../../services/forms/form.factory';
import { UserForm } from '../../../services/forms/groups/user-form';
import { UserInfos } from '../../../models/user-infos.model';
import { UsersService } from '../../../services/domain/user-service/users.service';
import { RegionsService } from '../../../services/domain/region-service/regions.service';

@Component({
  selector: 'app-user-creation-form',
  templateUrl: './user-creation-form.component.html',
  styleUrls: ['./user-creation-form.component.scss']
})
export class UserCreationFormComponent implements OnDestroy {

  private destroyed$ = new Subject(); // Subject to unsubscribe to all present Subscription at once
  usersForm: FormGroup;
  readonly errorMsg = ErrorMessages;
  readonly patterns = Patterns;
  regions = [];

  get lastname(): AbstractControl { return this.usersForm.get('lastname'); }
  get firstname(): AbstractControl { return this.usersForm.get('firstname'); }
  get phone(): AbstractControl { return this.usersForm.get('phone'); }
  get region(): AbstractControl { return this.usersForm.get('region'); }

  constructor(private forms: FormFactory, private userService: UsersService, private regionsService: RegionsService) {
      this.init();
  }

  ngOnDestroy(): void {
      this.destroyed$.next();
  }

  addUser(): void {
      this.userService.addUser(this.CreateUser()).pipe(takeUntil(this.destroyed$))
        .subscribe(() => this.forms.displayMessage(SuccessMessages.add_user),
          (error: any) => this.forms.displayMessage(error));
  }

  reset(): void {
    this.usersForm.reset();
  }

  private init(): void {
    this.usersForm = this.forms.builder().group(this.usersGroup());
    this.regionsService.getAll().pipe(takeUntil(this.destroyed$))
      .subscribe((regions) => this.regions = regions, err => console.error('error fetching regions: ', err));
  }

  private usersGroup = (): any => ({
      lastname: UserForm.lastname,
      firstname: UserForm.firstname,
      phone: UserForm.phone,
      region: UserForm.region,
  })

  private CreateUser = (): UserInfos =>
      new UserInfos(this.lastname.value, this.firstname.value, this.phone.value, this.region.value)

}
