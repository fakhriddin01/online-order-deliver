import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CurrencyTypeService } from './currency_type.service';
import { CreateCurrencyTypeDto } from './dto/create-currency_type.dto';
import { UpdateCurrencyTypeDto } from './dto/update-currency_type.dto';
import { IsCreator } from '../guards/is-creator.guard';
import { JwtGuard } from '../guards/jwt-auth.guard';

@Controller('currency-type')
export class CurrencyTypeController {
  constructor(private readonly currencyTypeService: CurrencyTypeService) {}

  @UseGuards(IsCreator)
  @UseGuards(JwtGuard)
  @Post('create')
  create(@Body() createCurrencyTypeDto: CreateCurrencyTypeDto) {
    return this.currencyTypeService.create(createCurrencyTypeDto);
  }

  @UseGuards(IsCreator)
  @UseGuards(JwtGuard)
  @Get()
  findAll() {
    return this.currencyTypeService.findAll();
  }

  @UseGuards(IsCreator)
  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.currencyTypeService.findOne(id);
  }

  @UseGuards(IsCreator)
  @UseGuards(JwtGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCurrencyTypeDto: UpdateCurrencyTypeDto) {
    return this.currencyTypeService.update(+id, updateCurrencyTypeDto);
  }

  @UseGuards(IsCreator)
  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.currencyTypeService.remove(id);
  }
}
