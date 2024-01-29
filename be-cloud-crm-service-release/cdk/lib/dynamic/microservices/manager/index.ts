import {StackProps} from 'aws-cdk-lib';
import {Table} from 'aws-cdk-lib/aws-dynamodb';
import {IVpc} from 'aws-cdk-lib/aws-ec2';
import {Repository} from 'aws-cdk-lib/aws-ecr';
import {ManagedPolicy, Policy, PolicyStatement, Role, ServicePrincipal,} from 'aws-cdk-lib/aws-iam';
import {Construct} from 'constructs';
import {AppContainerProps, MAQService, ScalingCapacity,} from 'maq-ecs-construct';
import {DBCredentials} from '../../../interfaces/db.credentials.interface';
import {Store} from '../../../store';

// interface DBCredentials {
//     username: string;
//     password: string;
//     host: string;
//     dbname?: string;
// }

interface CrmMicroserviceProps extends StackProps {
	envName: string;
	vpc: IVpc;
	repositories: {
		crmECR: Repository;
		crmImporterECR: Repository;
	};
	table: { [key: string]: Table };
	dbSecrets: DBCredentials;
}

export class CrmMicroservice extends Construct {
	readonly middlewareECR: Repository;
	readonly importerECR: Repository;
	readonly middleware: MAQService;
	readonly role: Role;
	private readonly store: Store;
	private readonly vpc: IVpc;
	private readonly dbSecrets: DBCredentials;
	private readonly envName: string;
	private readonly table: { [key: string]: Table };

	constructor( scope: Construct, id: string, props: CrmMicroserviceProps ) {
		super( scope, id );
		this.store = new Store( this, 'crm-store' );
		this.envName = props.envName;
		this.vpc = props.vpc;
		this.table = props.table;
		this.role = this.getRole();
		this.middlewareECR = props.repositories.crmECR;
		this.importerECR = props.repositories.crmImporterECR;
		this.dbSecrets = props.dbSecrets;
		this.middleware = this.setupCrmService();
	}

	private get importerContainer(): AppContainerProps {
		return {
			id: 'crm-importer',
			containerPorts: [ 8080 ],
			softLimit: 150,
			repository: this.importerECR,
			hostname: 'crm-importer',
			environment: {
				// Add any environment variables the service may use here.
				ENV_NAME: this.envName,
				BROKER: this.store.get( 'backend-streams-data-broker-bootstrap-brokers' ),
				SAARIF_CALL_TABLE: this.table?.['CohortCallTable'].tableName,
				DATABASE_URL: `${ this.dbSecrets.username }:${ this.dbSecrets.password }@tcp(${ this.dbSecrets.host }:${ this.dbSecrets.port })/${ this.dbSecrets.dbname }`,
			}
		};
	}

	private get appContainer(): AppContainerProps {

		return {
			id: 'crm',
			containerPorts: [ 3000 ],
			softLimit: 600,
			repository: this.middlewareECR,
			hostname: 'crm',
			environment: {
				// Add any environment variables the service may use here.
				ENV_NAME: this.envName,
				ACCESS_TOKEN: this.store.get( 'crm-temp-access-token' ),
				BROKER: this.store.get( 'backend-streams-data-broker-bootstrap-brokers' ),
				CONSUMER_GROUP_ID: this.store.get( 'crm-consumer-group-id' ),
				HUBSPOT_USER_TABLE: this.table?.['HubspotUserTable'].tableName,
				ORDER_TABLE: this.store.get( 'OrderTable' ),

				S3_BUCKET_SAARIF: this.store.get( 'S3_BUCKET_SAARIF' ),
				S3_BUCKET_SAARIF_URL: this.store.get( 'S3_BUCKET_SAARIF_URL' ),

				ADMIN_USERPOOL: this.store.get( `admin-interface-user-pool-${ this.envName }` ),

				AGENT_TABLE_NAME: this.table?.['AgentTable'].tableName,

				CAMPAIGN_BUCKET_TABLE_NAME: this.table?.['CampaignBucketTable'].tableName,
				CAMPAIGN_BUCKET_CALL_TABLE_NAME: this.table?.['CampaignBucketCallTable'].tableName,
				CAMPAIGN_BUCKET_AGENT_ASSIGNMENT_TABLE_NAME: this.table?.['CampaignBucketAgentAssignmentTable'].tableName,
				CALL_LOG_TABLE_NAME: this.table?.['CampaignBucketCallLogTable'].tableName,

				TICKET_AGENT_ASSIGNMENT_TABLE_NAME: this.table?.['TicketAgentAssignmentTable'].tableName,
				TICKET_TABLE_NAME: this.table?.['TicketTable'].tableName,
				TICKET_MESSAGE_TABLE_NAME: this.table?.['TicketMessageTable'].tableName,

				COHORT_TABLE_NAME: this.table?.['CohortTable'].tableName,
				COHORT_CALL_TABLE_NAME: this.table?.['CohortCallTable'].tableName,
				COHORT_CALL_LOG_TABLE_NAME: this.table?.['CohortCallLogTable'].tableName,
				COHORT_AGENT_ASSIGNMENT_TABLE_NAME: this.table?.['CohortAgentAssignmentTable'].tableName,
				USER_WHATSAPP_CHAT_TRACKING_TABLE_NAME: this.table?.['UserWhatsAppChatTrackingTable'].tableName,
				WHATSAPP_API_URL: this.store.get( 'WHATSAPP_API_URL' ),
				META_API_BASE_URL: this.store.get( 'META_API_BASE_URL' ),

				DATABASE_URL: `mysql://${ this.dbSecrets.username }:${ this.dbSecrets.password }@${ this.dbSecrets.host }:${ this.dbSecrets.port }/${ this.dbSecrets.dbname }`,
				DB: this.dbSecrets.dbname ?? '',
				DB_HOST: this.dbSecrets.host,
				DB_PASSWORD: this.dbSecrets.password,
				DB_USERNAME: this.dbSecrets.username,
				// COHORT_CALL_LOG_TABLE_NAME: this.table?.["CohortCallLogTable"].tableName,

				ADMIN_API_URL: this.store.get(
					`admin-interface-appsync-api-url-${this.envName}`
				),
				NOTION_COMPLAINT_TRACKER_DATABASE_ID: this.store.get( 'NOTION_COMPLAINT_TRACKER_DATABASE_ID' ),
			},
			secrets: {
				WHATSAPP_BEARER_TOKEN: this.store.getSecret( 'meta/saarif/whatsapp' ),
				NOTION_SECRET_KEY: this.store.getSecret( 'notion-secret-key/cerebro' ),
				SLACK_USER_OAUTH_TOKEN: this.store.getSecret( 'slack/secret-key/cerebro/user' ),
				SLACK_BOT_OAUTH_TOKEN: this.store.getSecret( 'slack/secret-key/cerebro/bot' ),
				GAJNI_API_KEY: this.store.getSecret('gajni/api-key'),
				GAJNI_BASE_URL: this.store.getSecret('gajni/url'),
			}
		};
	}

	private get scalingCapacity(): ScalingCapacity {
		return {
			desiredCount: this.envName == 'dev' ? 1 : 1,
			minCapacity: 100,
			maxCapacity: 200,
		};
	}

	private getTablePermissions(): string[] {
		const tables = Object.keys( this.table ).map( ( key ) => this.table[key] );
		return [
			...tables.map( ( table ) => table.tableArn ),
			...tables.map( ( table ) => table.tableArn + '/index/*' ),
		];


	}

	// Define in-line policies for the required AWS resources
	// You may also add managed policies in case in-line policies don't work
	private getRole(): Role {
		const role = new Role( this, 'TaskDefinitionTaskRole', {
			assumedBy: new ServicePrincipal( 'ecs-tasks.amazonaws.com' ),
		} );


		role.addManagedPolicy(
			ManagedPolicy.fromAwsManagedPolicyName("AWSAppSyncAdministrator")
		);
		
		role.attachInlinePolicy(
			new Policy( this, `Crm-policy-${ this.envName }`, {
				statements: [
					new PolicyStatement( {
						actions: [ 'dynamodb:*' ],
						resources: this.getTablePermissions(),
					} ),
					new PolicyStatement( {
						actions: [ 'dynamodb:*' ],
						resources: [ this.store.get( 'Order-arn' ), this.store.get( 'Order-arn' ) + '/index/*' ],
					} ),
					new PolicyStatement( {
						actions: [ 'es:*' ],
						resources: [ '*' ],
					} ),
					new PolicyStatement( {
						actions: [ 's3:*' ],
						resources: [ '*' ],
					} ),
				],
			} )
		);

		return role;
	}

	private setupCrmService(): MAQService {
		const service = new MAQService( this, 'crm-ecs', {
			vpc: this.vpc,
			loadBalancer: {
				isSecure: true,
				listenerArn: this.store.get(
					`Maqsad-App-${ this.envName }-ALB-HTTPS-Listener-ARN`
				),
			},
			cluster: {
				clusterArn: this.store.get( 'maqsad-app-cluster-arn' ),
				clusterName: this.store.get( 'maqsad-app-cluster-name' ),
			},
			loggingURL: this.store.get( `Maqsad-App-${ this.envName }-internal-ALB-URL` ),
			serviceName: 'crm',
			healthCheckPath: `/`,
			targetGroup: {
				priority: 53,
				hostnames: [
					'cloud-saarif-dev.maqsad.net',
					'cloud-saarif.maqsad.net',
				],
			},
			scalingCapacity: this.scalingCapacity,
			containers: [ this.appContainer, this.importerContainer ],
			taskRole: this.role,
		} );
		service.addLink( 'crm', 'crm-importer' );
		return service;
	}
}
