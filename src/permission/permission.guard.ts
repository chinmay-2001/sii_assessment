import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSION_KEY } from './permission.decorator';
import { USERS, MODIFIED_ROLES } from '../data';

@Injectable()
export class PermissionGuard implements CanActivate {
  // Precompute role->permissions map for fast lookup
  private rolePermissions: Record<string, string[]> = MODIFIED_ROLES.reduce(
    (acc, r) => {
      acc[r.code] = r.permissions as string[];
      return acc;
    },
    {} as Record<string, string[]>,
  );

  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Read permission required by the route
    const requiredPermission = this.reflector.get<string>(
      PERMISSION_KEY,
      context.getHandler(),
    );
    console.log('Required permission:', this.rolePermissions);
    console.log('Required permission:', requiredPermission);
    // if no permission metadata is set, allow.
    if (!requiredPermission) return true;

    const req = context.switchToHttp().getRequest();
    const authHeader =
      req.headers['authorization'] || req.headers['Authorization'];

    if (!authHeader) {
      throw new UnauthorizedException('Missing Authorization header');
    }

    // For this assessment the Authorization header contains the numeric user id.
    const parsed = Array.isArray(authHeader) ? authHeader[0] : authHeader;
    const userId = parseInt(String(parsed), 10);

    if (Number.isNaN(userId)) {
      throw new UnauthorizedException(
        'Invalid Authorization header. Expect a numeric user id.',
      );
    }

    const user = USERS.find((u) => u.id === userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // Aggregate permissions from user's roles (unique)
    const userPermissions = new Set<string>();
    for (const role of user.roles) {
      const perms = this.rolePermissions[role] || [];
      perms.forEach((p) => userPermissions.add(p));
    }

    if (userPermissions.has(requiredPermission)) {
      // Allowed
      return true;
    }

    // Deny if missing permission
    throw new ForbiddenException(
      'ERROR: Not allowed to perform action due to insufficient permissions.',
    );
  }
}
