import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const LoginUser = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    const { headers } = context.switchToHttp().getRequest();

    const user = {
      userId: headers['x-user-id'],
      email: headers['x-user-email'],
      roles: headers['x-user-roles']?.split(',') || [],
    };

    return data ? user[data] : user;
  },
);
