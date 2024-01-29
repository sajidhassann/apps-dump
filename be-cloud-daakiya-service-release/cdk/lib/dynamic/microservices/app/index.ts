import {StackProps} from "aws-cdk-lib";
import {IVpc} from "aws-cdk-lib/aws-ec2";
import {Repository} from "aws-cdk-lib/aws-ecr";
import {Policy, PolicyStatement, Role, ServicePrincipal} from "aws-cdk-lib/aws-iam";
import {Construct} from "constructs";
import {Store} from "../../../store";
import {AppContainerProps, MAQService, ScalingCapacity} from "maq-ecs-construct";
import {APP_NAME} from "../../../../bin/app";
import {TableMap} from "../../../types/table.map.type";
import {StringMap} from "../../../types/string.map.type";
import {DBCredentials} from "../../../types/db.credentials.type";
import {Secret} from "aws-cdk-lib/aws-ecs";

interface AppMicroserviceProps extends StackProps {
  envName: string;
  vpc: IVpc;
  repositories: {
    appECR: Repository;
    goAppECR: Repository;
  };
  tables: TableMap;
  dbSecrets: DBCredentials;
}

export class AppMicroservice extends Construct {
  readonly appECR: Repository;
  readonly goAppECR: Repository;
  readonly app: MAQService;
  readonly role: Role;
  private readonly store: Store;
  private readonly vpc: IVpc;
  private readonly envName: string;
  private readonly tables: TableMap;
  private readonly dbSecrets: DBCredentials;
  private readonly fcmSecret: Secret;

  constructor(scope: Construct, id: string, props: AppMicroserviceProps) {
    super(scope, id);
    this.store = new Store(this, "store");
    this.envName = props.envName;
    this.vpc = props.vpc;
    this.appECR = props.repositories.appECR;
    this.goAppECR = props.repositories.goAppECR;
    this.tables = props.tables;
    this.dbSecrets = props.dbSecrets;
    this.role = this.getRole();
    this.fcmSecret = this.store.getSecret('google/firebase/fcm')
    this.app = this.setupAppService(this.fcmSecret);

  }

  private get appContainer(): AppContainerProps {
    const serviceName = `${APP_NAME.toLowerCase()}-service`;
    const tableNamesMap = Object.entries(this.tables).reduce(
      (map: StringMap, [key, table]) => {
        map[key] = table.tableName;
        return map;
      },
      {}
    );

    return {
      id: serviceName,
      containerPorts: [3000],
      softLimit: 150,
      repository: this.appECR,
      hostname: serviceName,
      environment: {
        ENV_NAME: this.envName,
        DATABASE_URL: `postgresql://${this.dbSecrets.username}:${this.dbSecrets.password}@${this.dbSecrets.host}:${this.dbSecrets.port}/${this.dbSecrets.dbname}`,
        ...tableNamesMap,
        BROKER: this.store.get('backend-streams-data-broker-bootstrap-brokers'),
      },
      secrets: {
        FCM_KEY: this.fcmSecret,
      },
    };
  }
  private get goAppContainer(): AppContainerProps {
    const serviceName = `${APP_NAME.toLowerCase()}-go-service`;

    return {
      id: serviceName,
      containerPorts: [8080],
      softLimit: 150,
      repository: this.goAppECR,
      hostname: serviceName,
      environment: {
        ENV_NAME: this.envName,
        DATABASE_URL: `postgresql://${this.dbSecrets.username}:${this.dbSecrets.password}@${this.dbSecrets.host}:${this.dbSecrets.port}/${this.dbSecrets.dbname}`,
        DATABASE_USER: this.dbSecrets.username,
        DATABASE_NAME: this.dbSecrets.dbname,
        DATABASE_PASSWORD: this.dbSecrets.password,
        DATABASE_HOST: this.dbSecrets.host,
        DATABASE_PORT: this.dbSecrets.port,
        BROKER: this.store.get('backend-streams-data-broker-bootstrap-brokers'),
      },
      secrets: {
        FCM_KEY: this.fcmSecret,
      },
    };
  }

  private get scalingCapacity(): ScalingCapacity {
    return {
      desiredCount: 1,
      minCapacity: 100,
      maxCapacity: 200,
    };
  }

  private getTablePermissions(): string[] {
    const tables = Object.values(this.tables ?? {});
    return [
      ...tables.map((table) => table.tableArn),
      ...tables.map((table) => table.tableArn + "/index/*"),
    ];
  }

  private getRole(): Role {
    const role = new Role(this, "TaskDefinitionTaskRole", {
      assumedBy: new ServicePrincipal("ecs-tasks.amazonaws.com"),
    });

    role.attachInlinePolicy(
      new Policy(this, `${APP_NAME}-policy-${this.envName}`, {
        statements: [
          new PolicyStatement({
            actions: ["dynamodb:*"],
            resources: this.getTablePermissions(),
          }),
        ],
      })
    );
    return role;
  }

  private setupAppService(fcmSecret: Secret): MAQService {

    return new MAQService(this, `${APP_NAME.toLowerCase()}-ecs`, {
      vpc: this.vpc,
      loadBalancer: {
        isSecure: true,
        listenerArn: this.store.get(
          `Maqsad-App-${this.envName}-ALB-HTTPS-Listener-ARN`
        ),
      },
      cluster: {
        clusterArn: this.store.get("maqsad-app-cluster-arn"),
        clusterName: this.store.get("maqsad-app-cluster-name"),
      },
      loggingURL: this.store.get(`Maqsad-App-${this.envName}-internal-ALB-URL`),
      serviceName: `${APP_NAME.toLowerCase()}-service`,
      healthCheckPath: "/health",
      targetGroup: {
        priority: 119,
        hostnames: [
          `cloud-${APP_NAME.toLowerCase()}-dev.maqsad.net`,
          `cloud-${APP_NAME.toLowerCase()}.maqsad.net`,
        ],
      },
      scalingCapacity: this.scalingCapacity,
      containers: [this.appContainer, this.goAppContainer],
      taskRole: this.role,
    });
  }
}
