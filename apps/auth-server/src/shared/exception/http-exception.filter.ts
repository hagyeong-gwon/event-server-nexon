// src/shared/exception/http-exception.filter.ts

import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ResponseDto } from '../dto/response.dto';
import { errorResponse } from '../helper/response.helper';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    // const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let errorCode: string | undefined;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res: any = exception.getResponse();

      if (typeof res === 'string') {
        message = res;
      } else if (typeof res === 'object') {
        message = res.message || message;
        errorCode = res.errorCode || res.error || undefined;
      }
    } else {
      message = (exception as Error).message || message;
      if (exception instanceof Error) {
        errorCode = exception.name;
      }
    }

    const body: ResponseDto = errorResponse(message, errorCode);

    response.status(status).json(body);
  }
}
