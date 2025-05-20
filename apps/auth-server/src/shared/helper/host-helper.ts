import { ArgumentsHost } from '@nestjs/common';

export class HostHelper {
  protected static convertHostByType(host: ArgumentsHost) {
    switch (host.getType()) {
      case 'http':
        return host.switchToHttp();
      case 'rpc':
        return host.switchToRpc();
      case 'ws':
        return host.switchToWs();
      default:
        return host;
    }
  }
}
