import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/entities/user.entity";

@Injectable()
export class UserRepository {
    constructor( @InjectModel(User.name) private userModel: Model<User>) {}

    async findByEmail(email: string): Promise<User | null> {
        return this.userModel.findOne({ email });
    }

    async create(user: Partial<User>): Promise<User> {
        return new this.userModel(user).save()
    }
}