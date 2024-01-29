import { UserRole } from '../../../../constants'

enum DoubtSolverDesignation {
   INTERN = 'INTERN',
   TEACHER = 'TEACHER',
}

enum DoubtSolverStatus {
   ONLINE = 'ONLINE',
   OFFLINE = 'OFFLINE',
}

export interface UserDbModel {
   readonly id: string
   readonly fName: string
   readonly lName: string
   readonly email: string
   readonly role: UserRole
   readonly status: DoubtSolverStatus
   readonly designation: DoubtSolverDesignation
}
