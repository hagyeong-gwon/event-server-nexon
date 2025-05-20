import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom, Observable } from 'rxjs';
import { GetInviteCountResponseDto } from '../../shared/dto/get-invite-count.response.dto';

interface AuthServiceClient {
  GetInviteCount(input: {
    userId: string;
  }): Observable<GetInviteCountResponseDto>;
}

@Injectable()
export class AuthGrpcService implements OnModuleInit {
  private grpcClient: AuthServiceClient;
  private readonly logger = new Logger(AuthGrpcService.name);

  constructor(@Inject('AUTH') private readonly client: ClientGrpc) {}
  onModuleInit() {
    this.grpcClient = this.client.getService<AuthServiceClient>('AuthService');
  }

  async getInviteCountInfo(userId: string): Promise<number> {
    this.logger.log('grpc getInviteCountInfo req', { input: { userId } });
    try {
      const response = await lastValueFrom(
        this.grpcClient.GetInviteCount({ userId }),
      );
      this.logger.log('grpc getInviteCountInfo req', { input: response });
      return response.count;
    } catch (e) {
      console.log(e);
      throw new BadRequestException(e);
    }
  }
}
