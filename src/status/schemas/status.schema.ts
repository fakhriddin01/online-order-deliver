import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type StatusDocument = HydratedDocument<Status>;

@Schema()
export class Status {
  @Prop()
  name: string;

  @Prop()
  description: string;

}

export const StatusSchema = SchemaFactory.createForClass(Status);