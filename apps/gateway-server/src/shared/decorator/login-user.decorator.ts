import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const LoginUser = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    const {
      params: { user },
    } = context.switchToHttp().getRequest();

    return data ? user[data] : user;
  },
);
