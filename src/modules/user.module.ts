import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/entities/user.entity";
import { UserRepository } from "src/repositories/user.repository";
import { UserService } from "src/services/user.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema}])],
    providers: [UserRepository, UserService],
    exports: [UserService]
})
export class UserModule {}