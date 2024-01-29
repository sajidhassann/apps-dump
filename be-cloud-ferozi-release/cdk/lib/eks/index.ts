import { KubectlV25Layer } from "@aws-cdk/lambda-layer-kubectl-v25";
import { Lazy } from "aws-cdk-lib";
import { Cluster, ICluster, OpenIdConnectProvider } from "aws-cdk-lib/aws-eks";
import { AwsCliLayer } from "aws-cdk-lib/lambda-layer-awscli";
import { Construct } from "constructs";
import { Store } from "../store";

export interface EksProps {
    envName: string;
    store:Store
  }
  
  export class MaqEks extends Construct {
    private readonly env:string
    private readonly store: Store;
  
    constructor(scope: Construct, id: string, props: EksProps) {
      super(scope, id);
      this.env = props.envName
      this.store = props.store
    }


    getCluster(): ICluster{
    let providerArn = this.store.get(`/${this.env}/maqsad_cluster_oidc_arn`)
    
    const provider = OpenIdConnectProvider.fromOpenIdConnectProviderArn(this, 'Provider', Lazy.string({ produce: () => providerArn }));
     return Cluster.fromClusterAttributes(this, 'MyCluster', {
      clusterName: 'maqsad-cluster',
      openIdConnectProvider: provider,
      kubectlRoleArn: Lazy.string({ produce: () => this.store.get(`/${this.env}/maqsad_cluster_cdk_role`) }),
      kubectlLayer: new KubectlV25Layer(this, "kubectl"),
      awscliLayer: new AwsCliLayer(this, "awscli"),
    });
  }

  
}