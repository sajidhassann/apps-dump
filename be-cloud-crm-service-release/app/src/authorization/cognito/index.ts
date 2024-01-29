const CognitoExpress = require('cognito-express');

interface CognitoHelperProps {
  userPool: string;
}

export class CognitoHelper {
  private readonly client;

  constructor(props: CognitoHelperProps) {
    this.client = new CognitoExpress({
      region: 'ap-southeast-1',
      cognitoUserPoolId: props.userPool,
      tokenUse: 'access', // Possible Values: access | id
      tokenExpiration: 3600000, // Up to default expiration of 1 hour (3600000 ms)
    });
  }

  validate(token: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.client.validate(token, (err, response) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(response);
      });
    });
  }
}
