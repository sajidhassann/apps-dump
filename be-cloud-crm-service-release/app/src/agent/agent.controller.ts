import {
  Body,
  Controller,
  Get,  
  Param,
  Patch,
  Post,
  Query,
  Headers, HttpException, HttpStatus
} from '@nestjs/common';
import { AgentService } from './agent.service';
import { ActiveTicketsQuery } from './dto/active.tickets.query.request';
import { UpdateCohortCallRequestDto } from './dto/update.cohort.call.request.dto';
import { UpdateTicketRequestDto } from './dto/update.ticket.request.dto';
import { UnreadTicketsQuery } from './dto/unread.tickets.query.request';
import { AgentTicketsQuery } from './dto/agent.tickets.query.request';
import { InactiveTicketsQuery } from './dto/inactive.tickets.query.request';
import { CreateCohortCallRequestDto } from '../admin/dto/create.cohort.call.request.dto';
import { IAgent } from './interfaces/agent.interface';
import { CohortCallRequestQuery } from 'src/cohort/dto/cohort.call.request.dto';

// @IsAgent()
@Controller('agent')
export class AgentController {
  constructor(private readonly agentService: AgentService) {}

  private validateAPIKey(key: string): boolean {
    const apiKey: string = '39995c3e-ac43-4a41-a92b-d4fb737af090';
    return key === apiKey;
  }

  @Get('cohorts')
  listCohorts() {
    return this.agentService.listCohorts();
  }
  @Patch('cohort-call/:id')
  updateCohortCall(
    @Body() body: UpdateCohortCallRequestDto,
    @Param('id') id: string,
  ) {
    return this.agentService.updateCohortCall(id, body);
  }

  @Post('cohort-call')
  createCohortCall(
      @Headers('x-api-key') token: string,
      @Body() body: CreateCohortCallRequestDto) {
    if (this.validateAPIKey(token))
      return this.agentService.createCohortCall(body);
    else
      throw new HttpException('Invalid API Key', HttpStatus.FORBIDDEN)
  }

  // @Get(':agentID')
  // getAgentInfo(@Param('agentID') agentID: string) {
  //   return this.agentService.getAgent(agentID);
  // }

  //CONFIRM:
  @Get('cohort-calls')
  getCalls(@Query() query: CohortCallRequestQuery) {
    return this.agentService.getCohortCalls(query);
  }

  @Get('tickets/history/:number')
  listTicketsByNumber(@Param('number') number: string) {
    return this.agentService.listInActiveTicketsByNumber(number);
  }

  @Get('tickets/read')
  listReadTickets() {
    return this.agentService.listReadTickets();
  }

  @Get('tickets/chat/:ticketID')
  getTicketMessageHistory(@Param('ticketID') ticketID: string) {
    return this.agentService.getTicketMessageHistory(ticketID);
  }

  @Patch('ticket')
  updateTicket(@Body() body: UpdateTicketRequestDto) {
    return this.agentService.updateTicket(body);
  }

  @Get('tickets/active')
  listPaginatedActiveTickets(@Query() query: ActiveTicketsQuery) {
    console.log('query', JSON.stringify(query));
    return this.agentService.listPaginatedActiveTickets(query);
  }

  @Get('tickets/otp')
  listPaginatedOTPTickets(@Query() query: ActiveTicketsQuery) {
    console.log('query', JSON.stringify(query));
    return this.agentService.listPaginatedOTPTickets(query);
  }

  @Get('tickets/inactive')
  listPaginatedInactiveTickets(@Query() query: InactiveTicketsQuery) {
    console.log('query', JSON.stringify(query));
    return this.agentService.listPaginatedInactiveTickets(query);
  }

  @Get('tickets/unread')
  listPaginatedUnreadTickets(@Query() query: UnreadTicketsQuery) {
    return this.agentService.listPaginatedUnreadTickets(query);
  }

  @Get('tickets/user/:agentID')
  listPaginatedAgentUnreadTickets(
    @Param('agentID') agentID: string,
    @Query() query: AgentTicketsQuery,
  ) {
    return this.agentService.listPaginatedAgentTickets({ ...query, agentID });
  }

  @Post('create')
  createAgent(@Body() body: IAgent) {
    return this.agentService.createAgent(body);
  }

  @Get('list')
  listAgent() {
    return this.agentService.listAgent();
  }

  @Post('tickets/bulk-assignment')
  bulkAgentTicketAssignment(
    @Body() body: { ticketID: string[]; agentID: string; agentEmail: string },
  ) {
    return this.agentService.bulkAgentTicketAssignment(body);
  }
}
