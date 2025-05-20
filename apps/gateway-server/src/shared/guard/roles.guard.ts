import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  PublicAccessList,
  RoleAccessList,
} from '../constant/roles-map.constants';
import * as micromatch from 'micromatch';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const user = req.user;
    const path = req.path;
    const method = req.method.toUpperCase();

    if (micromatch.isMatch(path, PublicAccessList)) {
      return true;
    }
    if (!user?.roles || user.roles.length === 0) {
      throw new ForbiddenException('No roles provided.');
    }
    const isAllowed = RoleAccessList.some((route) => {
      const routeMethod = route.method.toUpperCase();
      if (routeMethod !== 'ANY' && routeMethod !== method) return false;

      if (micromatch.isMatch(path, route.path)) {
        return user.roles.some((role) => route.roles.includes(role));
      }

      return false;
    });
    if (!isAllowed) {
      throw new ForbiddenException(
        'You do not have permission to access this route.',
      );
    }
    return true;
  }
}
