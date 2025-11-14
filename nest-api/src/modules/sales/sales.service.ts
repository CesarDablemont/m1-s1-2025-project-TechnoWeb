import { Injectable } from '@nestjs/common';
import { SaleRepository } from './sales.repository';
import { 
  SaleModel,
  FilterSalesModel,
  CreateSaleModel,
 } from './sales.model';

@Injectable()
export class SalesService {
  constructor(private readonly saleRepository: SaleRepository) {}

  public async getAllSales(
    input?: FilterSalesModel,
  ): Promise<[SaleModel[], number]> {
    return this.saleRepository.getAllSales(input);
  }

  public async getSalesByClientId(
    clientId: string,
  ): Promise<[SaleModel[], number]> {
    return this.saleRepository.getSalesByClientId(clientId);
  }

  public async countSalesByClientId(clientId: string): Promise<number> {
    return this.saleRepository.countSalesByClientId(clientId);
  }

  public async createSale(sale: CreateSaleModel): Promise<SaleModel> {
    return this.saleRepository.createSale(sale);
  }

  public async deleteSale(id: string): Promise<void> {
    await this.saleRepository.deleteSale(id);
  }
}
