
export class MixpanelCohortImportRequestDTO {
  action: MixpanelImportAction;
  parameters: {
    mixpanel_cohort_name: string;
    mixpanel_cohort_id: string;
    members: IMixpanelUser[];
  };
}

export type MixpanelImportAction = 'members' | 'add_members' | 'remove_members';


export interface IMixpanelUser {
  'User ID': string;
}