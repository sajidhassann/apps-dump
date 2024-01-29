import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  Consumer,
  ConsumerRunConfig,
  ConsumerSubscribeTopics,
  Kafka,
  Producer,
  ProducerRecord,
} from 'kafkajs';
import { ConfigKeys } from '../config/app.configuration';

@Injectable()
export class ConsumerService implements OnApplicationShutdown {
  readonly broker: string[];
  readonly consumerGroupId: string;
  private readonly consumers: Consumer[] = [];
  private readonly producers: Producer[] = [];
  private readonly sharedKafka: Kafka;

  constructor(private readonly configService: ConfigService) {
    this.broker = this.configService
      .get<string>(ConfigKeys.BROKER)
      .split(',');
    this.consumerGroupId = this.configService.get<string>(
      ConfigKeys.CONSUMER_GROUP_ID,
    );
    this.sharedKafka = this.getKafkaInstance();
  }

  async getProducer(): Promise<Producer> {
    const producer = await this.sharedKafka.producer({});
    await producer.connect();
    this.producers.push(producer);
    return producer;
  }

  async produce(producer: Producer, data: ProducerRecord) {
    return producer.send(data);
  }

  async consume(topic: ConsumerSubscribeTopics, config: ConsumerRunConfig) {
    const kafka = this.getKafkaInstance();
    const consumer = kafka.consumer({
      groupId: `${this.consumerGroupId}-${topic.topics?.[0]}`,
      heartbeatInterval: 4000,
      sessionTimeout: 12000,
    });
    await consumer.connect();
    await consumer.subscribe(topic);

    await consumer.run(config);
    this.consumers.push(consumer);
  }

  async onApplicationShutdown() {
    for (const consumer of this.consumers) {
      await consumer.disconnect();
    }
    for (const producer of this.producers) {
      await producer.disconnect();
    }
  }

  private getKafkaInstance(): Kafka {
    return new Kafka({
      brokers: this.broker,
    });
  }
}
