import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HttpModule } from '@nestjs/axios';

import { ListsService } from './lists.service';
import { ListsController } from './lists.controller';
import { ListModel } from 'src/lists/entities/list.model';
import { ListGatewaySequelize } from 'src/lists/gateways/list-gateway-sequelize';
import { ListGatewayHttp } from 'src/lists/gateways/list-gateway-http';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { BullModule } from '@nestjs/bull';
import { PublishListCreatedListener } from 'src/lists/listeners/publish-list-created.listener';
import { CreateListInCrmJob } from 'src/lists/jobs/create-list-in-crm.job';

@Module({
  imports: [
    SequelizeModule.forFeature([ListModel]),
    HttpModule.register({
      baseURL: 'http://localhost:8000',
    }),
    BullModule.registerQueue({
      name: 'default',
      defaultJobOptions: {
        attempts: 1,
      },
    }),
  ],
  controllers: [ListsController],
  providers: [
    ListsService,
    ListGatewaySequelize,
    ListGatewayHttp,
    PublishListCreatedListener,
    CreateListInCrmJob,
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
