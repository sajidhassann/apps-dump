import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { WhatsappService } from './whatsapp.service';
import { WhatsAppDTO } from './models/whatsapp.message.model';

@Controller('whatsapp')
export class WhatsappController {
  constructor(private readonly whatsappService: WhatsappService) {}

  @Get('webhook')
  initWebhook(@Query() query: any) {
    return this.whatsappService.initWebhook(query);
  }

  @Post('webhook')
  receiveWebhook(@Body() body: any) {
    console.log('Student Response to Chatbot ', JSON.stringify(body));
    return this.whatsappService.processWebhookResponse(new WhatsAppDTO(body));
  }

  // @Get('download/media/:ticketMessageID')
  // async downloadMedia(
  //   @Res() res: Response,
  //   @Param('ticketMessageID') ticketMessageID: string,
  // ) {
  //   const data = await this.whatsappService.downloadMedia(ticketMessageID);
  //
  //   if (!data) {
  //     throw new HttpException('Not Exist', HttpStatus.NOT_FOUND);
  //   }
  //
  //   console.log('media data', JSON.stringify(data));
  //
  //   return res
  //     .writeHead(HttpStatus.OK, { 'Content-Type': data.mimeType })
  //     .json(data.media);
  // }
}
