// controllers/userController.js
import { User } from "../model/usermodel.js";
//import bcrypt from "bcrypt";
//import jwt from "jsonwebtoken";
import { Op } from "sequelize";

// Registrasi user baru
export const registerUser = async (req, res) => {
    const { username, email, password, full_name } = req.body;

    try {
        const existingUser = await User.findOne({
            where: { [Op.or]: [{ username }, { email }] }
        });
        if (existingUser) {
            return res.status(400).json({ message: "Username atau email sudah digunakan" });
        }

        //const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            email,
            password_hash: password,
            full_name
        });

        res.status(201).json({ message: "User berhasil dibuat!" });
    } catch (err) {
        console.error('Error registering user:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Login user
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: "Email atau password salah" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Email atau password salah" });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        console.error('Error logging in user:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update user profile
export const updateUserProfile = async (req, res) => {
    const userId = req.user.id;  // Ambil dari middleware auth
    const { full_name, profile_picture } = req.body;

    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "User tidak ditemukan" });
        }

        user.full_name = full_name || user.full_name;
        user.profile_picture = profile_picture || user.profile_picture;

        await user.save();
        res.json({ message: "Profil berhasil diperbarui" });
    } catch (err) {
        console.error('Error updating profile:', err);
        res.status(500).json({ message: 'Server error' });
    }
};
