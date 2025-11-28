import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  const mockUserService = {
    create: jest.fn((dto) => ({ id: 1, ...dto })),
    findAll: jest.fn(() => [{ id: 1, name: 'John' }]),
    findOne: jest.fn((id) => ({ id, name: 'Test User' })),
    update: jest.fn((id, dto) => ({ id, ...dto })),
    remove: jest.fn((id) => ({ id })),
    findManagedUsers: jest.fn((id) => [{ id: 2, name: 'Managed User' }]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{ provide: UserService, useValue: mockUserService }],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', () => {
    const dto = { name: 'Test User', roles: ['ADMIN'], groups: ['GROUP_1'] };
    expect(controller.create(dto)).toEqual({
      id: 1,
      ...dto,
    });
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should return all users', () => {
    expect(controller.findAll()).toEqual([{ id: 1, name: 'John' }]);
  });

  it('should return a user', () => {
    expect(controller.update('1', { name: 'Updated' })).toEqual({
      id: 1,
      name: 'Updated',
    });
  });

  it('should delete a user', () => {
    expect(controller.remove('1')).toEqual({
      id: 1,
    });
  });

  it('should return managed users', () => {
    expect(controller.managesUser('1')).toEqual([
      { id: 2, name: 'Managed User' },
    ]);
  });
});
