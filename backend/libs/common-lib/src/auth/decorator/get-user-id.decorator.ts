import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();
    console.log('GetUserId');
    console.log(request.user.sub);
    return request.user?.sub || null; // Assuming that `sub` contains the `userId`
  },
);
