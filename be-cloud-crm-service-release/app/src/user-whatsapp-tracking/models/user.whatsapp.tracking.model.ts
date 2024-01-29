import { WhatsAppMessageStatus } from 'src/constants/enums/whatsapp.message.status.enum';
import { UserWhatsappChatTrackingDbModel } from 'src/database/models/user.whatsapp.chat.tracking.db.model';

export class UserWhatsappTrackingModel {
  id: string;
  name: string;
  currentMenu: string;
  menuSent: boolean;
  status: WhatsAppMessageStatus;

  constructor(data: UserWhatsappChatTrackingDbModel) {
    this.id = data.id;
    this.name = data.name;
    this.currentMenu = data.currentMenu;
    this.menuSent = data.menuSent;
    this.status = data.status;
  }
}
