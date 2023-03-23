import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type OrderDocument = HydratedDocument<Order>;

@Schema()
export class Order {
  @Prop()
  order_unique_id: string;

  @Prop({ required: true })
  full_name: string;

  @Prop({ required: true })
  phone_number: string;

  @Prop()
  email: string;
 
  @Prop({ required: true })
  product_link: string;

  @Prop({ required: true })
  summa: number;

  @Prop({type:mongoose.Schema.Types.ObjectId, ref: 'CurrencyType'})
  currency_type_id: mongoose.Schema.Types.ObjectId;

  @Prop()
  truck: string;

  @Prop()
  description: string;

}

export const OrderSchema = SchemaFactory.createForClass(Order);