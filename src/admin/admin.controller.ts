import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Response } from 'express';
import { CookieGetter } from '../decorators/cookieGetter.decorator';
import { JwtGuard } from '../guards/jwt-auth.guard';
import { IsCreator } from '../guards/is-creator.guard';
import { AdminSelfGuard } from '../guards/user-self.guard';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { ActivateAdminDto } from './dto/activate-admin.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @UseGuards(IsCreator)
  @UseGuards(JwtGuard)
  @Post('create')
  create(@Body() createAdminDto: CreateAdminDto, @Res({ passthrough: true}) res: Response) {
    return this.adminService.create(createAdminDto, res);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin(@Body() createAdminDto: CreateAdminDto, @Res({ passthrough: true}) res: Response) {
    return this.adminService.singin(createAdminDto, res);
  }

  @HttpCode(HttpStatus.OK)
  // @UseGuards(JwtGuard)
  @Post('signout')
  signout(@CookieGetter('refresh_token') refreshtoken: string, @Res({ passthrough: true}) res: Response) {
    return this.adminService.signout(refreshtoken, res);
  }

  @Get()
  @UseGuards(IsCreator)
  @UseGuards(JwtGuard)
  findAll() {
    return this.adminService.findAll();
  }

  @UseGuards(AdminSelfGuard)
  @UseGuards(JwtGuard)
  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.adminService.findOneById(id);
  }

  @UseGuards(IsCreator)
  @UseGuards(JwtGuard)
  @Get('username/:username')
  findOneByUsername(@Param('username') username: string) {
    return this.adminService.findOneByUsername(username);
  }

  @UseGuards(IsCreator)
  @UseGuards(JwtGuard)
  @Post('activate')
  activateAdmin(@Body() activateAdminDto: ActivateAdminDto) {
    return this.adminService.activateAdmin(activateAdminDto);
  }

  @UseGuards(IsCreator)
  @UseGuards(JwtGuard)
  @Post('deactivate')
  deactivateAdmin(@Body() activateAdminDto: ActivateAdminDto) {
    return this.adminService.deactivateAdmin(activateAdminDto);
  }

  @UseGuards(AdminSelfGuard)
  @UseGuards(JwtGuard)
  @Patch('change-password/:id')
  updatePassword(@Param('id') id: string, @Body() updatePasswordDto: UpdatePasswordDto) {
    return this.adminService.updatePassword(id, updatePasswordDto);
  }

  @UseGuards(AdminSelfGuard)
  @UseGuards(JwtGuard)
  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(id, updateAdminDto);
  }

  @UseGuards(IsCreator)
  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(id);
  }
}
