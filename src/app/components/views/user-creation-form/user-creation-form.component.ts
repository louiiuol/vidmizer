import { Component } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { ErrorMessages, Patterns } from '../../../services/forms/utils';
import { FormFactory } from '../../../services/forms/form.factory';
import { UserForm } from '../../../services/forms/groups/user-form';
import { UserInfos } from '../../../models/user-infos.model';
import { UsersService } from '../../../services/domain/user-service/users.service';
import { RegionsService } from '../../../services/domain/region-service/regions.service';

@Component({
  selector: 'app-user-creation-form',
  templateUrl: './user-creation-form.component.html'
})
export class UserCreationFormComponent {

  usersForm: FormGroup;
  readonly errorMsg = ErrorMessages;
  readonly patterns = Patterns;
  regions = [];

  /** The following getters are used to ease calls of form fields in html & js documents */
  get lastname(): AbstractControl { return this.usersForm.get('lastname'); }
  get firstname(): AbstractControl { return this.usersForm.get('firstname'); }
  get phone(): AbstractControl { return this.usersForm.get('phone'); }
  get region(): AbstractControl { return this.usersForm.get('region'); }

  constructor( // Inject needed Services as private  when instantiating
    private forms: FormFactory,
    private userService: UsersService,
    private regionsService: RegionsService) {
      this.init();
  }

  /**
   * Send created object to UserService in order to save it.
   */
  addUser(): void {
    const success = this.userService.addUser(this.CreateUser());
    if (success) { this.reset(); }
  }

  reset(): void {
    this.usersForm.reset();
  }

  /**
   * Fetching regions from external service
   * & Building Form Group with FormFactory utils
   */
  private init(): void {
    this.regionsService.getAll()
      .subscribe((regions) => this.regions = regions, err => {
        console.error(this.errorMsg.unreachableApi, err);
        this.forms.displayMessage(this.errorMsg.unreachableApi);
      });
    this.usersForm = this.forms.builder().group(this.usersGroup());
  }

  /**
   * Generate a custom Material FormGroup from the Form Factory utils group
   */
  private usersGroup = (): any => ({
      lastname: UserForm.lastname,
      firstname: UserForm.firstname,
      phone: UserForm.phone,
      region: UserForm.region,
  })

  /**
   * Instantiate and return new UserInfos object
   * with form fields' value.
   */
  private CreateUser = (): UserInfos =>
      new UserInfos(this.lastname.value, this.firstname.value, this.phone.value, this.region.value.nom)

}
