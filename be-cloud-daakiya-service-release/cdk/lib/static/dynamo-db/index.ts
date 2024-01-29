import { Construct } from "constructs";
import { RemovalPolicy } from "aws-cdk-lib";
import { Store } from "../../store";
import {
  AttributeType,
  BillingMode,
  GlobalSecondaryIndexProps,
  Table,
} from "aws-cdk-lib/aws-dynamodb";

export interface DynamoDbProps {
  readonly serviceName: string;
  readonly store: Store;
  readonly name: string;
  readonly envName: string;
  readonly partitionKey: {
    name: string;
    type: AttributeType;
  };
  readonly sortKey?: {
    name: string;
    type: AttributeType;
  };
  readonly globalSecondaryIndexes?: GlobalSecondaryIndexProps[];
}

export class DynamoDb extends Construct {
  readonly table: Table;
  readonly store: Store;
  readonly props: DynamoDbProps;

  constructor(scope: Construct, id: string, props: DynamoDbProps) {
    super(scope, id);
    this.store = props.store;
    this.props = props;
    this.table = this.createDynamoTable(props.envName, props.name);
    this.addParameters();
  }

  private addParameters() {
    this.store.set(
      `${this.props.serviceName}-${this.props.name}-arn`,
      this.table.tableArn
    );
    this.store.set(
      `${this.props.serviceName}-${this.props.name}Table`,
      this.table.tableName
    );
  }

  private createDynamoTable(envName: string, name: string): Table {
    const tableName = `${this.props.serviceName}-${name}-${envName}`;

    const table = new Table(this, tableName, {
      tableName: tableName,
      billingMode: BillingMode.PAY_PER_REQUEST,
      pointInTimeRecovery: true,
      removalPolicy:
        envName === "dev" ? RemovalPolicy.DESTROY : RemovalPolicy.RETAIN,
      partitionKey: this.props.partitionKey,
      sortKey: this.props.sortKey,
    });
    // this.addReadAndWriteCapacity(table);
    if (this.props.globalSecondaryIndexes) {
      this.props.globalSecondaryIndexes.map((globalIndex) => {
        table.addGlobalSecondaryIndex(globalIndex);
        // this.addReadAndWriteCapacityToIndex(globalIndex.indexName, table);
      });
    }

    return table;
  }

  private addReadAndWriteCapacityToIndex(name: string, table: Table) {
    const readCapacity = table.autoScaleGlobalSecondaryIndexReadCapacity(name, {
      minCapacity: 1,
      maxCapacity: 10,
    });
    readCapacity.scaleOnUtilization({ targetUtilizationPercent: 70 });
    const writeCapacity = table.autoScaleGlobalSecondaryIndexWriteCapacity(
      name,
      {
        minCapacity: 1,
        maxCapacity: 10,
      }
    );
    writeCapacity.scaleOnUtilization({
      targetUtilizationPercent: 70,
    });
  }

  private async addReadAndWriteCapacity(table: Table) {
    const readScaling = table.autoScaleReadCapacity({
      minCapacity: 1,
      maxCapacity: 10,
    });
    readScaling.scaleOnUtilization({
      targetUtilizationPercent: 70,
    });
    const writeScaling = table.autoScaleWriteCapacity({
      minCapacity: 1,
      maxCapacity: 10,
    });
    writeScaling.scaleOnUtilization({
      targetUtilizationPercent: 70,
    });
  }
}
