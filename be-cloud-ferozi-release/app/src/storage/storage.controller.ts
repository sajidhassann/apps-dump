import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { StorageService } from './storage.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadFile } from './models/upload.file.model';
import { UploadAssetResponseDto } from './dto/upload.asset.response.dto';

@Controller('storage')
export class StorageController {
  constructor(private readonly storageSerivice: StorageService) {}

  @Post('asset/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<UploadAssetResponseDto> {
    const url = await this.storageSerivice.upload(new UploadFile(file), 'ferozis');
    return { url }
  }
}
