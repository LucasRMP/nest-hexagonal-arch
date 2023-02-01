import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { ListCreatedEvent } from '../events/list-created.event';
import { ListGateway } from '../gateways/list-gateway-interface';

@Injectable()
export class CreateListInCrmListener {
  constructor(
    @Inject('ListIntegrationGateway')
    private listIntegrationGateway: ListGateway,
  ) {}

  @OnEvent('list.created')
  async handle(event: ListCreatedEvent) {
    await this.listIntegrationGateway.create(event.list);
  }
}
