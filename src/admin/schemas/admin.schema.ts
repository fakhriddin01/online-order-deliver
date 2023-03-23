import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AdminDocument = HydratedDocument<Admin>;

@Schema()
export class Admin {
  @Prop()
  full_name: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  hashed_password: string;
 
  @Prop()
  phone_number: string;

  @Prop()
  email: string;

  @Prop()
  tg_link: string;

  @Prop()
  is_creator: boolean;

  @Prop()
  is_active: boolean;

  @Prop()
  hashed_token: string;

  @Prop()
  description: string;

}

export const AdminSchema = SchemaFactory.createForClass(Admin);