import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { BasicAuth, QueryData, Trino } from "trino-client";
import { ConfigKeys } from "../../config/app.configuration";

@Injectable()
export class TrinoService {
  private readonly jarvisUrl: string;
  private readonly trinoUsername: string;
  private readonly trinoPassword: string;

  constructor(private readonly config: ConfigService) {
    this.jarvisUrl = this.config.get(ConfigKeys.JARVIS_URL);
    this.trinoUsername = this.config.get(ConfigKeys.TRINO_USERNAME);
    this.trinoPassword = this.config.get(ConfigKeys.TRINO_PASSWORD);
  }

  async runTrinoQuery(query: string):Promise<QueryData[]> {
    const trino = this.getTrinoClient();

    const iter = await trino.query(query);

    const data: QueryData[] = await iter
      .map((r) => r.data ?? [])
      .fold<QueryData[]>([], (row, acc) => [...acc, ...row]);

    return data;
  }

  private getTrinoClient() {
    const trino: Trino = Trino.create({
      server: this.jarvisUrl,
      catalog: 'hive',
      schema: 'backend',
      auth: new BasicAuth(this.trinoUsername, this.trinoPassword),
    });

    return trino;
  }
}
