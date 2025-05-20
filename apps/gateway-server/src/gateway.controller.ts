import { All, Controller, Req, Res, UseGuards } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { Request, Response } from 'express';
import { JwtAuthGuard } from './shared/guard/jwt-auth.guard';
import { RolesGuard } from './shared/guard/roles.guard';

@Controller()
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @All('*')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async proxy(@Req() req: Request, @Res() res: Response) {
    return this.gatewayService.handleRequest(req, res);
  }
}
