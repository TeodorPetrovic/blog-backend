import { BadRequestException, Injectable } from "@nestjs/common";
import { UserService } from "./user.service";
import { JwtService } from "@nestjs/jwt";
import { UserRegisterDto } from "src/dtos/user-register.dto";
import { UserLoginDto } from "src/dtos/user-login.dto";
import * as bcrypt from 'bcrypt';
import { Token } from "src/types/Token";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {}

    async register(user: UserRegisterDto) {
        const hash = await bcrypt.hash(user.password, 10);
        return await this.userService.createUser({
            ...user,
            password: hash
        });
    }

    async validateUser(loginData: UserLoginDto): Promise<any> {
        const user = await this.userService.findByEmail(loginData.email);

        if (!user) {
            throw new BadRequestException();
        }

        const isMatch = await bcrypt.compare(user.password, loginData.password);

        if (!isMatch) {
            throw new BadRequestException();
        }

        const accessToken = this.generateToken(
            {
                email: loginData.email,
                type: 'access'
            },
            this.configService.get<string>('JWT_EXPIRATION')
        )
        
        const refreshToken = this.generateToken(
            {
                email: loginData.email,
                type: 'refresh'
            },
            this.configService.get<string>('JWT_EXPIRATION')
        )

        return {
            accessToken,
            refreshToken,
            user: user
        }
      
    }

    async generateToken(payload: Token, expiresIn: string): Promise<string> {
        return await this.jwtService.signAsync(payload, { expiresIn: expiresIn });
    }
    
    async verifyToken(token: string): Promise<Token> {
        return await this.jwtService.verify(token);
    }
}