import {Stack, StackProps} from "aws-cdk-lib";
import {IVpc, Vpc} from "aws-cdk-lib/aws-ec2";
import {Repository} from "aws-cdk-lib/aws-ecr";
import {Construct} from "constructs";
import {Store} from "../store";
import {AppMicroservice} from "./microservices/app";
import {TableMap} from "../types/table.map.type";
import {DatabaseInstance} from "aws-cdk-lib/aws-rds";

interface ImportedResources {
  appECR: Repository;
  goAppECR: Repository;
  tables: TableMap;
  rds: DatabaseInstance;
}

interface DynamicStackProps extends StackProps {
  envName: string;
  resources: ImportedResources;

}

export class DynamicStack extends Stack {
  private readonly store: Store;
  private readonly vpc: IVpc;
  private readonly envName: string;
  private readonly importedResources: ImportedResources;
  private readonly tables: TableMap


  constructor(scope: Construct, id: string, props: DynamicStackProps) {
    super(scope, id, props);
    this.store = new Store(this, "store");
    this.importedResources = props.resources;
    this.envName = props.envName;
    this.tables = props.resources.tables

    this.vpc = this.getVpc();
    this.setupAppMicroservice();
  }

  private setupAppMicroservice() {
    const dbSecrets = this.store.getDBSecret(
      this.importedResources.rds.secret?.secretArn ?? ""
    );
    

    const service = new AppMicroservice(this, "App", {
      envName: this.envName,
      repositories: {
        appECR: this.importedResources.appECR,
        goAppECR: this.importedResources.goAppECR,
      },
      dbSecrets,
      vpc: this.vpc,
      tables: this.tables
    });
  }

  private getVpc(): IVpc {
    return Vpc.fromLookup(this, "vpc", {
      isDefault: true,
    });
  }
}

