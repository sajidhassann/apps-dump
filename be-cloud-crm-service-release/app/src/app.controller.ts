import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { WebsocketGateway } from './websocket.gateway';
import { WhatsAppDTO } from './whatsapp/models/whatsapp.message.model';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly service: WebsocketGateway,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('webhook')
  initWebhook(@Query() query: any) {
    return this.appService.initWebhook(query);
  }
  @Post('webhook')
  receiveWebhook(@Body() body: WhatsAppDTO) {
    console.log('Student Response to Chatbot ', JSON.stringify(body));
    return this.appService.sendWebhookResponse(body);
  }

  // @Post('webhook')
  // receiveWebhook(@Body() body: any) {
  //   console.log('Student Response to Chatbot ', JSON.stringify(body));
  //   return this.appService.sendWebhookResponse(new WhatsAppDTO(body));
  // }

  // @Get('/user-agent/:id')
  // getUserAgent(@Param() params: { id: string }) {
  //   return this.appService.getUserAgent(params.id ?? '');
  // }

  // @Get('/active/:agentEmail')
  // getActiveCallByAgent(@Param() params: { agentEmail: string }): string {
  //   console.log('Requested initiated call for ', params?.agentEmail);
  //   this.service.getInProgressCampaignBucketCallByAgent(params.agentEmail);
  //
  //   return this.appService.getHello();
  // }

  @Get('cancel')
  cancelCall(): string {
    this.service.cancelCall();
    return 'Cancelled';
  }

  @Get('/call/:number')
  call(@Param() params: { number: string }): string {
    console.log('Call', params.number);
    this.service.placeCall(params.number);
    return this.appService.getHello();
  }

  @Post('/import')
  import(@Body() body: any) {
    console.log('Importing', body);
    return this.appService.importCohort(body);
  }
}
