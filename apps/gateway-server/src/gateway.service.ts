import { Injectable, NotFoundException } from '@nestjs/common';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { ConfigSchema } from './base/config';
import { HttpService } from '@nestjs/axios';
import { URLSearchParams } from 'url';

@Injectable()
export class GatewayService {
  constructor(
    private readonly configService: ConfigService<ConfigSchema, true>,
    private readonly httpService: HttpService,
  ) {}
  async handleRequest(req: Request, res: Response) {
    const { path, query } = req;
    const user: any = req.user;

    const routeMap = {
      '/auth': this.configService.get('AUTH_SERVICE_URL'),
      '/event': this.configService.get('EVENT_SERVICE_URL'),
    };
    const matchedBase = Object.keys(routeMap).find((key) =>
      path.startsWith(key),
    );
    const queryString = new URLSearchParams(query as any).toString();

    const targetUrl = matchedBase
      ? routeMap[matchedBase] + path + (queryString ? `?${queryString}` : '')
      : null;

    if (!targetUrl) {
      throw new NotFoundException(`No matching route found for ${path}`);
    }
    delete req.headers['content-length'];

    const response = await this.httpService.axiosRef({
      method: req.method,
      url: targetUrl,
      headers: {
        ...req.headers,
        'Content-Type': 'application/json',
        'x-user-id': user?.userId,
        'x-user-email': user?.email,
        'x-user-role': user?.roles,
      },
      data: req.body,
      timeout: 5000,
    });

    res.status(response.status).send(response.data);
  }
}
