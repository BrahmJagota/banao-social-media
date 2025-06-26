import { Request, Response } from "express";
import { UserModel, HobbyModel } from "../database/models";
import { AuthenticatedRequest } from "../middleware/authMiddleware";

// Create a hobby and associate with user
export const createHobby = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      res.status(400).json({ message: "Hobby name is required" });
      return;
    }

    const hobby = await HobbyModel.create({ name, description });

    await UserModel.findByIdAndUpdate(req.userId, {
      $push: { hobbies: hobby._id },
    });

    res.status(201).json(hobby);
  } catch (err) {
    res.status(500).json({ message: "Failed to create hobby" });
  }
};

// Get all hobbies of the user
export const getUserHobbies = async ( req: AuthenticatedRequest, res: Response) => {
  try {
    const user = await UserModel.findById(req.userId).populate("hobbies");

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.json(user.hobbies);
  } catch (err) {
    res.status(500).json({ message: "Failed to get hobbies" });
  }
};

// Delete a hobby and remove reference from user
export const deleteHobby = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const hobbyId = req.params.id;

    const deleted = await HobbyModel.findByIdAndDelete(hobbyId);
    if (!deleted) { 
        res.status(404).json({ message: "Hobby not found" });
        return;
    }


    await UserModel.findByIdAndUpdate(req.userId, {
      $pull: { hobbies: hobbyId },
    });

    res.json({ message: "Hobby deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete hobby" });
  }
};

export const getHobbies = async (req: Request, res: Response) => {
  try {
    const hobbies = await HobbyModel.find();
    res.status(200).json(hobbies);
  } catch (error) {
    console.error('Error fetching hobbies:', error);
    res.status(500).json({ message: 'Failed to fetch hobbies', error });
  }
};