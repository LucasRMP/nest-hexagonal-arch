import { List } from '../entities/list.entity';

export class ListCreatedEvent {
  constructor(public readonly list: List) {}
}
