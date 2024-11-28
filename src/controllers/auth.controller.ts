import { Controller, Post, Body, HttpStatus, Res } from '@nestjs/common';
import { UserLoginDto } from 'src/dtos/user-login.dto';
import { UserRegisterDto } from 'src/dtos/user-register.dto';
import { AuthService } from 'src/services/auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Post('register')
  async register(@Body() body: UserRegisterDto, @Res() res: Response) {
    const user = await this.authService.register(body);
    return res.status(HttpStatus.OK).json(user);
  }

  @Post('login')
  async login(@Body() body: UserLoginDto, @Res() res: Response) {
    const user = await this.authService.validateUser(body);
    return res.status(HttpStatus.OK).json(user);
  }
}