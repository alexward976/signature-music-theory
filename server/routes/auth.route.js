import express from "express";
import { getUsers, getUserById, createUser, updateUser, deleteUser, checkUser } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

router.post("/login", checkUser);

export default router;