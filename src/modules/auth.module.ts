import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { UserModule } from "./user.module";
import { AuthService } from "src/services/auth.service";
import { AuthController } from "src/controllers/auth.controller";
import { JwtStrategy } from "src/strategy/jwt.strategy";

@Module({
    imports: [
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
              secret: configService.get<string>('JWT_ACCESS_SECRET'),
              signOptions: { 
                expiresIn: configService.get<string>('JWT_EXPIRATION')
              },
            }),
            inject: [ConfigService],
        }),
        UserModule
    ],
    providers: [AuthService, JwtStrategy],
    controllers: [
        AuthController
    ]
})
export class AuthModule {}