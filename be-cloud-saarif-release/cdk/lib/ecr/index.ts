import { Construct } from "constructs";
import { RemovalPolicy } from "aws-cdk-lib";
import { Repository } from "aws-cdk-lib/aws-ecr";

export interface ECRProps {
  envName: string;
  identifier: string;
}

export class ECR extends Construct {
  readonly ecr: Repository;

  constructor(scope: Construct, id: string, props: ECRProps) {
    super(scope, id);
    this.ecr = this.createECR(props.envName, props.identifier);
  }

  private createECR(envName: string, name: string): Repository {
    return new Repository(this, `${name}-${envName}`, {
      repositoryName: name,
      imageScanOnPush: true,
      removalPolicy:
        envName == "dev" ? RemovalPolicy.DESTROY : RemovalPolicy.RETAIN,
    });
  }
}
