import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HttpModule } from '@nestjs/axios';

import { ListsService } from './lists.service';
import { ListsController } from './lists.controller';
import { ListModel } from 'src/lists/entities/list.model';
import { ListGatewaySequelize } from 'src/lists/gateways/list-gateway-sequelize';
import { ListGatewayHttp } from 'src/lists/gateways/list-gateway-http';
import { CreateListInCrmListener } from 'src/lists/listeners/create-list-in-crm.listener';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Module({
  imports: [
    SequelizeModule.forFeature([ListModel]),
    HttpModule.register({
      baseURL: 'http://localhost:8000',
    }),
  ],
  controllers: [ListsController],
  providers: [
    ListsService,
    ListGatewaySequelize,
    ListGatewayHttp,
    CreateListInCrmListener,
    {
      provide: 'ListPersistenceGateway',
      useExisting: ListGatewaySequelize,
    },
    {
      provide: 'ListIntegrationGateway',
      useExisting: ListGatewayHttp,
    },
    {
      provide: 'EventEmitter',
      useExisting: EventEmitter2,
    },
  ],
})
export class ListsModule {}
