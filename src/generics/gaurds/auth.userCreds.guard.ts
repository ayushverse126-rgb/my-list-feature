import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
  Inject,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { UserQuery } from '../../modules/users/entities/user.query';

@Injectable()
export class AuthGuard implements CanActivate {
  @Inject()
  private readonly reflector: Reflector;

  @Inject()
  private readonly jwtService: JwtService;

  @Inject()
  private readonly userQuery: UserQuery;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    //Check if The public metadata is activated
    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler(),
    );

    if (isPublic) return true;

    if (!authHeader) {
      throw new UnauthorizedException('Missing Authorization header');
    }

    // Expecting "Bearer <token>"
    const [type, token] = authHeader.split(' ');

    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException('Invalid token format');
    }

    try {
      // Validate & decode the token
      const decoded = await this.jwtService.verifyAsync(token);
      //Get Subscription Details
      const user = await this.userQuery.fetchUser(
        {
          id: decoded.userId,
        },
        ['username'],
      );
      if (!user) throw new ForbiddenException('Invalid user');

      // Attach user to request for further usage
      request.userData = decoded;

      return true;
    } catch (err) {
      throw new ForbiddenException(
        err?.response?.message || 'Invalid or expired token',
      );
    }
  }
}
