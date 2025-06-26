import { prop, getModelForClass, Ref } from "@typegoose/typegoose";

export class User {
  @prop({ required: true, type: () =>  String })
  public fullName!: string;

  @prop({ required: true, unique: true, type: () =>  String })
  public email!: string;

  @prop({ required: true, type: () =>  String })
  public password!: string;

  @prop({ type: () => [String], ref: () => Hobby, default: [] })
public hobbies?: Ref<Hobby>[];

}

export class Hobby {
  @prop({ required: true, type: () =>  String })
  public name!: string;

  @prop({type: () =>  String})
  public description?: string;
}

export const UserModel = getModelForClass(User);
export const HobbyModel = getModelForClass(Hobby);
