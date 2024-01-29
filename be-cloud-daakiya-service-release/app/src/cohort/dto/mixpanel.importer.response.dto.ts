import { MixpanelImportAction } from "./mixpanelCohortImportRequestDTO";

export type MixpanelImportStatus = 'success' | 'failure';

export class MixpanelImportResponseDTO {
  action: MixpanelImportAction;
  status: MixpanelImportStatus;
  error?: {
    message: string;
    code: number;
  };
}



