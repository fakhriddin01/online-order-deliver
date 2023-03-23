import { Injectable } from '@nestjs/common';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Status, StatusDocument } from './schemas/status.schema';
import { Model } from 'mongoose';

@Injectable()
export class StatusService {

  constructor(@InjectModel(Status.name) private statusModel: Model<StatusDocument>) {}

  create(createStatusDto: CreateStatusDto) {
    const createdStatus = new this.statusModel(createStatusDto);
  
    return createdStatus.save();
  }

  findAll() {
    return this.statusModel.find().exec();
  }

  findOne(id: string) {
    return this.statusModel.findById(id);
  }

  update(id: string, updateStatusDto: UpdateStatusDto) {
    return this.statusModel.findByIdAndUpdate(id, updateStatusDto, {new:true});
  }

  remove(id: string) {
    return this.statusModel.findByIdAndRemove(id);
  }
}
