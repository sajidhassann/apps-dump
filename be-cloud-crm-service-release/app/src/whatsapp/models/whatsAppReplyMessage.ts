interface Row {
  id: string;
  title: string;
  description?: string;
}

interface Text {
  body: string;
  preview_url?: boolean;
}
interface DOCUMENT {
  link: string;
  filename: string;
}
interface IMAGE {
  link: string;
}
interface VIDEO {
  link: string;
}
interface AUDIO {
  link: string;
}
interface Body {
  text: string;
}

interface Section {
  title: string;
  rows: Row[];
}

interface Button {
  type: string;
  reply: {
    title: string;
    id: string;
  };
}

interface Interactive {
  type: InteractiveType;
  body: Body;
  action: {
    button?: string;
    buttons?: Button[];
    sections?: Section[];
  };
}

export interface IWhatsAppReplyMessage {
  delay?: number;
  type: MessageType;
  text?: Text;
  interactive?: Interactive;
  document?: DOCUMENT;
  image?: IMAGE;
  video?: VIDEO;
  audio?: AUDIO;
}
export class WhatsAppReplyMessage {
  private readonly type: MessageType;
  private readonly text?: Text;
  private readonly interactive?: Interactive;
  private readonly document?: DOCUMENT;
  private readonly image?: IMAGE;
  private readonly video?: VIDEO;
  private readonly audio?: AUDIO;

  constructor(data: IWhatsAppReplyMessage) {
    this.type = data.type;
    this.text = data.text;
    this.interactive = data.interactive;
    this.document = data.document;
    this.image = data.image;
    this.audio = data.audio;
    this.video = data.video;
  }

  get filePath() {
    return (
      this.document?.link ??
      this.image?.link ??
      this.audio?.link ??
      this.video?.link
    );
  }

  get toString(): string {
    return `${
      this.text?.body?.trim() ?? this.interactive?.body?.text?.trim() ?? ''
    }
${
  this.interactive?.action?.sections?.[0]?.rows
    ?.map?.(
      (row, i) => `${i + 1}: ${row.title}
${row.description ?? ''}`,
    )
    ?.join('\n')
    ?.trim() ?? ''
}
${
  this.interactive?.action?.buttons
    ?.map?.((item, i) => `${i + 1}: ${item.reply.title}`)
    ?.join('\n')
    ?.trim() ?? ''
}`.trim();
  }
}

export enum MessageType {
  TEXT = 'text',
  INTERACTIVE = 'interactive',
  IMAGE = 'image',
  DOCUMENT = 'document',
  VIDEO = 'video',
  AUDIO = 'audio',
}

export enum InteractiveType {
  LIST = 'list',
  BUTTON = 'button',
}
