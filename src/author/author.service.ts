import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateAuthorDto } from './dto/create-author.dto';
import { QueryAutherDto } from './dto/query.author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Author, AuthorDocument } from './models/author.entity';

@Injectable()
export class AuthorService {
  constructor(
    @InjectModel(Author.name) private authorModel:Model<AuthorDocument>
  ){}
  async create(createAuthorDto: CreateAuthorDto) {
    try {
      const data = await this.authorModel.find({name:createAuthorDto.name})
      if(data.length)
      throw new BadRequestException({message:'Author allready exsist'})

      return this.authorModel.create(createAuthorDto)
    } catch (error) {
      return error
    }  
  }

  async findAll(query:QueryAutherDto) {
    try {

      const queryObject = query.search ?{
        name:{
          $regex: query.search, 
          $options: 'i'
        }
      }: {}
      return this.authorModel.find(queryObject)
    } catch (error) {
      return error.message
    };
  }

  async findOne(id: mongoose.Schema.Types.ObjectId) {
    try {
      if(!mongoose.isValidObjectId(id))
      throw new BadRequestException({message:'Invalid id'})
       const data = await this.authorModel.findById(id)
       return data
    } catch (error) {
      return error.message
    };
  }

  async update(id: string, updateAuthorDto: UpdateAuthorDto) {
    try {
      if(!mongoose.isValidObjectId(id))
      throw new BadRequestException({message:'Invalid id'})
      const data = await this.authorModel.find({name:updateAuthorDto.name})
      if(data.length)
      throw new BadRequestException({message:'Author allready exsist'})
      const new_data = await this.authorModel.findByIdAndUpdate(id, updateAuthorDto)
      console.log(new_data)
      return new_data
    } catch (error) {
      return error.message
    };
  }

  async remove(id: string) {
    try {
      if(!mongoose.isValidObjectId(id))
      throw new BadRequestException({message:'Invalid id'})
      const data = await this.authorModel.findByIdAndDelete(id)
      return {message:'Successfully'}
    } catch (error) {
      return error.message
    };
  }
}
