import {Stack, StackProps} from "aws-cdk-lib";
import {IVpc, Vpc} from "aws-cdk-lib/aws-ec2";
import {Repository} from "aws-cdk-lib/aws-ecr";
import {Construct} from "constructs";
import {Store} from "../store";
import {ECR} from "./ecr";

import {AttributeType} from "aws-cdk-lib/aws-dynamodb";
import {APP_NAME} from "../../bin/app";
import {DynamoDb} from "./dynamo-db";
import {TableMap} from "../types/table.map.type";
import {DatabaseInstance} from "aws-cdk-lib/aws-rds";
import {RDS} from "./rds";

interface StaticStackProps extends StackProps {
  envName: string;
}
export class StaticStack extends Stack {
  readonly appECR: Repository;
  readonly goAppECR: Repository;
  readonly tables: TableMap;
  readonly rds: DatabaseInstance;
  private readonly store: Store;
  private readonly vpc: IVpc;
  private readonly envName: string;

  constructor(scope: Construct, id: string, props: StaticStackProps) {
    super(scope, id, props);
    this.store = new Store(this, `${APP_NAME.toLowerCase()}-store`);
    this.envName = props.envName;
    this.vpc = this.getVpc();
    this.appECR = this.setupECR(`be-cloud-${APP_NAME.toLowerCase()}-service`);
    this.goAppECR = this.setupECR(`be-cloud-${APP_NAME.toLowerCase()}-go-service`);
    this.tables = this.setupTables();
    this.rds = this.setupRDS();
  }

  private setupECR(name: string): Repository {
    return new ECR(this, `${name}-ecr`, {
      envName: this.envName,
      identifier: name,
    }).ecr;
  }

  private getVpc(): IVpc {
    return Vpc.fromLookup(this, "vpc", {
      isDefault: true,
    });
  }

  private setupRDS(): DatabaseInstance {
    return new RDS(this, "rds", {
      vpc: this.vpc,
      identifier: APP_NAME.toLowerCase(),
      envName: this.envName,
    }).instance;
  }

  private setupTables(): TableMap {
    const userTokenTable = new DynamoDb(this, "user-token-table", {
      serviceName: `${APP_NAME.toLowerCase()}-service`,
      envName: this.envName,
      store: this.store,
      name: "UserToken",
      partitionKey: {
        name: "id",
        type: AttributeType.STRING,
      },
      globalSecondaryIndexes: [
        {
          indexName: "byUserID",
          partitionKey: {
            name: "userID",
            type: AttributeType.STRING,
          },
          sortKey: {
            name: "createdAt",
            type: AttributeType.NUMBER,
          },
        },
      ],
    });

    const cohortTable = new DynamoDb(this, "cohort-table", {
      serviceName: `${APP_NAME.toLowerCase()}-service`,
      envName: this.envName,
      store: this.store,
      name: "Cohort",
      partitionKey: {
        name: "id",
        type: AttributeType.STRING,
      },
    });

    const cohortUserTable = new DynamoDb(this, "cohort-user-table", {
      serviceName: `${APP_NAME.toLowerCase()}-service`,
      envName: this.envName,
      store: this.store,
      name: "CohortUser",
      partitionKey: {
        name: "id",
        type: AttributeType.STRING,
      },
      globalSecondaryIndexes: [
        {
          indexName: "byCohortID",
          partitionKey: {
            name: "cohortID",
            type: AttributeType.STRING,
          },
        },
      ],
    });

    const userTokensTable = new DynamoDb(this, "user-tokens-table", {
      serviceName: `${APP_NAME.toLowerCase()}-service`,
      envName: this.envName,
      store: this.store,
      name: "UserTokens",
      partitionKey: {
        name: "token",
        type: AttributeType.STRING,
      },
      globalSecondaryIndexes: [
        {
          indexName: "byUserID",
          partitionKey: {
            name: "userID",
            type: AttributeType.STRING,
          },
          sortKey: {
            name: "updatedAt",
            type: AttributeType.NUMBER,
          },
        },
      ],
    });

    return {
      USER_TOKEN_TABLE: userTokenTable.table,
      USER_TOKENS_TABLE: userTokensTable.table,
      COHORT_TABLE: cohortTable.table,
      COHORT_USER_TABLE: cohortUserTable.table,
    };
  }
}
