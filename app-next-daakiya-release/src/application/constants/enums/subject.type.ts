export enum SubjectType {
   OPTIONAL = 'OPTIONAL',
   COMPULSORY = 'COMPULSORY',
}

export const subjectTypeToString = {
   [SubjectType.OPTIONAL]: 'Optional',
   [SubjectType.COMPULSORY]: 'Coming Soon',
}
