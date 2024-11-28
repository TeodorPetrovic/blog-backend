import { Injectable } from "@nestjs/common";
import { User } from "src/entities/user.entity";
import { UserRepository } from "src/repositories/user.repository";

@Injectable()
export class UserService {
    constructor( private userRepositoy: UserRepository) {}

    async findByEmail(email: string): Promise<User | null> {
        return await this.userRepositoy.findByEmail(email);
    }

    async createUser(user: Partial<User>): Promise<User> {
        return await this.userRepositoy.create(user);
    }
}