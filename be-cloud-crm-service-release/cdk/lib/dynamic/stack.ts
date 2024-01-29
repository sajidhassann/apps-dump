import {Stack, StackProps} from "aws-cdk-lib";
import {IVpc, Vpc} from "aws-cdk-lib/aws-ec2";
import {Repository} from "aws-cdk-lib/aws-ecr";
import {Construct} from "constructs";
import {Store} from "../store";
import {CrmMicroservice} from "./microservices/manager";
import {Table} from "aws-cdk-lib/aws-dynamodb";
import {DatabaseInstance} from "aws-cdk-lib/aws-rds";

interface CrmDynamicImportedResources {
    rds: DatabaseInstance;
    crmECR: Repository;
    mixpanelECR: Repository;
    table: { [key: string]: Table };
}

interface CrmDynamicStackProps extends StackProps {
    envName: string;
    resources: CrmDynamicImportedResources;
}

export class CrmDynamicStack extends Stack {
    private readonly store: Store;
    private readonly vpc: IVpc;
    private readonly envName: string;
    private readonly importedResources: CrmDynamicImportedResources;
    private readonly table: { [key: string]: Table };

    constructor(
        scope: Construct,
        id: string,
        props: CrmDynamicStackProps
    ) {
        super(scope, id, props);
        this.store = new Store(this, "crm-store");
        this.envName = props.envName;
        this.vpc = this.getVpc();
        this.importedResources = props.resources;
        this.table = props.resources.table;
        this.setupCrmMicroservice();
    }

    private setupCrmMicroservice() {

    const dbSecrets = this.store.getDBSecret(
        this.importedResources.rds.secret?.secretArn ?? ""
    );
    
    const service = new CrmMicroservice(
      this,
      "CrmMicroservice",
      {
        envName: this.envName,
        repositories: {
           crmECR: this.importedResources.crmECR,
           crmImporterECR: this.importedResources.mixpanelECR,
        },
        dbSecrets,
        vpc: this.vpc,
        table: this.table,
      }
    );
    this.store.set(
      `crm-container-role-${this.envName}`,
      service.role.roleArn
    );
  }

    private getVpc(): IVpc {
        return Vpc.fromLookup(this, "vpc", {
            isDefault: true,
        });
    }
}
