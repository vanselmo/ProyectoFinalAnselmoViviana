import { usersService } from "../services/index.js"
import generateMockUsers from "../utils/mockusers.js";

const createUser = async(req,res) => {
    try {
        const user = req.body;
        await usersService.create(user);
        res.status(201).send({status:"success",payload:"User created"})
    } catch (error) {
        res.status(500).send("Error creating user");
    }
}

const getAllUsers = async(req,res)=>{
    const users = await usersService.getAll();
    res.send({status:"success",payload:users})
}

const getUser = async(req,res)=> {
    const userId = req.params.uid;
    const user = await usersService.getUserById(userId);
    if(!user) return res.status(404).send({status:"error",error:"User not found"})
    res.send({status:"success",payload:user})
}

const updateUser =async(req,res)=>{
    const updateBody = req.body;
    const userId = req.params.uid;
    const user = await usersService.getUserById(userId);
    if(!user) return res.status(404).send({status:"error", error:"User not found"})
    const result = await usersService.update(userId,updateBody);
    res.send({status:"success",message:"User updated"})
}

const deleteUser = async(req,res) =>{
    const userId = req.params.uid;
    const result = await usersService.getUserById(userId);
    res.send({status:"success",message:"User deleted"})
}

export const mockingUsers = async (req, res) => {
    const users = generateMockUsers(50);
    res.json(users);
};

export default {
    deleteUser,
    getAllUsers,
    getUser,
    updateUser,
    mockingUsers,
    createUser
}