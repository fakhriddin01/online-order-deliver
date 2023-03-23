import { Module } from '@nestjs/common';
import { CurrencyTypeService } from './currency_type.service';
import { CurrencyTypeController } from './currency_type.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CurrencyType, CurrencyTypeSchema } from './schemas/currency_type.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: CurrencyType.name, schema: CurrencyTypeSchema }])],
  controllers: [CurrencyTypeController],
  providers: [CurrencyTypeService]
})
export class CurrencyTypeModule {}
