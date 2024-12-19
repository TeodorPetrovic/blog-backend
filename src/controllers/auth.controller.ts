import { Controller, Post, Body, HttpStatus, Res, BadRequestException, ConflictException } from '@nestjs/common';
import { UserLoginDto } from 'src/dtos/user-login.dto';
import { UserRegisterDto } from 'src/dtos/user-register.dto';
import { AuthService } from 'src/services/auth.service';
import { Response } from 'express';
import { UserService } from 'src/services/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('register')
  async register(@Body() body: UserRegisterDto, @Res() res: Response): Promise<Response> {
    const existingUser = await this.userService.findByUsernameOrEmail(body.username, body.email);

    if (existingUser) {
      throw new ConflictException('User with this email or username already exists');
    }

    try {
      const createdUser = await this.authService.register(body);
      return res.status(HttpStatus.CREATED).json(createdUser);
    } catch (error) {
      throw new BadRequestException('Registration failed');
    }
  }

  @Post('login')
  async login(@Body() body: UserLoginDto, @Res() res: Response): Promise<Response> {
    try {
      const user = await this.authService.validateUser(body);
      return res.status(HttpStatus.OK).json(user);
    } catch (error) {
      throw new BadRequestException('Login failed');
    }
  }
}