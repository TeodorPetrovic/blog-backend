import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export interface Comment {
    user: Types.ObjectId;
    content: string;
    createdAt: Date;
}

@Schema({ timestamps: true })
export class Blog extends Document {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    content: string;

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    author: string;

    @Prop({ type: [String], default: [] })
    tags: string[];

    @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
    category: string;

    @Prop({
        type: [
            {
                user: { type: Types.ObjectId, ref: 'User', required: true },
                content: { type: String, required: true },
                createdAt: { type: Date, default: Date.now },
            },
        ],
        default: [],
    })
    comments: Comment[];
}

export const BlogSchema = SchemaFactory.createForClass(Blog);