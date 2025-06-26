import { UserModel } from '../database/models';

export const createUserService = async (data: {
  fullName: string;
  email: string;
  password: string;
}) => {
  return await UserModel.create({data});
};

export const getUsersService = async () => {
 return await UserModel.find().populate('hobbies', 'name description');
};

export const getUserById = async (id: string) => {
  return await UserModel.findById({id})
}