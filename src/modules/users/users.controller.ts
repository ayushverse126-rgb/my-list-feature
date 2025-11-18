import { Controller, Param, Post, VERSION_NEUTRAL } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Public } from '../../generics/decorators/public.decorator';

@Controller({
  version: VERSION_NEUTRAL,
  path: 'users',
})
export class UsersController {
  constructor(private readonly jwtService: JwtService) {}

  @Public()
  @Post('/:userId/login')
  getMyList(@Param('userId') userId: string): { accessToken: string } {
    return {
      accessToken: this.jwtService.sign({ userId }),
    };
  }
}
