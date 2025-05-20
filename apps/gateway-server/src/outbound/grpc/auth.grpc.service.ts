import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { UserType } from '../../shared/type/user.type';

interface AuthServiceClient {
  verify(): Observable<UserType>;
}

@Injectable()
export class AuthGrpcService {
  private grpcClient: AuthServiceClient;

  constructor(@Inject('AUTH') private readonly client: ClientGrpc) {
    this.grpcClient = this.client.getService<AuthServiceClient>('AuthService');
  }
}
