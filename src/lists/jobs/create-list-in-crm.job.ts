import { OnQueueFailed, Process, Processor } from '@nestjs/bull';
import { Inject } from '@nestjs/common';
import { Job } from 'bull';

import { ListGateway } from '../gateways/list-gateway-interface';

@Processor()
export class CreateListInCrmJob {
  constructor(
    @Inject('ListIntegrationGateway')
    private listIntegrationGateway: ListGateway,
  ) {}

  @Process('list.created')
  async handle(job: Job) {
    console.log('processing...');
    console.log(job.data);
    const event = job.data;
    await this.listIntegrationGateway.create(event.list);
  }

  @OnQueueFailed({ name: 'list.created' })
  handleError(error: Error) {
    console.error('CreateListInCrmJob', error);
  }
}
