import { AuthManager } from '../../services/auth';
import { UserRole } from '../../constants';
import { DatabaseManager } from '../../services/db';

export interface UserData {
    readonly id: string
    readonly fName?: string
    readonly lName?: string
    readonly email?: string
    readonly photo?: string
    readonly number?: string
    readonly role: UserRole
}

export class User {
    readonly id: string = '';
    readonly fName: string;
    readonly lName: string;
    readonly email: string;
    readonly photo: string;
    readonly number: string;
    role: UserRole; // TODO: manage modifier

    constructor(data: UserData) {
        this.id = data?.id;
        this.fName = data?.fName ?? '';
        this.lName = data?.lName ?? '';
        this.email = data?.email ?? '';
        this.photo = data?.photo ?? '';
        this.number = data?.number ?? '';
        this.role = data?.role ?? UserRole.UNKNOWN;
    }

    static async loadUser(): Promise<User> {
        console.log('GETTING USER');

        const authUser = await AuthManager.shared.getUser();
        // const databaseUser: DoubtSolverDB = await DatabaseManager.getDoubtSolver(authUser.id)

        const user = new User(authUser);

        // console.log("user", user)

        return user;
    }

    // loadUserStatus
    async loadUserData(): Promise<void> {
        const data = await DatabaseManager.user.retrieve.getUserData(this.id);

        if (!data) return;

        if (process.env.NODE_ENV === 'production') {
            this.role = data.role;
        } else {
            this.role = UserRole.SUPER_ADMIN;
        }
    }
}
