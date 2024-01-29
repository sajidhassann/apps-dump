import { IMixpanelUser } from "../dto/mixpanelCohortImportRequestDTO";

export class MixpanelUser {
    id: string;
    
    constructor(user: IMixpanelUser) {
        this.id = user["User ID"];
    }
}
