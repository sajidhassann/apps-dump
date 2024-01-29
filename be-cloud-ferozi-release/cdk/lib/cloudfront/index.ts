import {
  CloudFrontWebDistribution,
  SecurityPolicyProtocol,
  ViewerCertificate,
  PublicKey,
  KeyGroup,
} from "aws-cdk-lib/aws-cloudfront";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";
import { Certificate } from "aws-cdk-lib/aws-certificatemanager";

interface CloudFrontProps {
  env: string;
  domain: string;
  bucket: Bucket;
  name: string;
  ceritficateARN: string;
}

export class CloudFrontCDN extends Construct {
  private readonly env: string;
  private readonly domain: string;
  private readonly name: string;
  private readonly ceritficateARN: string;
  private readonly bucket: Bucket;

  constructor(scope: Construct, id: string, props: CloudFrontProps) {
    super(scope, id);
    this.env = props.env;
    this.domain = props.domain;
    this.name = props.name;
    this.ceritficateARN = props.ceritficateARN;
    this.bucket = props.bucket;

    this.connectCloudFront();
  }

  private connectCloudFront(): CloudFrontWebDistribution {
    const cdn = new CloudFrontWebDistribution(
      this,
      `${this.name}CDN-${this.env}`,
      {
        originConfigs: [
          {
            s3OriginSource: {
              s3BucketSource: this.bucket,
            },
            behaviors: [
              {
                isDefaultBehavior: true,
              },
            ],
          },
        ],
        viewerCertificate: ViewerCertificate.fromAcmCertificate(
          Certificate.fromCertificateArn(this, "cert", this.ceritficateARN),
          {
            securityPolicy: SecurityPolicyProtocol.TLS_V1_2_2021,
            aliases: [this.domain],
          }
        ),
      }
    );

    return cdn;
  }
}
