import {Stack, StackProps} from "aws-cdk-lib";
import {AttributeType, Table} from "aws-cdk-lib/aws-dynamodb";
import {IVpc, Vpc} from "aws-cdk-lib/aws-ec2";
import {Repository} from "aws-cdk-lib/aws-ecr";
import {Bucket, BucketEncryption, HttpMethods} from 'aws-cdk-lib/aws-s3'
import {DatabaseInstance} from "aws-cdk-lib/aws-rds";
import {RDS} from "./rds";
import {Construct} from "constructs";
import {Store} from "../store";
import {DynamoDb} from "./dynamo-db";
import {ECR} from "./ecr";

interface StaticStackProps extends StackProps {
    envName: string;
}

export class StaticStack extends Stack {
    readonly table: { [key: string]: Table };
    readonly appECR: Repository;
    readonly mixpanelECR: Repository;
    readonly rds: DatabaseInstance;
    private readonly store: Store;
    private readonly vpc: IVpc;
    private readonly envName: string;

    constructor(scope: Construct, id: string, props: StaticStackProps) {
        super(scope, id, props);
        this.store = new Store(this, "crm-store");
        this.envName = props.envName;
        this.vpc = this.getVpc();
        this.rds = this.setupRDS();
        this.appECR = this.setupECR("be-cloud-crm");
        this.mixpanelECR = this.setupECR("be-cloud-crm-importer");
        this.table = this.setupTable();
        this.createS3Buckets();
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
          identifier: "saarif",
          envName: this.envName,
        }).instance;
      }
    
    private createS3Buckets(): Bucket {
        const bucketName = `maq-bucket-saarif-${this.envName}`;
        //MARK:- WEBSITE S3 Bucket
        const bucket = new Bucket(
            this, bucketName,
            {
                bucketName: bucketName,
                // serverAccessLogsBucket: logsBucket,
                // serverAccessLogsPrefix: 'destination-bucket-logs/',
                encryption: BucketEncryption.S3_MANAGED,
                publicReadAccess: true,
                // blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
                cors: [
                    {
                        maxAge: 3000,
                        allowedOrigins: ["*"],
                        allowedHeaders: ["*"],
                        allowedMethods: [HttpMethods.GET, HttpMethods.POST],
                    },
                ],
            }
        );

        this.store.set("S3_BUCKET_SAARIF", bucketName);

        return bucket;
    }

    private setupTable(): { [key: string]: Table } {
        const hubspotUserTable = new DynamoDb(this, "hubspot-user-table", {
            serviceName: "crm",
            envName: this.envName,
            store: this.store,
            name: "HubspotUser",
            partitionKey: {
                name: "userID",
                type: AttributeType.STRING,
            },
        });

        const tempTestTable = new DynamoDb(this, "tmp-test-table", {
            serviceName: "crm",
            envName: this.envName,
            store: this.store,
            name: "TempTest",
            partitionKey: {
                name: "id",
                type: AttributeType.STRING,
            },
            // globalSecondaryIndexes: [
            // 	{
            // 		indexName: "byRole",
            // 		partitionKey: {
            // 			name: "role",
            // 			type: AttributeType.STRING,
            // 		},
            // 	},
            // ],
        });

        const agentTable = new DynamoDb(this, "agent-table", {
            serviceName: "crm",
            envName: this.envName,
            store: this.store,
            name: "Agent",
            partitionKey: {
                name: "id",
                type: AttributeType.STRING,
            },
            globalSecondaryIndexes: [
                {
                    indexName: "byRole",
                    partitionKey: {
                        name: "role",
                        type: AttributeType.STRING,
                    },
                },
            ],
        });

        const cohortTable = new DynamoDb(this, "cohort-table", {
            serviceName: "crm",
            envName: this.envName,
            store: this.store,
            name: "Cohort",
            partitionKey: {
                name: "id",
                type: AttributeType.STRING,
            },
            globalSecondaryIndexes: [
                {
                    indexName: "byAdmin",
                    partitionKey: {
                        name: "adminID",
                        type: AttributeType.STRING,
                    },
                },
                {
                    indexName: "byAvailability",
                    partitionKey: {
                        name: "availability",
                        type: AttributeType.STRING,
                    },
                    sortKey: {
                        name: "bucketID",
                        type: AttributeType.STRING,
                    },
                },
            ],
        });

        const campaignBucketTable = new DynamoDb(this, "campaign-bucket-table", {
            serviceName: "crm",
            envName: this.envName,
            store: this.store,
            name: "CampaignBucket",
            partitionKey: {
                name: "id",
                type: AttributeType.STRING,
            },
            globalSecondaryIndexes: [
                {
                    indexName: "byAdmin",
                    partitionKey: {
                        name: "adminID",
                        type: AttributeType.STRING,
                    },
                },
            ],
        });

        const cohortCallTable = new DynamoDb(
            this,
            "cohort-call-table",
            {
                serviceName: "crm",
                envName: this.envName,
                store: this.store,
                name: "CohortCallTable",
                partitionKey: {
                    name: "id",
                    type: AttributeType.STRING,
                },
                globalSecondaryIndexes: [
                    {
                        indexName: "byCohort",
                        partitionKey: {
                            name: "cohortID",
                            type: AttributeType.STRING,
                        },
                    },
                    {
                        indexName: "byCohortByCreatedAt",
                        partitionKey: {
                            name: "cohortID",
                            type: AttributeType.STRING,
                        },
                        sortKey: {
                            name: 'createdAt',
                            type: AttributeType.NUMBER
                        }
                    },
                    {
                        indexName: "byAgent",
                        partitionKey: {
                            name: "agentID",
                            type: AttributeType.STRING,
                        },
                        sortKey: {
                            name: 'status',
                            type: AttributeType.STRING
                        }
                    },
                    {
                        indexName: "byAvailability",
                        partitionKey: {
                            name: "availability",
                            type: AttributeType.STRING,
                        },
                        sortKey: {
                            name: "bucketID",
                            type: AttributeType.STRING,
                        },
                    },
                ],
            }
        );

        const cohortCallLogTable = new DynamoDb(
            this,
            "cohort-call-log-table",
            {
                serviceName: "crm",
                envName: this.envName,
                store: this.store,
                name: "CohortCallLog",
                partitionKey: {
                    name: "id",
                    type: AttributeType.STRING,
                },
                globalSecondaryIndexes: [
                    {
                        indexName: "byAgent",
                        partitionKey: {
                            name: "agentID",
                            type: AttributeType.STRING,
                        },
                        sortKey: {
                            name: "cohortCallID",
                            type: AttributeType.STRING,
                        },
                    },
                    {
                        indexName: "byCohortCall",
                        partitionKey: {
                            name: "cohortCallID",
                            type: AttributeType.STRING,
                        },
                        sortKey: {
                            name: "agentID",
                            type: AttributeType.STRING,
                        },
                    },
                ],
            }
        );

        const campaignBucketCallTable = new DynamoDb(
            this,
            "campaign-bucket-call-table",
            {
                serviceName: "crm",
                envName: this.envName,
                store: this.store,
                name: "CampaignBucketCall",
                partitionKey: {
                    name: "id",
                    type: AttributeType.STRING,
                },
                globalSecondaryIndexes: [
                    {
                        indexName: "byBucket",
                        partitionKey: {
                            name: "bucketID",
                            type: AttributeType.STRING,
                        },
                    },
                    {
                        indexName: "byAgent",
                        partitionKey: {
                            name: "agentID",
                            type: AttributeType.STRING,
                        },
                        sortKey: {
                            name: 'status',
                            type: AttributeType.STRING
                        }
                    },
                ],
            }
        );

        const campaignBucketCallLogTable = new DynamoDb(
            this,
            "campaign-bucket-call-log-table",
            {
                serviceName: "crm",
                envName: this.envName,
                store: this.store,
                name: "CampaignBucketCallLog",
                partitionKey: {
                    name: "id",
                    type: AttributeType.STRING,
                },
                globalSecondaryIndexes: [
                    {
                        indexName: "byAgent",
                        partitionKey: {
                            name: "agentID",
                            type: AttributeType.STRING,
                        },
                        sortKey: {
                            name: "bucketCallID",
                            type: AttributeType.STRING,
                        },
                    },
                    {
                        indexName: "byBucketCall",
                        partitionKey: {
                            name: "bucketCallID",
                            type: AttributeType.STRING,
                        },
                        sortKey: {
                            name: "agentID",
                            type: AttributeType.STRING,
                        },
                    },
                ],
            }
        );

        const cohortAgentAssignmentTable = new DynamoDb(
            this,
            "cohort-agent-assignment-table",
            {
                serviceName: "crm",
                envName: this.envName,
                store: this.store,
                name: "CohortAgentAssignment",
                partitionKey: {
                    name: "id",
                    type: AttributeType.STRING,
                },
                globalSecondaryIndexes: [
                    {
                        indexName: "byBucket",
                        partitionKey: {
                            name: "bucketID",
                            type: AttributeType.STRING,
                        },
                        sortKey: {
                            name: "agentID",
                            type: AttributeType.STRING,
                        },
                    },
                    {
                        indexName: "byAgent",
                        partitionKey: {
                            name: "agentID",
                            type: AttributeType.STRING,
                        },
                        sortKey: {
                            name: "bucketID",
                            type: AttributeType.STRING,
                        },
                    },
                    {
                        indexName: "byAvailability",
                        partitionKey: {
                            name: "availability",
                            type: AttributeType.STRING,
                        },
                        sortKey: {
                            name: "bucketID",
                            type: AttributeType.STRING,
                        },
                    },
                ],
            }
        );

        const campaignBucketAgentAssignmentTable = new DynamoDb(
            this,
            "campaign-bucket-agent-assignment-table",
            {
                serviceName: "crm",
                envName: this.envName,
                store: this.store,
                name: "CampaignBucketAgentAssignment",
                partitionKey: {
                    name: "id",
                    type: AttributeType.STRING,
                },
                globalSecondaryIndexes: [
                    {
                        indexName: "byBucket",
                        partitionKey: {
                            name: "bucketID",
                            type: AttributeType.STRING,
                        },
                        sortKey: {
                            name: "agentID",
                            type: AttributeType.STRING,
                        },
                    },
                    // {
                    //     indexName: "byAdmin",
                    //     partitionKey: {
                    //         name: "adminID",
                    //         type: AttributeType.STRING,
                    //     },
                    //     sortKey: {
                    //         name: "bucketID",
                    //         type: AttributeType.STRING,
                    //     }
                    // },
                    {
                        indexName: "byAgent",
                        partitionKey: {
                            name: "agentID",
                            type: AttributeType.STRING,
                        },
                        sortKey: {
                            name: "bucketID",
                            type: AttributeType.STRING,
                        },
                    },
                ],
            }
        );

        const userWhatsAppChatTrackingTable = new DynamoDb(
            this,
            "user-whatsapp-chat-tracking-table",
            {
                serviceName: "crm",
                envName: this.envName,
                store: this.store,
                name: "UserWhatsAppChatTracking",
                partitionKey: {
                    name: "id",
                    type: AttributeType.STRING,
                },

            }
        );

        const ticketTable = new DynamoDb(
            this,
            "ticket-table",
            {
                serviceName: "crm",
                envName: this.envName,
                store: this.store,
                name: "Ticket",
                partitionKey: {
                    name: "id",
                    type: AttributeType.STRING,
                },
                globalSecondaryIndexes: [
                    {
                        indexName: "byStatus",
                        partitionKey: {
                            name: "status",
                            type: AttributeType.STRING,
                        }
                    },
                    {
                        indexName: "byPhoneNumber",
                        partitionKey: {
                            name: "phoneNumber",
                            type: AttributeType.STRING,
                        }
                    },
                    {
                        indexName: "byMode",
                        partitionKey: {
                            name: "mode",
                            type: AttributeType.STRING,
                        }
                    }
                ]
            }
        );

        const ticketAgentAssignmentTable = new DynamoDb(
            this,
            "ticket-agent-assignment-table",
            {
                serviceName: "crm",
                envName: this.envName,
                store: this.store,
                name: "TicketAgentAssignment",
                partitionKey: {
                    name: "id",
                    type: AttributeType.STRING,
                },
                globalSecondaryIndexes: [
                    {
                        indexName: "byAgent",
                        partitionKey: {
                            name: "agentID",
                            type: AttributeType.STRING,
                        }
                    },
                    {
                        indexName: "byTicket",
                        partitionKey: {
                            name: "ticketID",
                            type: AttributeType.STRING,
                        }
                    }
                ]
            }
        );

        const ticketMessageTable = new DynamoDb(
            this,
            "ticket-message-table",
            {
                serviceName: "crm",
                envName: this.envName,
                store: this.store,
                name: "TicketMessage",
                partitionKey: {
                    name: "id",
                    type: AttributeType.STRING,
                },
                globalSecondaryIndexes: [
                    {
                        indexName: "byTicket",
                        partitionKey: {
                            name: "ticketID",
                            type: AttributeType.STRING,
                        }
                    }
                ]
            }
        );

        return {
            HubspotUserTable: hubspotUserTable.table,

            CohortCallTable: cohortCallTable.table,
            CohortCallLogTable: cohortCallLogTable.table,
            CohortAgentAssignmentTable: cohortAgentAssignmentTable.table,
            // CohortCallLogTable: cohortCallLogTable.table,
            CohortTable: cohortTable.table,
            UserWhatsAppChatTrackingTable: userWhatsAppChatTrackingTable.table,
            TicketTable: ticketTable.table,
            TicketAgentAssignmentTable: ticketAgentAssignmentTable.table,
            TicketMessageTable: ticketMessageTable.table,

            CampaignBucketCallTable: campaignBucketCallTable.table,
            CampaignBucketAgentAssignmentTable: campaignBucketAgentAssignmentTable.table,
            CampaignBucketCallLogTable: campaignBucketCallLogTable.table,
            CampaignBucketTable: campaignBucketTable.table,

            AgentTable: agentTable.table, // TODO: remove from here and add to User Service

            tempTestTable: tempTestTable.table,

        };
    }
}
