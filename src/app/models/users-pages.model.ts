import { UserInfos } from './user-infos.model';

export class UsersPage {

  constructor(
    public totalCount: number,
    public lastPage: boolean,
    public items: UserInfos[]
  ) { }

}
