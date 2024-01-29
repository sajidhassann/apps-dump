import loadAWS from './aws';

export function loadConfig() {
   loadAWS();
}

export enum Environment {
   RELEASE = 'release',
   DEV = 'dev',
}

enum ProductionBranch {
   RELEASE = 'release',
   DEV = 'dev',
}

export class Config {
   static getEnv(): string {
      // TODO: have a look at the cases, names should have _ prefix
      switch (process.env.NEXT_PUBLIC_ENV) {
         case ProductionBranch.RELEASE: {
            return Environment.RELEASE;
         }

         case ProductionBranch.DEV: {
            return Environment.DEV;
         }
         default: {
            console.warn(
               'Unable to extract environment from branch name, falling back to default'
            );
            return Environment.DEV;
         }
      }
   }
}
