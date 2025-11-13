import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateClientDto, GetClientsDto, UpdateClientDto } from './clients.dto';
import { GetClientsModel } from './clients.model';
import { ClientsService } from './clients.service';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get()
  async getClients(@Query() input: GetClientsDto): Promise<GetClientsModel> {
    const [property, direction] = input.sort
      ? input.sort.split(',')
      : ['lastName', 'ASC'];

    const clients = await this.clientsService.getAllClients({
      ...input,
      sort: {
        [property]: direction,
      },
    });

    return {
      data: clients,
    };
  }

  @Get(':id')
  public async getClient(@Param('id') id: string) {
    return this.clientsService.getClientById(id);
  }

  @Post()
  createClient(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.createClient(createClientDto);
  }

  @Patch(':id')
  updateClient(
    @Param('id') id: string,
    @Body() updateClientDto: UpdateClientDto,
  ) {
    return this.clientsService.updateClient(id, updateClientDto);
  }

  @Delete(':id')
  deleteClient(@Param('id') id: string) {
    return this.clientsService.deleteClient(id);
  }
}
