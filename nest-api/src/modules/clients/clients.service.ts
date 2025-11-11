import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ClientEntity } from './entities/client.entity';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientRepo: Repository<ClientEntity>,
  ) {}

  async create(createClientDto: CreateClientDto) {
    const client = this.clientRepo.create(
      createClientDto as Partial<ClientEntity>,
    );
    return this.clientRepo.save(client);
  }

  async findAll() {
    return this.clientRepo.find({
      order: { lastName: 'ASC', firstName: 'ASC' },
    });
  }

  async findOne(id: string) {
    const client = await this.clientRepo.findOne({ where: { id } });
    if (!client) throw new NotFoundException(`Client ${id} not found`);
    return client;
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    const client = await this.clientRepo.preload({
      id,
      ...(updateClientDto as Partial<ClientEntity>),
    });
    if (!client) throw new NotFoundException(`Client ${id} not found`);
    return this.clientRepo.save(client);
  }

  async remove(id: string) {
    const result = await this.clientRepo.delete(id);
    if (result.affected === 0)
      throw new NotFoundException(`Client ${id} not found`);
    return { deleted: true };
  }
}
