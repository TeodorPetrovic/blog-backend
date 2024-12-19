import { BadRequestException, Injectable, ConflictException } from "@nestjs/common";
import { UserService } from "./user.service";
import { JwtService } from "@nestjs/jwt";
import { UserRegisterDto } from "src/dtos/user-register.dto";
import { UserLoginDto } from "src/dtos/user-login.dto";
import * as bcrypt from 'bcrypt';
import { Token } from "src/types/Token";
import { ConfigService } from "@nestjs/config";
import { User } from "src/entities/user.entity";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {}

    async register(user: UserRegisterDto): Promise<User> {
        const { username, email } = user;

        const existingUser = await this.userService.findByUsernameOrEmail(username, email);

        if (existingUser) {
            throw new ConflictException('User with this email or username already exists');
        }

        const hash = await bcrypt.hash(user.password, 10);
        return await this.userService.createUser({
            ...user,
            password: hash
        });
    }

    async validateUser(loginData: UserLoginDto): Promise<any> {
        const user = await this.userService.findByEmail(loginData.email);

        if (!user) {
            throw new BadRequestException("User does not exist");
        }

        const isMatch = await bcrypt.compare(loginData.password, user.password);

        if (!isMatch) {
            throw new BadRequestException("Passwords do not match");
        }

        const accessToken = await this.generateToken(
            {
                id: user.id,
                email: loginData.email,
                roles: user.roles,
                type: 'access'
            },
            this.configService.get<string>('JWT_ACCESS_EXPIRATION')
        );

        const refreshToken = await this.generateToken(
            {
                id: user.id,
                email: loginData.email,
                roles: user.roles,
                type: 'refresh'
            },
            this.configService.get<string>('JWT_REFRESH_EXPIRATION')
        );

        return {
            accessToken,
            refreshToken,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
            }
        };
    }

    async generateToken(payload: Token, expiresIn: string): Promise<string> {
        return await this.jwtService.signAsync(payload, { expiresIn });
    }

    async verifyToken(token: string): Promise<Token> {
        return await this.jwtService.verifyAsync(token);
    }
}