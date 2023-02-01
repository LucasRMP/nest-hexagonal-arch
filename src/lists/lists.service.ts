import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { CreateListDto } from './dto/create-list.dto';
import { ListGateway } from './gateways/list-gateway-interface';
import { List } from './entities/list.entity';

@Injectable()
export class ListsService {
  constructor(
    @Inject('ListPersistenceGateway')
    private listPersistenceGateway: ListGateway,
    @Inject('ListIntegrationGateway')
    private listIntegrationGateway: ListGateway,
  ) {}

  // The problema here is that integration gateway has a high failure rate
  async create(createListDto: CreateListDto) {
    const listEntity = new List(createListDto);
    await this.listPersistenceGateway.create(listEntity);
    await this.listIntegrationGateway.create(listEntity);
    return listEntity;
  }

  findAll() {
    return this.listPersistenceGateway.findAll();
  }

  async findOne(id: number) {
    const list = await this.listPersistenceGateway.findById(id);
    if (!list) {
      throw new NotFoundException(`List #${id} not found`);
    }
    return list;
  }
}
