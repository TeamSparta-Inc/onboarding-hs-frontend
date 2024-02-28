import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


@Schema({
    timestamps: true,
  })

  export class User extends Document {

    @Prop()
    username : string;

    @Prop({ unique: [true, '중복된 이메일 입니다'] })
    email: string;
  
    @Prop()
    password: string;
  }
  
  export const UserSchema = SchemaFactory.createForClass(User);