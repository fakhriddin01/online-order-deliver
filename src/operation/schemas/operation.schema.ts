import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type OperationDocument = HydratedDocument<Operation>;

@Schema()
export class Operation {

    @Prop({type:mongoose.Schema.Types.ObjectId, ref: 'Order'})
    order_id: mongoose.Schema.Types.ObjectId;

    @Prop({type:mongoose.Schema.Types.ObjectId, ref: 'Status'})
    status_id: mongoose.Schema.Types.ObjectId;

    @Prop({type:mongoose.Schema.Types.ObjectId, ref: 'Admin'})
    admin_id: mongoose.Schema.Types.ObjectId;

    @Prop({ default: Date.now() })
    Operation_date: Date;

    @Prop()
    description: string;

}

export const OperationSchema = SchemaFactory.createForClass(Operation);