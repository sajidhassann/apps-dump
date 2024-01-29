import { Stack, StackProps } from "aws-cdk-lib";
import { Repository } from "aws-cdk-lib/aws-ecr";

import { AttributeType, Table } from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";
import { Store } from "./store";
import { DynamoDb } from "./dynamo-db";
import { ECR } from "./ecr";
import { MaqEks } from "./eks";
import { Bucket, IBucket } from "aws-cdk-lib/aws-s3";

interface StaticStackProps extends StackProps {
  envName: string;
  //
}

export class StaticStack extends Stack {
  private readonly store: Store;
  private readonly envName: string;
  readonly tables: { [key: string]: Table };
  readonly repo: Repository[] = []

  constructor(scope: Construct, id: string, props: StaticStackProps) {
    super(scope, id, props);
    this.store = new Store(this, "store");
    this.envName = props.envName;
    this.repo.push(this.setupECR("be-cloud-saarif-typebot-middleware-service"));

    this.setupServiceAccount()
  }

  private setupECR(name: string): Repository {
    return new ECR(this, `${name}-ecr`, {
      envName: this.envName,
      identifier: name,
    }).ecr;
  }

  private getAppBucket(name:string): IBucket{
    const s3 = Bucket.fromBucketName(this, 'ExistingBucket', name);
    return s3
  }

  private setupServiceAccount(){    
    const cluster = new MaqEks(this,"eks-cluster",{
      envName:this.envName,
      store:this.store
    }).getCluster()
    const serviceAccount = cluster.addServiceAccount('serviceaccount',{
      name:"maq-saarif-service-account",
      namespace: "apps"
    })
    this.repo.forEach(repo => repo.grantRead(serviceAccount))
    const bucket = this.getAppBucket(`maq-bucket-saarif-${this.envName}`)
    bucket.grantReadWrite(serviceAccount)
  }


  // private setupTables(): { [key: string]: Table } {
  //   const userIdentity = new DynamoDb(this, "user-identity-table", {
  //     serviceName: "appService",
  //     envName: this.envName,
  //     store: this.store,
  //     name: "UserIdentity",
  //     partitionKey: {
  //       name: "userID",
  //       type: AttributeType.STRING,
  //     },
  //   });

  //   const userProperties = new DynamoDb(this, "user-properties-table", {
  //     serviceName: "appService",
  //     envName: this.envName,
  //     store: this.store,
  //     name: "UserProperties",
  //     partitionKey: {
  //       name: "userID",
  //       type: AttributeType.STRING,
  //     },
  //   });

  //   return {
  //     UserIdentityTable: userIdentity.table,
  //     UserPropertiesTable: userProperties.table,
  //   };
  // }
  
}
