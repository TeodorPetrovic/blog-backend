import { Injectable } from "@nestjs/common";
import { User } from "src/entities/user.entity";
import { UserRepository } from "src/repositories/user.repository";

@Injectable()
export class UserService {
    constructor( private userRepository: UserRepository) {}

    async findByEmail(email: string): Promise<User | null> {
        return await this.userRepository.findByEmail(email);
    }

    async createUser(user: Partial<User>): Promise<User> {
        return await this.userRepository.create(user);
    }

    async findByUsernameOrEmail(username: string, email: string): Promise<User | null> {
        return await this.userRepository.findOne({
            $or: [{ username }, { email }]
        });
    }
}