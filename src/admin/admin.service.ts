import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin, AdminDocument } from './schemas/admin.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SigninAdminDto } from './dto/signin-admin.dto';
import { Response } from 'express';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { ActivateAdminDto } from './dto/activate-admin.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createAdminDto: CreateAdminDto, res: Response) {
    const {username, password} = createAdminDto

    const hashed_password = await bcrypt.hash(password, 7);
    const createdAdmin = new this.adminModel({
      username, 
      hashed_password
    });
    createdAdmin.save();

    const tokens = await this.generateToken(createdAdmin)
    const hashed_token = await bcrypt.hash(tokens.refresh_token, 7);
    const updatedAdmin = await this.adminModel.findByIdAndUpdate(createdAdmin._id.toString(), {hashed_token}, {new: true});

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15*24*60*60*1000,
      httpOnly: true
    })

    return {
      message: 'registrated',
      tokens,
      updatedAdmin
    }
  }

  async singin(singinAdminDto: SigninAdminDto, res:Response){
    const {username, password} = singinAdminDto

    const admin = await this.adminModel.findOne({username})
    
    if(!admin){
      throw new BadRequestException("Admin not found")
    }
    if(!admin.is_active){
      throw new UnauthorizedException("This admin is not active")
    }
    const varify = await bcrypt.compare(password, admin.hashed_password);
    if(!varify){
      throw new UnauthorizedException("Username or password not correct")

    }

    
    const tokens = await this.generateToken(admin);
    const hashed_token = await bcrypt.hash(tokens.refresh_token, 7);
    const updatedAdmin = await this.adminModel.findByIdAndUpdate(admin._id.toString(), {hashed_token}, {new: true});
    
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15*24*60*60*1000,
      httpOnly: true
    })

    return {
      message: "welcome to system",
      updatedAdmin,
      tokens
    };
  }

  async signout(refreshtoken: string, res: Response){
    
    const admin = await this.jwtService.verify(refreshtoken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    
    if(!admin){
      throw new UnauthorizedException('admin not found')
    }
    
    const getAdmin = await this.adminModel.findById(admin.id);
    
    const verify = await bcrypt.compare(refreshtoken, getAdmin.hashed_token);
    if(!verify){
      throw new UnauthorizedException('not authorized user')
    }

    const updatedAdmin = await this.adminModel.findByIdAndUpdate(admin.id, {hashed_token: null}, {new: true});
    
    res.clearCookie('refresh_token');
    const response = {
      message: 'User loged out',
      updatedAdmin
    };
    return response;
  }

  async updatePassword(id: string, updatePasswordDto: UpdatePasswordDto) {
    const admin = await this.adminModel.findById(id);

    if(!admin){
      throw new BadRequestException('admin not found')
    }

    const isCorrect = await bcrypt.compare(updatePasswordDto.old_password, admin.hashed_password);
    if(!isCorrect){
      throw new BadRequestException('Password not correct')
    }

    if(updatePasswordDto.new_password !== updatePasswordDto.verify_new_password){
      throw new BadRequestException('newpassword and varification not match')
    }

    const hashed_password = await bcrypt.hash(updatePasswordDto.new_password, 7);

    const updatedAdmin = await this.adminModel.findByIdAndUpdate(id, {hashed_password}, {new: true})

    return {
      message: "password updted",
      updatedAdmin
    }
  }

  async activateAdmin(activateAdminDto: ActivateAdminDto){
    const admin = await this.adminModel.findById(activateAdminDto.admin_id);
    if(!admin){
      throw new BadRequestException('admin not found')
    }
    if(admin.is_active){
      throw new BadRequestException('admin already active');
    }
    const updatedAdmin = await this.adminModel.findByIdAndUpdate(activateAdminDto.admin_id, {is_active: true}, {new: true});

    return {
      message: "admin status activated",
      updatedAdmin
    }
  }

  async deactivateAdmin(activateAdminDto: ActivateAdminDto){
    const admin = await this.adminModel.findById(activateAdminDto.admin_id);
    if(!admin){
      throw new BadRequestException('admin not found')
    }
    if(!admin.is_active){
      throw new BadRequestException('admin already deactivated');
    }
    if(admin.is_creator){
      throw new BadRequestException('you can not deactivate this admin');
    }
    const updatedAdmin = await this.adminModel.findByIdAndUpdate(activateAdminDto.admin_id, {is_active: false}, {new: true});

    return {
      message: "admin status deactivated",
      updatedAdmin
    }
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


  async generateToken(admin: AdminDocument){
    const jwtPayload = {id: admin._id, is_creator: admin.is_creator, is_active: admin.is_active }

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME
      }),
    ])

    const response = {
      access_token: accessToken,
      refresh_token: refreshToken
    }
    return response;
  }
}
