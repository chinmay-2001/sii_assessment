import { ForbiddenException } from '@nestjs/common';

export class PermissionDeniedException extends ForbiddenException {
  constructor(role: string, permission: string) {
    super(
      `Permission denied: role "${role}" does not have "${permission}" permission.`,
    );
  }
}
