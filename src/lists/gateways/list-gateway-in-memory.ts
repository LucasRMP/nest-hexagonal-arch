import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { List } from '../entities/list.entity';
import { ListModel } from '../entities/list.model';
import { ListGateway } from './list-gateway-interface';

@Injectable()
export class ListGatewayInMemory implements ListGateway {
  db: List[] = [];

  async create(list: List): Promise<List> {
    list.id = this.db.length + 1;
    this.db.push(list);
    return list;
  }

  async findAll(): Promise<List[]> {
    return this.db;
  }

  async findById(id: number): Promise<List> {
    const list = this.db.find((list) => list.id === id);
    if (!list) {
      return null;
    }

    return list;
  }
}
