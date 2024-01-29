
export class FeroziStatEntinty {
  total: number;
  acknowledged: number;

  constructor(totalCount?: number, acknowledgedCount?: number) {
    this.total = totalCount ?? 0;
    this.acknowledged = acknowledgedCount ?? 0;
  }
}
