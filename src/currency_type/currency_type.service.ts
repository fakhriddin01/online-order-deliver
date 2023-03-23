import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCurrencyTypeDto } from './dto/create-currency_type.dto';
import { UpdateCurrencyTypeDto } from './dto/update-currency_type.dto';
import { InjectModel } from '@nestjs/mongoose';
import { CurrencyType, CurrencyTypeDocument } from './schemas/currency_type.schema';
import { Model } from 'mongoose';

@Injectable()
export class CurrencyTypeService {
  constructor(@InjectModel(CurrencyType.name) private currencyTypeModel: Model<CurrencyTypeDocument>) {}

  async create(createCurrencyTypeDto: CreateCurrencyTypeDto) {
    const {name, description} = createCurrencyTypeDto

    const createdCurrency = new this.currencyTypeModel({
      name, 
      description
    });
  
    return createdCurrency.save();
  }

  async findAll(): Promise<CurrencyType[]> {
    const currencies = await this.currencyTypeModel.find().exec()
    return currencies;
  }

  findOne(id: string) {
    return this.currencyTypeModel.findById(id).exec();
  }

  async update(id: number, updateCurrencyTypeDto: UpdateCurrencyTypeDto) {
    const existingCurrency = await this.currencyTypeModel.findByIdAndUpdate(id, updateCurrencyTypeDto, { new: true }).exec();
   if (!existingCurrency) {
     throw new NotFoundException(`currency #${id} not found`);
   }
   return existingCurrency;
  }

  remove(id: string) {
    return this.currencyTypeModel.findByIdAndDelete(id);

  }
  
}
