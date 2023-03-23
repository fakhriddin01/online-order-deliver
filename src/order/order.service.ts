import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument } from './schemas/order.schema';
import { Model } from 'mongoose';
import { stringify } from 'querystring';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order.name) private orderModel: Model<OrderDocument>) {}

  async create(createOrderDto: CreateOrderDto) {

    const createOrder = await new this.orderModel(createOrderDto).save();

    const updatedOrder = await this.orderModel.findByIdAndUpdate(createOrder._id.toString(), {order_unique_id: createOrder._id.toString()}, {new: true}).populate('currency_type_id')
    
    return updatedOrder;
  }

  findAll() {
    return this.orderModel.find().populate('currency_type_id');
  }
  
  findOne(id: string) {
    return this.orderModel.findById(id).populate('currency_type_id');
  }

  update(id: string, updateOrderDto: UpdateOrderDto) {
    return this.orderModel.findByIdAndUpdate(id, updateOrderDto, {new: true}).populate('currency_type_id');
  }

  remove(id: string) {
    return this.orderModel.findByIdAndRemove(id);
  }
}
