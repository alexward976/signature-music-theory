import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        console.error("Error fetching users: ", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const getUserById = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid User Id"});
    }

    try {
        const user = await User.findById(id);
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        console.error(`Error fetching user with id ${id}`, error.message);        
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const createUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: "User already exists" });
        }

        let isLesson1Complete = false;
        let isLesson2Complete = false;

        user = new User({ name, email, password, isLesson1Complete, isLesson2Complete });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: { id: user.id }
        }

        jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: 3600 },
        (err, token) => {
            if (err) throw err;
            res.json({ token });
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
}

export const updateUser = async (req, res) => {
    const { id } = req.params;

    const user = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid User Id"});
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(id, user, {new: true});
        res.status(200).json({ success: true, data: updatedUser });
    } catch (error) {
        console.error("Error updating user: ", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const deleteUser = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid User Id"});
    }

    try {
        await User.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "User deleted" });
    } catch (error) {
        console.error("Error deleting user: ", error.message);
        res.status(500).json({ success: false, message: "Server Error"});
    }
}

export const checkUser = async (req, res) => {
    const {email, password} = req.body;

    try {
        let user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        const payload = {
            user: { id: user.id }
        }

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 },
        (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}