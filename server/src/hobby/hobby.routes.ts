import { Router } from "express";
import { authenticateUser } from "../middleware/authMiddleware";
import { createHobby, getUserHobbies, deleteHobby, getHobbies } from "./hobby.controller";

const hobbyRouter = Router();


hobbyRouter.post("/create-hobby", createHobby);
hobbyRouter.get("/", getUserHobbies);
hobbyRouter.get("/get", getHobbies);
hobbyRouter.delete("/:id", deleteHobby);

export default hobbyRouter;
