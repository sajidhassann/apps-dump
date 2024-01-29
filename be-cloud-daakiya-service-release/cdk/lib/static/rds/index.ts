import {
  InstanceClass,
  InstanceSize,
  InstanceType,
  IVpc,
  Peer,
  Port,
  SecurityGroup,
  SubnetType,
} from "aws-cdk-lib/aws-ec2";
import {Construct} from "constructs";
import {
  Credentials,
  DatabaseInstance,
  DatabaseInstanceEngine,
  ParameterGroup,
  PostgresEngineVersion,
  StorageType,
} from "aws-cdk-lib/aws-rds";
import {Duration, RemovalPolicy} from "aws-cdk-lib";

export interface RDSProps {
  vpc: IVpc;
  identifier: string;
  envName: string;
}

export class RDS extends Construct {
  readonly instance: DatabaseInstance;
  private readonly env: string;

  constructor(scope: Construct, id: string, props: RDSProps) {
    super(scope, id);
    this.instance = this.createRDS(props.vpc, props.identifier);
    this.env = props.envName;
  }

  private getInstance(): InstanceType {
    if (this.env == "dev") {
      return InstanceType.of(InstanceClass.T3, InstanceSize.MICRO);
    }
    return InstanceType.of(InstanceClass.T3, InstanceSize.MICRO);
  }

  private createParameterGroup(): ParameterGroup {
    const parameterGroup = new ParameterGroup(this, "ParameterGroup", {
      engine: DatabaseInstanceEngine.postgres({
        version: PostgresEngineVersion.VER_15_3,
      }),
      parameters: {},
    });
    return parameterGroup;
  }

  private createRDS(vpc: IVpc, identifier: string): DatabaseInstance {
    const securityGroup = new SecurityGroup(this, "rds-sg", {
      vpc: vpc,
    });
    securityGroup.addIngressRule(Peer.anyIpv4(), Port.tcp(5432));

    securityGroup.addEgressRule(Peer.anyIpv4(), Port.allTraffic());

    const dbInstance = new DatabaseInstance(this, "db-instance", {
      instanceIdentifier: identifier,
      vpc: vpc,
      vpcSubnets: {
        subnetType: SubnetType.PUBLIC,
      },
      engine: DatabaseInstanceEngine.postgres({
        version: PostgresEngineVersion.VER_15_3,
      }),
      parameterGroup: this.createParameterGroup(),
      instanceType: this.getInstance(),
      credentials: Credentials.fromGeneratedSecret(identifier),
      multiAz: false,
      storageType: StorageType.GP2,
      allocatedStorage: 20,
      maxAllocatedStorage: 100,
      allowMajorVersionUpgrade: false,
      autoMinorVersionUpgrade: true,
      backupRetention: Duration.days(0),
      deleteAutomatedBackups: true,
      removalPolicy:
        this.env == "dev" ? RemovalPolicy.DESTROY : RemovalPolicy.RETAIN,
      databaseName: identifier,
      publiclyAccessible: false,
      securityGroups: [securityGroup],
    });

    return dbInstance;
  }
}
