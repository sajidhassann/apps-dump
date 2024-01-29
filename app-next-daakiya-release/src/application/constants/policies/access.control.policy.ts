export enum UserRole {
   ADMIN = 'ADMIN',
   SUPER_ADMIN = 'SUPER_ADMIN',
   UNKNOWN = 'UNKNOWN',
}

export const Policies: { urls: string[]; role: UserRole }[] = [
   {
      urls: ['/admin', '/admin/notes', '/admin/academics'],
      role: UserRole.SUPER_ADMIN,
   },
   {
      urls: ['/admin', '/admin/notes'],
      role: UserRole.ADMIN,
   },
]
