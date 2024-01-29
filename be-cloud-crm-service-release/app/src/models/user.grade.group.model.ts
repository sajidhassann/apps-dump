export class UserGradeGroup {
  readonly name: string;
  readonly grades: IGrade[];
  constructor(data: any) {
    this.name = data?.name ?? '';
    this.grades = data?.grades?.items ?? [];
  }
}

interface IGrade {
  name: string;
  board: IBoard;
}

interface IBoard {
  id: string;
  name: string;
}
