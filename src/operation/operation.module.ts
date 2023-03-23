import { Module } from '@nestjs/common';
import { OperationService } from './operation.service';
import { OperationController } from './operation.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Operation, OperationSchema } from './schemas/operation.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [MongooseModule.forFeature([{ name: Operation.name, schema: OperationSchema }]), JwtModule.register({})],
  controllers: [OperationController],
  providers: [OperationService]
})
export class OperationModule {}
