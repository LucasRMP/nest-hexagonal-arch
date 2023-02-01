import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import EventEmitter from 'events';

import { CreateListDto } from './dto/create-list.dto';
import { ListGateway } from './gateways/list-gateway-interface';
import { List } from './entities/list.entity';
import { ListCreatedEvent } from './events/list-created.event';

@Injectable()
export class ListsService {
  constructor(
    @Inject('ListPersistenceGateway')
    private listPersistenceGateway: ListGateway,

    @Inject('EventEmitter')
    private eventEmitter: EventEmitter,
  ) {}

  async create(createListDto: CreateListDto) {
    const listEntity = new List(createListDto);
    await this.listPersistenceGateway.create(listEntity);
    this.eventEmitter.emit('list.created', new ListCreatedEvent(listEntity));
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
