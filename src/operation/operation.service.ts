import { Injectable } from '@nestjs/common';
import { CreateOperationDto } from './dto/create-operation.dto';
import { UpdateOperationDto } from './dto/update-operation.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Operation, OperationDocument } from './schemas/operation.schema';
import { Model } from 'mongoose';

@Injectable()
export class OperationService {

  constructor(@InjectModel(Operation.name) private operationModel: Model<OperationDocument>) {}

  create(createOperationDto: CreateOperationDto) {
    return new this.operationModel(createOperationDto).save();
  }

  findAll() {
    return this.operationModel.find().populate(['order_id', 'status_id', 'admin_id']);;
  }

  findOne(id: string) {
    return this.operationModel.findById(id);
  }

  update(id: string, updateOperationDto: UpdateOperationDto) {
    return this.operationModel.findByIdAndUpdate(id, updateOperationDto);
  }

  remove(id: string) {
    return this.operationModel.findByIdAndDelete(id);
  }
}
