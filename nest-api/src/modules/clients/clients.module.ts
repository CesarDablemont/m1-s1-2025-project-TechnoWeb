import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { ClientEntity } from './entities/client.entity';
import { SaleEntity } from '../sales/sales.entity';
import { ClientRepository } from './clients.respository';
import { SalesModule } from '../sales/sales.module';

@Module({
  imports: [TypeOrmModule.forFeature([ClientEntity, SaleEntity]), SalesModule],
  controllers: [ClientsController],
  providers: [ClientsService, ClientRepository],
  exports: [ClientsService],
})
export class ClientsModule {}
