interface IText {
  body: string;
}
interface IImage {
  id: string;
  caption?: string;
  mime_type: string;
}
interface IAudio {
  id: string;
  mime_type: string;
}
interface IVideo {
  id: string;
  caption?: string;
  mime_type: string;
}
interface IDocument {
  id: string;
  caption?: string;
  filename: string;
  mime_type: string;
}
interface IReply {
  id: string;
  title: string;
}
interface IInteractive {
  list_reply?: IReply;
  button_reply?: IReply;
}
interface IReaction {
  message_id: string;
  emoji: string;
}
export interface IWhatsappMessage {
  from: string;
  id: string;
  timestamp: string;
  type: string;
  text?: IText;
  image?: IImage;
  audio?: IAudio;
  video?: IVideo;
  document?: IDocument;
  interactive?: IInteractive;
  reaction?: IReaction;
}

// TODO: Refactor class
export class WhatsAppDTO {
  object?: string;
  entry: {
    id: string;
    changes: {
      value: {
        messaging_product: string;
        metadata: {
          display_phone_number: string;
          phone_number_id: string;
        };
        contacts: {
          profile: {
            name: string;
          };
          wa_id: string;
        }[];
        messages: IWhatsappMessage[];
      };
      field: string;
    }[];
  }[];

  constructor(data: WhatsAppDTO) {
    this.object = data.object;
    this.entry = data.entry;
  }

  get from(): string {
    return this.messages?.[0]?.from;
  }

  get username(): string {
    return this.entry?.[0]?.changes?.[0]?.value?.contacts?.[0]?.profile?.name;
  }

  get interactiveMessageId() {
    return (
      this.messages?.[0]?.interactive?.list_reply?.id ??
      this.messages?.[0]?.interactive?.button_reply?.id
    );
  }

  get interactiveMessageContent() {
    return (
      this.messages?.[0]?.interactive?.list_reply?.title ??
      this.messages?.[0]?.interactive?.button_reply?.title
    );
  }

  get messageContent(): string {
    const documentCaption = this.messages?.[0]?.document?.caption;
    const videoCaption = this.messages?.[0]?.video?.caption;
    const imageCaption = this.messages?.[0]?.image?.caption;
    const menuReply =
      this.messages?.[0]?.interactive?.list_reply?.id ??
      this.messages?.[0]?.interactive?.button_reply?.id;
    const text = this.messages?.[0]?.text?.body;

    return (
      documentCaption ?? videoCaption ?? imageCaption ?? menuReply ?? text ?? ''
    );
  }

  get shouldProcess() {
    return !(!this.from || !(this.messageContent || this.file));
  }

  get documentExtension() {
    const fileName = this.messages?.[0]?.document?.filename;
    return fileName?.split?.('.').pop?.()?.toLowerCase?.();
  }

  get file(): string {
    const documentID = this.messages?.[0]?.document?.id;
    const videoID = this.messages?.[0]?.video?.id;
    const imageID = this.messages?.[0]?.image?.id;
    const audioID = this.messages?.[0]?.audio?.id;

    return documentID ?? videoID ?? imageID ?? audioID ?? '';
  }

  private get messages(): IWhatsappMessage[] {
    return this.entry?.[0]?.changes?.[0]?.value?.messages;
  }
}
