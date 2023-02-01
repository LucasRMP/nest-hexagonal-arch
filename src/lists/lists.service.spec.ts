import { ListCreatedEvent } from './events/list-created.event';
import { ListGatewayInMemory } from './gateways/list-gateway-in-memory';
import { ListsService } from './lists.service';

const eventEmitterMock = {
  emit: jest.fn(),
};

describe('ListsService', () => {
  let service: ListsService;
  let listPersistenceGateway: ListGatewayInMemory;

  beforeEach(() => {
    listPersistenceGateway = new ListGatewayInMemory();
    service = new ListsService(listPersistenceGateway, eventEmitterMock as any);
  });

  it('should create a list', async () => {
    const list = await service.create({
      name: 'My List',
    });
    expect(list.id).toEqual(1);
    expect(list.name).toEqual('My List');
    expect(eventEmitterMock.emit).toHaveBeenCalledWith(
      'list.created', 
      new ListCreatedEvent(list),
    );
  });
});
