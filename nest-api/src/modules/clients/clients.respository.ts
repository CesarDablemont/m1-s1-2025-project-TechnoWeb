import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { SaleEntity } from "../sales/sales.entity";
import {
  ClientModel,
  ClientModelWithSalesCount,
  CreateClientModel,
  FilterClientsModel,
  UpdateClientModel,
} from "./clients.model";
import { SalesService } from "../sales/sales.service";
import { SaleModel } from "../sales/sales.model";
import { ClientEntity, ClientId } from "./entities/client.entity";

@Injectable()
export class ClientRepository {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,

    @InjectRepository(SaleEntity)
    private readonly salesRepository: Repository<SaleEntity>,

    private readonly dataSource: DataSource,

    private readonly salesService: SalesService,
  ) {}

  public async getAllClients(
    input?: FilterClientsModel,
  ): Promise<ClientModelWithSalesCount[]> {
    const [clients] = await this.clientRepository.findAndCount({
      take: input?.limit,
      skip: input?.offset,
      order: input?.sort,
    });

    return await Promise.all(
      clients.map(async (client) => ({
        id: client.id,
        firstName: client.firstName,
        lastName: client.lastName,
        email: client.email,
        photoUrl: client.photoUrl,
        salesCount: await this.salesService.countSalesByClientId(client.id),
      })),
    );
  }

  public async getClientById(
    id: string,
  ): Promise<ClientModel & { sales: SaleModel[] }> {
    if (!id) {
      throw new NotFoundException(`Client ID is required`);
    }

    const client = await this.clientRepository.findOne({
      where: { id: id as ClientId },
    });

    if (!client) {
      throw new NotFoundException(`Client with ID "${id}" not found`);
    }

    const sales = await this.salesRepository.find({
      where: { clientId: client.id },
      relations: ["book", "book.author"],
    });

    return {
      ...client,
      sales,
    };
  }

  public async createClient(client: CreateClientModel): Promise<ClientModel> {
    return this.clientRepository.save(this.clientRepository.create(client));
  }

  public async updateClient(
    id: string,
    client: UpdateClientModel,
  ): Promise<ClientModel> {
    await this.clientRepository.update(id as ClientId, client);
    const updatedClient = await this.clientRepository.findOne({
      where: { id: id as ClientId },
    });
    if (!updatedClient) {
      throw new NotFoundException(`Client with ID "${id}" not found`);
    }
    return updatedClient;
  }

  public async deleteClient(id: string): Promise<void> {
    await this.clientRepository.delete(id);
  }

  public async deleteClients(ids: string[]): Promise<void> {
    await this.dataSource.transaction(async (transactionalEntityManager) => {
      await Promise.all(
        ids.map((id) => transactionalEntityManager.delete(ClientEntity, id)),
      );
    });
  }
}
