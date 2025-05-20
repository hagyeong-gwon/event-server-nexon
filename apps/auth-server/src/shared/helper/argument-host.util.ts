import { ArgumentsHost, ContextType } from '@nestjs/common';
import { HostHelper } from './host-helper';
import { HttpArgumentsHost, RpcArgumentsHost } from '@nestjs/common/interfaces';

export class SecurityArgumentsHostHelper extends HostHelper {
  public static getRequest(host: ArgumentsHost): any {
    const hostByType = this.convertHostByType(host);
    switch (host.getType() as ContextType) {
      case 'http':
        return (hostByType as HttpArgumentsHost).getRequest();
      case 'rpc':
        return (hostByType as RpcArgumentsHost).getContext();
      default:
        throw Error('[ArgumentHostHelper.getRequest] default');
    }
  }
  private static getTokenToGrpc(request: RpcArgumentsHost): string {
    const metadata = request.getContext();
    if (!metadata) {
      return null;
    }

    if (metadata.get('x-custom-auth')[0]?.includes('Bearer')) {
      return metadata.get('x-custom-auth')[0].split('Bearer ')[1];
    }
    return metadata.get('x-custom-auth')[0];
  }
  private static getTokenToHttp(httpHost: HttpArgumentsHost): string {
    const request = httpHost.getRequest<Request>();
    if (!request.headers['authorization']) return '';
    return request.headers['authorization'].split('Bearer ')[1];
  }

  public static getPassedParam(context: ArgumentsHost) {
    const request = this.getRequest(context);
    switch (context.getType()) {
      case 'http':
        return request.params;
      case 'rpc':
        return context.getArgByIndex(0);
      case 'ws':
      default:
        return request.params;
    }
  }

  public static getPayload(context: ArgumentsHost) {
    return this.getPassedParam(context).payload;
  }

  public static getToken(host: ArgumentsHost): string {
    const context = this.convertHostByType(host);
    switch (host.getType()) {
      case 'rpc':
        return this.getTokenToGrpc(context as RpcArgumentsHost);
      case 'ws':
        return '';
      default:
        return this.getTokenToHttp(context as HttpArgumentsHost);
    }
  }
}
