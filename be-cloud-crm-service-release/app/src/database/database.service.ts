import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { aws } from 'dynamoose';
import { ModelType, SortOrder } from 'dynamoose/dist/General';
import { AssignCohortRequestDto } from 'src/admin/dto/assign.cohort.request.dto';
import { CreateCohortCallRequestDto } from 'src/admin/dto/create.cohort.call.request.dto';
import { ConfigKeys } from '../config/app.configuration';
import { AgentDbModel } from './models/agent.db.model';
import { CohortAgentAssignmentDbModel } from './models/cohort.agent.assignment.db.model';
import { CohortCallDbModel } from './models/cohort.call.db.model';
import { CohortDbModel } from './models/cohort.db.model';
import { TicketAgentAssignmentDbModel } from './models/ticket.agent.assignment.db.model';
import { TicketDbModel } from './models/ticket.db.model';
import { TicketMessageDbModel } from './models/ticket.message.db.model';
import { UserWhatsappChatTrackingDbModel } from './models/user.whatsapp.chat.tracking.db.model';

@Injectable()
export class DatabaseService {
  private readonly agentModel: ModelType<AgentDbModel>;

  private readonly cohortModel: ModelType<CohortDbModel>;
  private readonly cohortCallModel: ModelType<CohortCallDbModel>;
  private readonly cohortAgentAssignmentModel: ModelType<CohortAgentAssignmentDbModel>;
  private readonly userWhatsappChatTrackingModel: ModelType<UserWhatsappChatTrackingDbModel>;

  private readonly ticketAgentAssignmentDbModel: ModelType<TicketAgentAssignmentDbModel>;

  private readonly ticketDbModel: ModelType<TicketDbModel>;

  private readonly ticketMessageDbModel: ModelType<TicketMessageDbModel>;

  constructor(private readonly configService: ConfigService) {
    this.configDB();
    this.agentModel = AgentDbModel.getModel(
      this.configService.get(ConfigKeys.AGENT_TABLE_NAME) ?? '',
    );

    this.cohortModel = CohortDbModel.getModel(
      this.configService.get(ConfigKeys.COHORT_TABLE_NAME) ?? '',
    );
    this.cohortCallModel = CohortCallDbModel.getModel(
      this.configService.get(ConfigKeys.COHORT_CALL_TABLE_NAME) ?? '',
    );
    this.cohortAgentAssignmentModel = CohortAgentAssignmentDbModel.getModel(
      this.configService.get(ConfigKeys.COHORT_AGENT_ASSIGNMENT_TABLE_NAME) ??
        '',
    );

    this.ticketDbModel = TicketDbModel.getModel(
      this.configService.get(ConfigKeys.TICKET_TABLE_NAME) ?? '',
    );

    this.ticketAgentAssignmentDbModel = TicketAgentAssignmentDbModel.getModel(
      this.configService.get(ConfigKeys.TICKET_AGENT_ASSIGNMENT_TABLE_NAME) ??
        '',
    );

    this.ticketMessageDbModel = TicketMessageDbModel.getModel(
      this.configService.get(ConfigKeys.TICKET_MESSAGE_TABLE_NAME) ?? '',
    );

    this.userWhatsappChatTrackingModel =
      UserWhatsappChatTrackingDbModel.getModel(
        this.configService.get(
          ConfigKeys.USER_WHATSAPP_CHAT_TRACKING_TABLE_NAME,
        ) ?? '',
      );
  }

  // MARK:- Get Queries
  async getAgent(agentID: string): Promise<AgentDbModel> {
    return this.agentModel.get(agentID);
  }

  getAssignedCohorts(agentID: string): Promise<CohortAgentAssignmentDbModel[]> {
    return this.cohortAgentAssignmentModel.query('agentID').eq(agentID).exec();
  }

  assignCohort(
    data: AssignCohortRequestDto,
  ): Promise<CohortAgentAssignmentDbModel> {
    return this.cohortAgentAssignmentModel.create(data);
  }

  getCohort(bucketID: string): Promise<CohortDbModel> {
    return this.cohortModel.get(bucketID);
  }

  async getCohortsByAgent(agentID: string): Promise<CohortDbModel[]> {
    const assignedCohorts = await this.getAssignedCohorts(agentID);

    const cohorts = assignedCohorts.map((item) =>
      this.getCohort(item.bucketID),
    );

    return Promise.all(cohorts);
  }

  getCohortCall(callID: string): Promise<CohortCallDbModel> {
    return this.cohortCallModel.get(callID);
  }

  getCohortCallsByCohortID(bucketID: string): Promise<CohortCallDbModel[]> {
    return this.cohortCallModel
      .query('cohortID')
      .eq(bucketID)
      .sort(SortOrder.descending)
      .exec();
  }

  // MARK:- List queries

  listCohorts(): Promise<CohortDbModel[]> {
    return this.cohortModel.scan().exec();
  }

  // MARK:- Create queries

  createCohortCall(body: CreateCohortCallRequestDto) {
    console.log('Creating call with data: ', JSON.stringify(body));
    return this.cohortCallModel.create(body);
  }

  // MARK:- Update queries

  updateCohortCall(call: CohortCallDbModel) {
    delete call.createdAt;
    delete call.updatedAt;

    console.log('Updating call with data: ', JSON.stringify(call));
    return this.cohortCallModel.update(call);
  }

  getUserWhatsappChatTracking(
    id: string,
  ): Promise<UserWhatsappChatTrackingDbModel | null> {
    return this.userWhatsappChatTrackingModel.get(id);
  }

  createUserWhatsappChatTracking(
    data: UserWhatsappChatTrackingDbModel,
  ): Promise<UserWhatsappChatTrackingDbModel> {
    return this.userWhatsappChatTrackingModel.create(data);
  }

  updateUserWhatsappChatTracking(
    data: UserWhatsappChatTrackingDbModel,
  ): Promise<UserWhatsappChatTrackingDbModel> {
    return this.userWhatsappChatTrackingModel.update(data);
  }

  createTicket(data: TicketDbModel): Promise<TicketDbModel> {
    return this.ticketDbModel.create(data);
  }

  getTicket(ticketID: string): Promise<TicketDbModel> {
    return this.ticketDbModel.get(ticketID);
  }

  getTicketsAgainstPhoneNumber(phoneNumber: string): Promise<TicketDbModel[]> {
    return this.ticketDbModel.query('phoneNumber').eq(phoneNumber).exec();
  }

  getTicketsAgainstPhoneNumberAndStatus(
    phoneNumber: string,
    statuses: string[],
  ): Promise<TicketDbModel[]> {
    return this.ticketDbModel
      .query('phoneNumber')
      .eq(phoneNumber)
      .where('status')
      .in(statuses)
      .exec();
  }

  listTicketsByNumberByStatus(
    number: string,
    status: string[],
  ): Promise<TicketDbModel[]> {
    return this.ticketDbModel
      .query('phoneNumber')
      .eq(number)
      .where('status')
      .in(status)
      .exec();
  }

  listTicketsByStatus(status: string): Promise<TicketDbModel[]> {
    return this.ticketDbModel.query('status').eq(status).exec();
  }

  listTicketsExcludedStatus(statuses: string[]): Promise<TicketDbModel[]> {
    return this.ticketDbModel
      .scan('status')
      .in(statuses)
      .using('byStatus')
      .exec();
  }

  createAgentChatAssignment(data: TicketAgentAssignmentDbModel) {
    return this.ticketAgentAssignmentDbModel.create(data);
  }

  updateTicket(data: Partial<TicketDbModel>) {
    delete data?.createdAt;
    delete data?.updatedAt;

    console.log('data inside databaseService updateTicket >>', data);
    return this.ticketDbModel.update(data);
  }

  createTicketMessage(
    data: TicketMessageDbModel,
  ): Promise<TicketMessageDbModel> {
    return this.ticketMessageDbModel.create(data);
  }

  getAgentAssignedTicket(data: Partial<TicketAgentAssignmentDbModel>) {
    return this.ticketAgentAssignmentDbModel
      .query('agentID')
      .eq(data.agentID)
      .where('ticketID')
      .eq(data.ticketID)
      .exec();
  }

  getTicketMessageHistory(ticketID: string) {
    return this.ticketMessageDbModel.query('ticketID').eq(ticketID).exec();
  }

  private configDB() {
    const ddb = new aws.ddb.DynamoDB({
      region: 'ap-southeast-1',
    });
    aws.ddb.set(ddb);
  }
}
