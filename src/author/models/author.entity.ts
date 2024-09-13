import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Book } from "src/book/schema/book.schema";

export type AuthorDocument = HydratedDocument<Author>


@Schema({versionKey:false})
export class Author{
    @Prop({required:true})
    name:string;
    @Prop({})
    biography:string
}


export const AuthorSchema = SchemaFactory.createForClass(Author)
