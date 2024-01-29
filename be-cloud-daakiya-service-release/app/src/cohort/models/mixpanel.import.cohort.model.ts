import { MixpanelCohortImportRequestDTO, MixpanelImportAction } from "../dto/mixpanelCohortImportRequestDTO";
import { MixpanelUser } from "./mixpanelUser";

export class MixpanelImportCohortModel{
    action: MixpanelImportAction;
    cohortID: string;
    cohortName: string;
    mixpanelUsers: MixpanelUser[];

    constructor(data:MixpanelCohortImportRequestDTO) {
        this.action = data.action;
        this.cohortID = data.parameters.mixpanel_cohort_id;
        this.cohortName = data.parameters.mixpanel_cohort_name;
        this.mixpanelUsers = data.parameters.members.map((user) => new MixpanelUser(user)).filter((user)=>Boolean(user.id));
    }
}


