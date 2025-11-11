import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientsService } from './clients.service';
import { ClientEntity } from './entities/client.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

const mockRepo = () => ({
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  preload: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
});

type MockRepo = Partial<Record<keyof Repository<ClientEntity>, jest.Mock>>;

describe('ClientsService', () => {
  let service: ClientsService;
  let repo: MockRepo;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientsService,
        { provide: getRepositoryToken(ClientEntity), useFactory: mockRepo },
      ],
    }).compile();

    service = module.get<ClientsService>(ClientsService);
    repo = module.get(getRepositoryToken(ClientEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create calls repo.save', async () => {
    const dto = { firstName: 'Jean', lastName: 'Dupont' } as CreateClientDto;
    (repo.create as jest.Mock).mockReturnValue(dto);
    (repo.save as jest.Mock).mockResolvedValue({ id: '1', ...dto });
    const res = await service.create(dto);
    expect(repo.save).toHaveBeenCalledWith(expect.objectContaining(dto));
    expect(res.id).toBe('1');
  });

  it('update uses preload and save', async () => {
    (repo.preload as jest.Mock).mockResolvedValue({ id: '1', firstName: 'X' });
    (repo.save as jest.Mock).mockResolvedValue({ id: '1', firstName: 'X' });
    await service.update('1', { firstName: 'X' } as UpdateClientDto);
    expect(repo.preload).toHaveBeenCalledWith({ id: '1', firstName: 'X' });
    expect(repo.save).toHaveBeenCalled();
  });

  it('remove calls delete', async () => {
    (repo.delete as jest.Mock).mockResolvedValue({ affected: 1 });
    await service.remove('1');
    expect(repo.delete).toHaveBeenCalledWith('1');
  });
});
