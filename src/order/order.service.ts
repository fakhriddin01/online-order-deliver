import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument } from './schemas/order.schema';
import { Model } from 'mongoose';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order.name) private orderModel: Model<OrderDocument>) {}

  create(createOrderDto: CreateOrderDto) {

    const createOrder = new this.orderModel(createOrderDto);
    return createOrder.save();
  }

  findAll() {
    return this.orderModel.find().populate('currency_type_id');
  }
  
  findOne(id: string) {
    return this.orderModel.findById(id);
  }

  update(id: string, updateOrderDto: UpdateOrderDto) {
    return this.orderModel.findByIdAndUpdate(id, updateOrderDto, {new: true});
  }

  remove(id: string) {
    return this.orderModel.findByIdAndRemove(id);
  }
}
