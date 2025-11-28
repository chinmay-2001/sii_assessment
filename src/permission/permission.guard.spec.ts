import { PermissionGuard } from './permission.guard';
import { Reflector } from '@nestjs/core';
import { UserService } from '../user/user.service';

describe('PermissionGuard', () => {
  let guard: PermissionGuard;
  let reflector: Reflector;
  let userService: UserService;

  beforeEach(() => {
    reflector = new Reflector();
    userService = {
      findOne: jest.fn((id) => {
        if (id === 1) return { id: 1, roles: ['ADMIN'] };
        if (id === 6) return { id: 6, roles: ['VIEWER'] };
        return null;
      }),
    } as any;

    guard = new PermissionGuard(reflector, userService);
  });

  const mockContext = (permission, userId) => ({
    switchToHttp: () => ({
      getRequest: () => ({
        headers: { authorization: userId.toString() },
      }),
    }),
    getHandler: () => ({}),
  });

  it('should allow ADMIN with CREATE permission', () => {
    jest.spyOn(reflector, 'get').mockReturnValue('CREATE');
    const result = guard.canActivate(mockContext('CREATE', 1) as any);
    expect(result).toBe(true);
  });

  it('should deny VIEWER trying to CREATE', () => {
    jest.spyOn(reflector, 'get').mockReturnValue('CREATE');
    expect(() => guard.canActivate(mockContext('CREATE', 6) as any)).toThrow();
  });
});
