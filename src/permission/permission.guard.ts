import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserService } from '../user/user.service';
import { MODIFIED_ROLES } from '../data';
import { PERMISSION_KEY } from './permission.decorator';

@Injectable()
export class PermissionGuard implements CanActivate {
  // Build role → permissions map
  private rolePermissions = MODIFIED_ROLES.reduce(
    (acc, role) => {
      acc[role.code] = role.permissions;
      return acc;
    },
    {} as Record<string, string[]>,
  );

  constructor(
    private reflector: Reflector,
    private userService: UserService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    // Get permission required by controller endpoint
    const requiredPermission = this.reflector.get<string>(
      PERMISSION_KEY,
      context.getHandler(),
    );

    if (!requiredPermission) {
      return true; // endpoint does not require permission
    }

    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException('Missing Authorization header');
    }

    const userId = parseInt(authHeader, 10);
    if (isNaN(userId)) {
      throw new UnauthorizedException('Invalid Authorization header');
    }

    const user = this.userService.findOne(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // Collect permissions from ALL ROLES of the user
    console.log(this.rolePermissions);
    const userPermissions = new Set<string>();
    for (const role of user.roles) {
      const perms = this.rolePermissions[role] || [];
      perms.forEach((p) => userPermissions.add(p));
    }

    console.log(
      'User Permissions:',
      Array.from(userPermissions),
      'Required Permission:',
      requiredPermission,
    );

    // Check if the required permission is allowed
    if (!userPermissions || !userPermissions.has(requiredPermission)) {
      throw new ForbiddenException(
        `ERROR: Not allowed to perform action due to insufficient permissions.`,
      );
    }

    return true;
  }
}
