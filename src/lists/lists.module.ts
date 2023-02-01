import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HttpModule } from '@nestjs/axios';

import { ListsService } from './lists.service';
import { ListsController } from './lists.controller';
import { ListModel } from 'src/lists/entities/list.model';
import { ListGatewaySequelize } from 'src/lists/gateways/list-gateway-sequelize';
import { ListGatewayHttp } from 'src/lists/gateways/list-gateway-http';

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
    {
      provide: 'ListPersistenceGateway',
      useExisting: ListGatewaySequelize,
    },
    {
      provide: 'ListIntegrationGateway',
      useExisting: ListGatewayHttp,
    },
  ],
})
export class ListsModule {}
