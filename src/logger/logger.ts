import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class CustomLogger implements NestMiddleware {
  private readonly logger = new Logger('HTTP');
  use(req: Request, res: Response, next: NextFunction) {
    res.on('finish', () => {
      const { method, originalUrl, ip } = req;
      const { statusCode, statusMessage } = res;
      const userAgent = req.get('user-agent') || '';
      const contentLength = res.get('content-length');

      const message = `${method} ${originalUrl} ${statusCode} ${statusMessage} - ${contentLength} - ${userAgent} ${ip}`;
      // catch stack

      if (statusCode >= 500) {
        return this.logger.error(message);
      }

      if (statusCode >= 400) {
        return this.logger.warn(message);
      }

      return this.logger.log(message);
    });
    next();
  }
}
