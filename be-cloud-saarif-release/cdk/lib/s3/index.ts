import { Construct } from "constructs";
import { RemovalPolicy } from "aws-cdk-lib";
import { Bucket, BucketEncryption, HttpMethods } from "aws-cdk-lib/aws-s3";

export interface S3Props {
  envName: string;
  identifier: string;
}

export class S3 extends Construct {
  readonly bucket: Bucket;
  private readonly env:string

  constructor(scope: Construct, id: string, props: S3Props) {
    super(scope, id);
    this.env = props.envName
    this.bucket = this.createS3(props.envName, props.identifier);
  }
  

  private createS3(envName: string, name: string): Bucket {
    return new Bucket(this, "s3-bucket", {
      bucketName: `${name}-${this.env}`,
      publicReadAccess: true,
      removalPolicy:
        envName == "dev" ? RemovalPolicy.DESTROY : RemovalPolicy.RETAIN,
        cors: [
          {
            maxAge: 3000,
            allowedOrigins: ['*'],
            allowedHeaders: ['*'],
            allowedMethods: [HttpMethods.GET],
          },
        ],
        encryption: BucketEncryption.S3_MANAGED,

    });
  }
}
