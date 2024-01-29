import {Body, Controller, Get, HttpException, Param, Post, Query} from '@nestjs/common';
import {AppLogger} from 'src/app.logger';
import {CampaignService} from './campaign.service';
import {InitiateCampaignRequestDTO} from './dto/initiate.campaign.request.dto';
import {InitiateCampaignResponseDTO} from './dto/initiate.campaign.response.dto';
import {Campaign} from './models/campaign';
import PaginatedList from 'src/shared/models/paginated.list';

@Controller('campaign')
export class CampaignController {
  constructor(
    private readonly logger: AppLogger,
    private readonly campaignService: CampaignService,
  ) { }

  @Post('initiate')
  async initiateCampaign(
    @Body() request: InitiateCampaignRequestDTO,
  ): Promise<InitiateCampaignResponseDTO> {
    try {
      const campaign = await this.campaignService.initiateCampaign(new Campaign(request as Campaign));
      return new InitiateCampaignResponseDTO(campaign as InitiateCampaignResponseDTO);
    } catch (exception) {
      this.logger.error(exception);
      throw new HttpException(
        exception.message ?? 'Failed to create Campaign',
        500,
      );
    }
  }

  @Get('list')
  async getCampaigns(
    @Query('pageSize') pageSize: number,
    @Query('pageNumber') pageNumber: number,
  ) {
    try {
      const campaigns = await this.campaignService.listCampaigns(
        new PaginatedList({
          pageSize,
          pageNumber,
        })
      );
      return campaigns;
    } catch (exception) {
      this.logger.error(exception);
      throw new HttpException(
        exception.message ?? 'Failed to fetch Campaigns',
        500,
      );
    }
  }

  @Get('/:id')
  async getCampaign(
    @Param() params: { id: string },
  ) {
    try {
      return await this.campaignService.getCampaign(params.id);
    } catch (exception) {
      this.logger.error(exception);
      throw new HttpException(
        exception.message ?? 'Failed to fetch Campaign',
        500,
      );
    }
  }

  @Get('/restart/:id')
  async restartCampaign(
    @Param() params: { id: string },
  ) {
    try {
      return await this.campaignService.restartCampaign(params.id);
    } catch (exception) {
      this.logger.error(exception);
      throw new HttpException(
        exception.message ?? 'Failed to fetch Campaign',
        500,
      );
    }
  }

}
