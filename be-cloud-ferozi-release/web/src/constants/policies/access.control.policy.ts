export enum UserRole {
   ADMIN = 'ADMIN',
   SUPER_ADMIN = 'SUPER_ADMIN',
   UNKNOWN = 'UNKNOWN',
}

export const Policies: { urls: string[]; role: UserRole }[] = [
  {
    urls: ['/admin/ferozis'],
    role: UserRole.SUPER_ADMIN,
  },
  {
    urls: ['/admin/ferozis'],
    role: UserRole.ADMIN,
  },
];
