import { List } from 'src/lists/entities/list.entity';

export interface ListGateway {
  create(list: List): Promise<List>;
  findAll(): Promise<List[]>;
  findById(id: number): Promise<List>;
}
