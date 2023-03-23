import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { StatusService } from './status.service';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { IsCreator } from '../guards/is-creator.guard';
import { JwtGuard } from '../guards/jwt-auth.guard';

@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @UseGuards(IsCreator)
  @UseGuards(JwtGuard)
  @Post()
  create(@Body() createStatusDto: CreateStatusDto) {
    return this.statusService.create(createStatusDto);
  }

  @UseGuards(JwtGuard)
  @Get()
  findAll() {
    return this.statusService.findAll();
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.statusService.findOne(id);
  }

  @UseGuards(IsCreator)
  @UseGuards(JwtGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStatusDto: UpdateStatusDto) {
    return this.statusService.update(id, updateStatusDto);
  }

  @UseGuards(IsCreator)
  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.statusService.remove(id);
  }
}
