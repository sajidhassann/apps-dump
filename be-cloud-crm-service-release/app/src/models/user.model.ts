export class User {
  readonly academicGroupID: string;
  readonly boardID: string;
  readonly id: string;
  readonly userGradeGroupID: string;
  readonly gradeName?: string;
  readonly userGradeGroupName?: string;
  readonly boardName?: string;

  constructor(data: User) {
    this.academicGroupID = data.academicGroupID ?? '';
    this.boardID = data.boardID ?? '';
    this.id = data.id ?? '';
    this.userGradeGroupID = data.userGradeGroupID;
    this.gradeName = data.gradeName ?? '';
    this.userGradeGroupName = data.userGradeGroupName ?? '';
    this.boardName = data.boardName ?? '';
  }
}
