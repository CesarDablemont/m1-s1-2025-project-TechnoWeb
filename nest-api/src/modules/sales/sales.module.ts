import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleEntity } from './sales.entity';
import { ClientEntity } from '../clients/entities/client.entity';
import { SalesService } from './sales.service';
import { SaleRepository } from './sales.repository';
import { SalesController } from './sales.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SaleEntity, ClientEntity])],
  controllers: [SalesController],
  providers: [SalesService, SaleRepository],
  exports: [SalesService, SaleRepository],
})
export class SalesModule {}
