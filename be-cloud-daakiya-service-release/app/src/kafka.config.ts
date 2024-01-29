import {KafkaOptions, Transport} from '@nestjs/microservices';
import {ConfigKeys} from "./config/app.configuration";

const brokers = process.env[ConfigKeys.BROKER]?.split?.(',') ?? []
export const kafkaConfig: KafkaOptions = {
  transport: Transport.KAFKA,
  options: {
    client: {
      clientId: 'daakiya',
      brokers,
    },
    consumer: {
      groupId: 'daakiya-service',
      allowAutoTopicCreation: true,
    },
  },
};
