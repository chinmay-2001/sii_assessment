import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', () => {
      const dto = { name: 'Test User', roles: ['ADMIN'], groups: ['GROUP_1'] };
      const result = service.create(dto);

      expect(result).toHaveProperty('id');
      expect(result.name).toBe('Test User');
    });
  });

  describe('findAll', () => {
    it('should return all users', () => {
      const users = service.findAll();
      expect(Array.isArray(users)).toBe(true);
    });
  });

  describe('findOne', () => {
    it('should return a user by id', () => {
      const user = service.findOne(1);
      expect(user).toBeDefined();
      expect(user.id).toBe(1);
    });
  });

  describe('update', () => {
    it('should update a user', () => {
      const updated = service.update(1, { name: 'Updated Name' });
      expect(updated.name).toBe('Updated Name');
    });
  });

  describe('remove', () => {
    it('should remove a user', () => {
      const removed = service.remove(1);
      expect(removed.id).toBe(1);
    });
  });

  describe('findManagedUsers', () => {
    it('should return empty array if user is not ADMIN', () => {
      const result = service.findManagedUsers(3); // Assuming id=3 is not admin
      expect(result).toEqual([]);
    });

    it('should return users managed by an admin', () => {
      const result = service.findManagedUsers(4); // Admin
      expect(Array.isArray(result)).toBe(true);
    });
  });
});
