import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";


export type CategoryDocument = HydratedDocument<Category>

@Schema({versionKey:false})
export class Category{

    @Prop({required:true})
    name:string;

    @Prop({})
    description:string

}

export const SchemaCategory = SchemaFactory.createForClass(Category)
