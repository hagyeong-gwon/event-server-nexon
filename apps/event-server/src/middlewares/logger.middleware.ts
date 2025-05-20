import { Request, Response, NextFunction } from 'express';
import { Logger } from '@nestjs/common';

// http logger
const httpLogger = new Logger('HTTP');
export function logger(req: Request, res: Response, next: NextFunction): void {
  const { ip, method, originalUrl } = req;
  const userAgent = req.get('user-agent') || '';

  res.on('finish', () => {
    const { statusCode } = res;

    const contentLength = res.get('content-length');
    httpLogger.log(
      `${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip}`,
    );
  });

  next();
}
