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

  @Prop()
  content: string; // This is the STIX object content

  @Prop()
  owner: string;

  @Prop()
  qualityValue: number;

  @Prop()
  sharedAt: Date;
}

export const CTISchema = SchemaFactory.createForClass(CTI);
