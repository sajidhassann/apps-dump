import {Injectable, OnModuleInit} from '@nestjs/common';
import {Campaign, CampaignStatus} from './models/campaign';
import {CampaignRepository} from './repository/campaign.repository';
import {Client, ClientKafka} from '@nestjs/microservices';
import {kafkaConfig} from '../kafka.config';
import OffsetPagination from '../shared/models/offset.pagination';
import PaginatedList from '../shared/models/paginated.list';

@Injectable()
export class CampaignService implements OnModuleInit {
    @Client(kafkaConfig)
    client: ClientKafka;

    constructor(
        private readonly repository: CampaignRepository,
    ) {
    }

    async initiateCampaign(data: Campaign): Promise<Campaign> {
        if (
            data.campaignCohortIDs === undefined ||
            data.campaignCohortIDs.length === 0
        )
            throw new Error('Campaign cohorts are undefined');
        const campaign = await this.repository.initiateCampaign({
            name: data.name,
            campaignCohorts: {
                create: data.campaignCohortIDs.map((cohortID) => ({
                    cohortID,
                })),
            },
            notificationMeta: {
                create: {
                    title: data.notificationMeta.title,
                    body: data.notificationMeta.body,
                    link: data.notificationMeta.link,
                },
            },
        });
        const initiatedCampaign = new Campaign({
            ...data,
            notificationMeta: {
                ...data.notificationMeta,
                id: campaign.notificationMetaID,
            },
            id: campaign.id,
            status: CampaignStatus.INITIATED,
            createdAt: campaign.createdAt,
            updatedAt: campaign.updatedAt,
        });
        await this.startCampaign(initiatedCampaign);
        return initiatedCampaign;
    }

    async restartCampaign(id: string) {
        const campaign = await this.getCampaign(id)

        if (campaign && campaign.status === CampaignStatus.SENDING_COMPLETE) {
            const initiatedCampaign = new Campaign({
                name: campaign.name,
                campaignCohortIDs: campaign.campaignCohorts.map(({cohort}) => cohort.id),
                notificationMeta: {
                    ...campaign.notificationMeta,
                },
                id: campaign.id,
                status: CampaignStatus.INITIATED,
                createdAt: campaign.createdAt,
                updatedAt: campaign.updatedAt,
            });
            await this.startCampaign(initiatedCampaign);
            await this.changeCampaignStatus(campaign.id, CampaignStatus.INITIATED)
            return this.getCampaign(campaign.id)
        }
    }

    changeCampaignStatus(id: string, status: CampaignStatus) {
        return this.repository.updateCampaign({status}, {id});
    }

    async listCampaigns(
        payload: PaginatedList,
    ): Promise<OffsetPagination<Campaign>> {
        const {pageSize, pageNumber} = payload;

        const totalRecords = await this.repository.getTotalCampaignCount();
        const totalPages = Math.ceil(totalRecords / pageSize) || 1;
        const currentPage = pageNumber > totalPages ? totalPages : pageNumber;

        const items = await this.repository.listCampaigns(
            {},
            (currentPage - 1) * pageSize,
            pageSize,
        );

        const mappedItems = items.map((campaign) => {
            return new Campaign({
                ...campaign,
                status: campaign.status as CampaignStatus,
            });
        });

        return new OffsetPagination<Campaign>({
            items: mappedItems,
            count: totalRecords,
            pageNumber: currentPage,
            pageSize,
        });
    }

    getCampaign(id: string) {
        return this.repository.getCampaign(id);
    }

    async onModuleInit() {
        await this.client.connect();
    }

    private async startCampaign(campaign: Campaign) {
        await this.client?.emit('campaign_topic', JSON.stringify(campaign));
    }
}
