import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { SaleEntity } from './sales.entity';
import { ClientEntity } from '../clients/entities/client.entity';
import { 
  SaleModel, 
  FilterSalesModel,
  CreateSaleModel } from './sales.model';
import { ClientId } from '../clients/entities/client.entity';
import { NotFoundError } from 'rxjs';

@Injectable()
export class SaleRepository {
  constructor(
    @InjectRepository(SaleEntity)
    private readonly salesRepository: Repository<SaleEntity>,
    @InjectRepository(ClientEntity)
    private readonly clientsRepository: Repository<ClientEntity>,
    private readonly dataSource: DataSource,
  ) {}

  public async getAllSales(
    input?: FilterSalesModel,
  ): Promise<[SaleModel[], number]> {
    const [sales, totalCount] = await this.salesRepository.findAndCount({
      take: input?.limit,
      skip: input?.offset,
      order: input?.sort,
    });
    return [sales, totalCount];
  }

  public async getSalesByClientId(
    clientId: string,
  ): Promise<[SaleModel[], number]> {
    const client = await this.clientsRepository.findOne({
      where: { id: clientId as ClientId },
    });
    if (!client) {
      throw new NotFoundError(`Client with ID "${clientId}" not found`);
    }
    const [sales, totalCount] = await this.salesRepository.findAndCount({
      where: { clientId: clientId as ClientId },
    });
    if (!sales) {
      return [[], 0];
    }
    return [sales, totalCount];
  }

  public async countSalesByClientId(clientId: string): Promise<number> {
    const client = await this.clientsRepository.findOne({
      where: { id: clientId as ClientId },
    });
    if (!client) {
      throw new NotFoundException(`Client with ID "${clientId}" not found`);
    }
    return this.salesRepository.count({
      where: { clientId: clientId as ClientId },
    });
  }

  public async createSale(sale: CreateSaleModel): Promise<SaleModel> {
  const client = await this.clientsRepository.findOne({
    where: { id: sale.clientId as ClientId },
  });
  if (!client) {
    throw new NotFoundException(`Client with ID "${sale.clientId}" not found`);
  }

  const book = await this.dataSource.getRepository('BookEntity').findOne({
    where: { id: sale.bookId },
  });
  if (!book) {
    throw new NotFoundException(`Book with ID "${sale.bookId}" not found`);
  }

  const newSale = this.salesRepository.create({
    ...sale,
    saleDate: new Date(),
  });

  return this.salesRepository.save(newSale);
}

}
