import { uuid } from 'uuidv4';

export class UploadFile {
  name: string;
  file: Express.Multer.File;
  mimetype: string;

  constructor(file: Express.Multer.File) {
    this.file = file;
    this.name = this.prepareFileName();
  }
  private prepareFileName(): string {
    const extension = this.file.mimetype.split('/').pop();
    const fileName = this.file.originalname.split('.')[0];
    return fileName + uuid() + '.' + extension;
  }
}
