import User from "../models/userSchema.js";
import bcrypt from "bcryptjs";

const getAllUser = async (req, res, next) => {
    let users;
    try {
        users = await User.find();
    }catch (err){
        console.log(err);
    }
    if(!users){
        return res.status(404).json({message:"No user found"});
    }
    return res.status(200).json({users});
};
export const signUp = async(req, res, next) => {
    const {name, email, password} = req.body;
    let existingUser;
    try{
        existingUser = await User.findOne({email});
    }catch(err) {
        console.log(err);
    }
    if(existingUser){
        return res.status(400).json({message:"User exists...You can Login"});
    }
    const hashedPassword = bcrypt.hashSync(password);
   const user = new User({
    name, 
    email,
    password:hashedPassword,
    blogs: []
   });
   
   try{
        await user.save();
    } catch (err) {
        console.log(err)
    }
    return res.status(201).json({user});
}

 export const login = async (req, res, next) => {
    const {email, password} = req.body;
    let existingUser;
    try{
        existingUser = await User.findOne({email});
    }catch(err){
        console.log(err);
    }
    if(!existingUser){
        res.status(404).json({message:"Couldn't find user by this email"});
    }
    const isPasswordCorrect = bcrypt.compareSync( password , existingUser.password);
    if(!isPasswordCorrect){
        return res.status(400).json({message:"Incorrect password"});
    }
    return res.status(200).json({message:"Successful Login", user:existingUser});
}
export default getAllUser;