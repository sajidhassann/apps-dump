import { Amplify } from 'aws-amplify';
import devConfig from './aws-exports-dev';
import releaseConfig from './aws-exports-release';
import { Config, Environment } from '../index';

function getConfig(): any {
   const env = Config.getEnv();
   console.log('AMPLIFY ENV: ', env);
   switch (env) {
      case Environment.RELEASE:
         return releaseConfig;
      case Environment.DEV:
         return devConfig;
   }

   return devConfig;
}

function loadAWS() {
   const config = getConfig();
   const updatedAwsConfig = {
      ...config,
      oauth: {
         ...config.oauth,
         redirectSignIn: `${window.location.origin}/`,
         redirectSignOut: `${window.location.origin}/`,
      },
   };

   Amplify.configure(updatedAwsConfig);
}

export default loadAWS;
