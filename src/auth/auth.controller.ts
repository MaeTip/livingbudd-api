import { Body, Controller, Post, HttpStatus, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserSignUpDto, AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  signup(@Body() dto: UserSignUpDto) {
    return this.authService.signup(dto);
  }
}
