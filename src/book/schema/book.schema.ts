import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Author } from "src/author/models/author.entity";
import { Category } from "src/category/models/category.entity";

export type BookDocument =  HydratedDocument<Book>;

@Schema({versionKey:false})
 export class Book{
    @Prop({required:true})
    title:string;

    @Prop({})
    publishedYear:number;
    @Prop()
    summary:string;

    @Prop({type:mongoose.Schema.Types.ObjectId, ref:'Author'})
    author_id:Author; 

    @Prop({type:mongoose.Schema.Types.ObjectId, ref:'Category'})
    category_id:Category;
 }

 export const BookSchema = SchemaFactory.createForClass(Book)