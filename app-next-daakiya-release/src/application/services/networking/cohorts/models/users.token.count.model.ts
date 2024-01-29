export class UsersTokenCountModel {
    readonly count: number;

    constructor(data: UsersTokenCountModel) {
        this.count = data.count ?? 0;
    }
}
