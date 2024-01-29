import { Injectable } from '@nestjs/common';
import { parse } from 'csv-parse';
import { CohortCallCSVModel } from './models/cohort.call.csv.model';

@Injectable()
export class FileParserService {
  csv2JSON(file: Express.Multer.File) {
    const buffer = this.getBuffer(file);

    return new Promise<CohortCallCSVModel[]>((resolve, reject) => {
      parse(
        buffer.toString(),
        {
          delimiter: ',',
          columns: true,
          skip_empty_lines: true,
        },
        (err, records: CohortCallCSVModel[]) => {
          if (err) {
            reject(err);
          }
          resolve(records);
        },
      );
    });
  }

  private getBuffer(file: Express.Multer.File) {
    return Buffer.from(file.buffer);
  }
}
