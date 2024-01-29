import { CallStatus } from '@/application/constants/enums/callStatus'
import { LoginStatus } from '@/application/constants/enums/login.status.enum'
import { UserRole } from '@/application/constants/enums/user.role.enum'
import { Availability } from './availability'
import { ContentStatus } from './contentStatus'
import { MimeType } from './mime.type.enum'

export const Enums = {
    availability: Availability,
    contentStatus: ContentStatus,
    userRole: UserRole,
    loginStatus: LoginStatus,
    callStatus: CallStatus,
    mimeType: MimeType
}