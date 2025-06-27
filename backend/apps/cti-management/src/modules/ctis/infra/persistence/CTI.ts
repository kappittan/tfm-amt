import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CTIDocument = HydratedDocument<CTI>;

@Schema()
export class CTI {
  @Prop()
  id: string;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop({ type: Object, required: true })
  content: any; // o simplemente: any

  @Prop()
  owner: string;

  @Prop()
  qualityValue: number;

  @Prop()
  sharedAt: Date;
}

export const CTISchema = SchemaFactory.createForClass(CTI);
