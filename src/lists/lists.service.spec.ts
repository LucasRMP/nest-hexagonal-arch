import { of } from 'rxjs';
import { ListGatewayInMemory } from './gateways/list-gateway-in-memory';
import { ListsService } from './lists.service';

describe('ListsService', () => {
  let service: ListsService;
  let listPersistenceGateway: ListGatewayInMemory;
  let listIntegrationGateway: ListGatewayInMemory;

  beforeEach(() => {
    listPersistenceGateway = new ListGatewayInMemory();
    listIntegrationGateway = new ListGatewayInMemory();
    service = new ListsService(listPersistenceGateway, listIntegrationGateway);
  });

  it('should create a list', async () => {
    const list = await service.create({
      name: 'My List',
    });
    expect(list.id).toEqual(1);
    expect(list.name).toEqual('My List');
  });

  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     providers: [ListsService],
  //   }).compile();

  //   service = module.get<ListsService>(ListsService);
  // });

  // it('should be defined', () => {
  //   expect(service).toBeDefined();
  // });
});
