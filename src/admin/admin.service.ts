import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin, AdminDocument } from './schemas/admin.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin.name) private adminModel: Model<AdminDocument>) {}

  async create(createAdminDto: CreateAdminDto): Promise<Admin> {
    const {username, password} = createAdminDto

    const hashed_password = await bcrypt.hash(password, 7);
    const createdAdmin = new this.adminModel({
      username, 
      hashed_password
    });
  
    return createdAdmin.save();
  }

  async findAll(): Promise<Admin[]> {
    const admins = await this.adminModel.find().exec()
    return admins;
  }


  findOneById(id: string) {
    return this.adminModel.findById(id).exec();
  }

  findOneByUsername(username: string) {
    return this.adminModel.findOne({username}).exec();
  }

  async update(id: string, updateAdminDto: UpdateAdminDto) {
    const existingAdmin = await this.adminModel.findByIdAndUpdate(id, updateAdminDto, { new: true }).exec();
   if (!existingAdmin) {
     throw new NotFoundException(`Student #${id} not found`);
   }
   return existingAdmin;
  }

  remove(id: string) {
    return this.adminModel.findByIdAndDelete(id);
  }
}
