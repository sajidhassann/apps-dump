import { UserRole } from '@/application/constants/enums/user.role.enum'

export const policies: { [key: string]: string[] } = {
    [UserRole.ADMIN]: ['/admin'],
    [UserRole.SUPER_ADMIN]: ['/admin'],
    [UserRole.AGENT]: ['/agent'],
}


