import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose/dist';
import { Order, OrderSchema } from './schemas/order.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]), JwtModule.register({})],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
