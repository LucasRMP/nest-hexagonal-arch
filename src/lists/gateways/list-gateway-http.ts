import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { List } from '../entities/list.entity';
import { ListGateway } from './list-gateway-interface';

@Injectable()
export class ListGatewayHttp implements ListGateway {
  constructor(
    @Inject(HttpService)
    private httpService: HttpService,
  ) {}

  async create(list: List): Promise<List> {
    await lastValueFrom(
      this.httpService.post('/lists', {
        name: list.name,
      }),
    );
    return list;
  }

  async findAll(): Promise<List[]> {
    const { data } = await lastValueFrom(this.httpService.get('/lists'));
    return data.map((list) => new List(list));
  }

  async findById(id: number): Promise<List> {
    const { data } = await lastValueFrom(this.httpService.get(`/lists/${id}`));
    return new List(data);
  }
}
