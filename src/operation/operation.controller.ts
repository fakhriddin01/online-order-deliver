import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { OperationService } from './operation.service';
import { CreateOperationDto } from './dto/create-operation.dto';
import { UpdateOperationDto } from './dto/update-operation.dto';
import { JwtGuard } from '../guards/jwt-auth.guard';
import { AdminSelfGuard } from '../guards/user-self.guard';
import { IsCreator } from '../guards/is-creator.guard';

@Controller('operation')
export class OperationController {
  constructor(private readonly operationService: OperationService) {}

  @UseGuards(JwtGuard)
  @Post()
  create(@Body() createOperationDto: CreateOperationDto) {
    return this.operationService.create(createOperationDto);
  }

  @UseGuards(JwtGuard)
  @Get()
  findAll() {
    return this.operationService.findAll();
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.operationService.findOne(id);
  }

  @UseGuards(IsCreator)
  @UseGuards(JwtGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOperationDto: UpdateOperationDto) {
    return this.operationService.update(id, updateOperationDto);
  }

  @UseGuards(IsCreator)
  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.operationService.remove(id);
  }
}
