import { Secret } from "aws-cdk-lib/aws-ecs";
import { StringParameter } from "aws-cdk-lib/aws-ssm";
import { Construct } from "constructs";
import { Secret as SSMSecret } from "aws-cdk-lib/aws-secretsmanager";

interface DBCredentials {
  username: string;
  password: string;
  host: string;
  dbname?: string;
}

export class Store extends Construct {
  getSecret(name: string): Secret {
    const secret = SSMSecret.fromSecretNameV2(this, `${name}-secret`, name);
    return Secret.fromSecretsManager(secret);
  }
  getStringSecret(name: string): string {
    return SSMSecret.fromSecretNameV2(
      this,
      `${name}-secret`,
      name
    ).secretValue.toString();
  }

  getDBSecret(name: string): DBCredentials {
    const secret = SSMSecret.fromSecretPartialArn(this, `${name}-secret`, name);

    return {
      username: secret.secretValueFromJson("username").toString(),
      password: secret.secretValueFromJson("password").toString(),
      host: secret.secretValueFromJson("host").toString(),
      dbname: secret?.secretValueFromJson("dbname")?.toString(),
    };
  }
  get(name: string): string {
    return StringParameter.valueFromLookup(this, name);
  }

  set(name: string, value: string): StringParameter {
    return new StringParameter(this, name, {
      parameterName: name,
      stringValue: value,
    });
  }
}
