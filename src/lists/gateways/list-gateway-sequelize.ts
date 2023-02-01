import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { List } from '../entities/list.entity';
import { ListModel } from '../entities/list.model';
import { ListGateway } from './list-gateway-interface';

@Injectable()
export class ListGatewaySequelize implements ListGateway {
  constructor(
    @InjectModel(ListModel)
    private readonly listModel: typeof ListModel,
  ) {}

  async create(list: List): Promise<List> {
    const createdList = await this.listModel.create(list);
    list.id = createdList.id;
    return list;
  }

  async findAll(): Promise<List[]> {
    const listModels = await this.listModel.findAll();

    return listModels.map(
      (model) => new List({ name: model.name, id: model.id }),
    );
  }

  async findById(id: number): Promise<List> {
    const listModel = await this.listModel.findByPk(id);
    if (!listModel) {
      return null;
    }

    return new List({ name: listModel.name, id: listModel.id });
  }
}
