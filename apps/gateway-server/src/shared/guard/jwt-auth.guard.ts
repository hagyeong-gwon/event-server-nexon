import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UNAUTHORIZED_MSG } from '../constant/common-err-msg.constants';
import * as micromatch from 'micromatch';
import { PublicAccessList } from '../constant/roles-map.constants';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: any) {
    const request = context.switchToHttp().getRequest();
    const path = request.path;

    if (path === '/docs-json' || path.startsWith('/docs')) {
      return true;
    }
    if (micromatch.isMatch(path, PublicAccessList)) {
      return true;
    }
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any) {
    if (err || !user) {
      throw err || new UnauthorizedException(UNAUTHORIZED_MSG);
    }
    return user;
  }
}
