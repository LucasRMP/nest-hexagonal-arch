import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ListModel } from 'src/lists/entities/list.model';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ListsModule } from './lists/lists.module';

@Module({
  imports: [
    ListsModule,
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      host: ':memory:',
      autoLoadModels: true,
      models: [ListModel],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
