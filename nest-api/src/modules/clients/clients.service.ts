import { Injectable } from "@nestjs/common";
import {
  ClientModel,
  CreateClientModel,
  FilterClientsModel,
  UpdateClientModel,
  ClientModelWithSalesCount,
} from "./clients.model";

import { SaleModel } from "../sales/sales.model";
import { ClientRepository } from "./clients.respository";

@Injectable()
export class ClientsService {
  constructor(private readonly clientRepository: ClientRepository) {}

  public async getAllClients(
    input?: FilterClientsModel,
  ): Promise<ClientModelWithSalesCount[]> {
    return this.clientRepository.getAllClients(input);
  }

  public async getClientById(
    id: string,
  ): Promise<ClientModel & { sales: SaleModel[] }> {
    return this.clientRepository.getClientById(id);
  }

  public async createClient(client: CreateClientModel): Promise<ClientModel> {
    return this.clientRepository.createClient(client);
  }

  public async updateClient(
    id: string,
    client: UpdateClientModel,
  ): Promise<ClientModel> {
    return this.clientRepository.updateClient(id, client);
  }

  public async deleteClient(id: string): Promise<void> {
    await this.clientRepository.deleteClient(id);
  }
}
