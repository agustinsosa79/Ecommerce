import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"


export const register = async (req , res) => {
    const { name, email, password } = req.body;
    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    try {
        const userExists = await userModel.findOne({ email });
        if (userExists) {
            return res.status(409).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new userModel({ name, email, password: hashedPassword });
        await user.save();
        const accesToken = jwt.sign({ id: user._id }, jwtSecretKey, { expiresIn: '1h' });
        const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET_KEY, { expiresIn: '7d' });
        res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'Strict', maxAge: 7 * 24 * 60 * 60 * 1000});
        res.status(201).json({ message: "User registered successfully", token: accesToken });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const refreshToken = async (req, res) => {
    const  token  = req.cookies.refreshToken
    if (!token) return res.status(401).json({message: 'no token provied'})
    const jwtRefreshSecretKey = process.env.JWT_REFRESH_SECRET_KEY
    try {
        const payload = jwt.verify(token, jwtRefreshSecretKey)
        const user = await userModel.findById(payload.id)
        if (!user) return res.status(401).json({ message: "user not found"})
        const accessToken = jwt.sign({ id: user._id}, process.env.JWT_SECRET_KEY, { expiresIn: '1h'})
        res.json({ accessToken })
    } catch (error) {
        res.status(403).json({ message: "token invalid"})
    }
}


export const login = async (req, res) => {
    const { email, password } = req.body;
    const jwtSecretToken = process.env.JWT_SECRET_KEY
    const jwtRefreshSecretKey = process.env.JWT_REFRESH_SECRET_KEY
    try {
        const userExists = await userModel.findOne({ email });
        if (!userExists) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const isMatched = await bcrypt.compare(password, userExists.password);
        if (!isMatched) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const accesToken = jwt.sign({ id: userExists._id}, jwtSecretToken, { expiresIn: '1h'})
        const refreshToken = jwt.sign({id: userExists._id}, jwtRefreshSecretKey, { expiresIn: '7d' })
        res.cookie('refreshToken', refreshToken, {httpOnly: true, secure: true, sameSite: 'Strict', maxAge: 7*24*60*60*1000})
        res.status(200).json({ message: "Login successful", token: accesToken });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}



export const logout = async (req, res) => {
    res.clearCookie('refreshToken', {httpOnly: true, secure: true, sameSite: 'Strict'})
    res.status(200).json({message: "logout successful"})
}