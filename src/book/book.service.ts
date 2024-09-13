import { Injectable , BadRequestException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { isValidObjectId, Model } from 'mongoose';
import { Author, AuthorDocument } from 'src/author/models/author.entity';
import { Category, CategoryDocument } from 'src/category/models/category.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { QueryBookDto } from './dto/query.book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book, BookDocument } from './schema/book.schema';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name) private bookModel:Model<BookDocument>,
    @InjectModel(Category.name) private categoryModel:Model<CategoryDocument>,
    @InjectModel(Author.name) private authorModel:Model<AuthorDocument>
  ){}
  async create(createBookDto: CreateBookDto) {
    try {
      const {title, category_id, author_id } = createBookDto
       if(!(mongoose.isValidObjectId(category_id) && mongoose.isValidObjectId(author_id)))
        throw new BadRequestException({message:'category or author invalid id'})

      const category_data = await this.categoryModel.find({id:category_id})
       if(category_data.length)
        throw new BadRequestException({message:'category is not exsist.'})

      const author_data = await this.authorModel.find({id:author_id})
       if(author_data.length)
        throw new BadRequestException({message:'user does not exsist'})

      const bookTitle = await this.bookModel.find({title})
      console.log(bookTitle)
       if(bookTitle.length)
        throw new BadRequestException({message:'title allready exsist'})

      const data = await this.bookModel.create(createBookDto)
      return data

    } catch (error) {
      return error
    }
  }

  async findAll(query:QueryBookDto) {
    try {
      console.log(query)
      const queryObject = query.search ?{
        title:{
          $regex: query.search,
          $options:'i'
        }
      }: {}
      
      const limit = Number(query.limit || 5);
      const skip = (Number(query.skip || 1) -1) * limit 
      return  await this.bookModel.find(queryObject)
      .limit(limit)
      .skip(skip)

      

    } catch (error) {
       return error
    }
  }

  async findOne(id: string) {
    try {
      if(!isValidObjectId(id))
       throw new BadRequestException({message:'Invalid id'})
       const book = await this.bookModel.findById(id)
       console.log(book)
       if(book == null)
        throw new BadRequestException({message:'book does not exsist'})
      return book
    } catch (error) {
       return error
    }
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    try {
      const {title, category_id, author_id } = updateBookDto
      
      // checking book id
      if(!mongoose.isValidObjectId(id))
       throw new BadRequestException({message:'Invalid book id'})
      
      // checking category and it's id
      if(!(category_id == undefined))
       {
        if(!mongoose.isValidObjectId(category_id))
        throw new BadRequestException({message:'ínvalid category id'})

       const category_data = await this.categoryModel.findById(category_id)

       if(!category_data.name.length)
        throw new BadRequestException({message:'category is not exsist.'})
       }
       
      // checking author and his or her id
      if(!(author_id == undefined))
       {
        if(!mongoose.isValidObjectId(author_id))
          throw new BadRequestException({message:'ínvalid author id'})

         const author_data = await this.authorModel.findById(author_id)
         
          if(!author_data.name.length)
           throw new BadRequestException({message:'author does not exsist'})
           
        } 
      // checking book 
      const bookTitle = await this.bookModel.find({title})
      console.log(bookTitle.length)
       if(bookTitle.length)
        throw new BadRequestException({message:'title allready exsist'})

      // created new book
      const data = await this.bookModel.findByIdAndUpdate(id, updateBookDto)
      
      return this.bookModel.findById(id)
    } catch (error) {
      return error
    }
  }

  async remove(id: string) {
    try {
      if(!mongoose.isValidObjectId(id))
       throw new BadRequestException({message:'invalid book id'})
      
      const data = await this.bookModel.findByIdAndDelete(id)
      return {message:'successfully'}

    } catch (error) {
      return error
    }
  }
}
