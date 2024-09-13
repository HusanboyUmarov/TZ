import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { QueryCategoryDto } from './dto/query.category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category, CategoryDocument } from './models/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel:Model<CategoryDocument>
  ){}
  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const data = await this.categoryModel.find({name:createCategoryDto.name})
      if(data.length)
      throw new BadRequestException({message:'Category allready exsist'})
      return this.categoryModel.create(createCategoryDto)
    } catch (error) {
      return error
    }  
  }

  async findAll(query:QueryCategoryDto) {
  try {
    const queryObject = query.search ?{
      name:{
        $regex: query.search,
        $options: 'i'
      }
    }:{}

    const data = await this.categoryModel.find(queryObject)
    console.log(data)
    return data
  } catch (error) {
    return error
  }
  }

  findOne(id: string) {
  try {
    if(!mongoose.isValidObjectId(id))
    throw new BadRequestException({message:'Ivalid id'})

    return this.categoryModel.findById(id)
  } catch (error) {
    return error
    
  }
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    try {
      if(!mongoose.isValidObjectId(id))
    throw new BadRequestException({message:'Ivalid id'})
      const data = await this.categoryModel.find({name:updateCategoryDto.name})
      if(data.length)
      throw new BadRequestException({message:'Category allready exsist'})
      const updatedata = await this.categoryModel.findByIdAndUpdate(id, updateCategoryDto).exec()
      const new_category = await this.categoryModel.findById(id)
      console.log(new_category)
      return new_category
     
    } catch (error) {
      return error
    }
  }

  async remove(id: string) {
    try {
      if(!mongoose.isValidObjectId(id))
    throw new BadRequestException({message:'Ivalid id'})
      const data = await this.categoryModel.findByIdAndDelete(id)
      return {message:'Successfully'}
    } catch (error) {
      return error
    };
  }
}
