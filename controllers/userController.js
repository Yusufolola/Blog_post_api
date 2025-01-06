const Jwt = require('jsonwebtoken');
const path = require('path');
const HttpError = require(path.resolve(__dirname, '../models/errorModel.js'));
//const HttpError = require("../models/errorModel.js")
console.log(HttpError);
const User = require("../models/User/User")
const bcrypt = require("bcryptjs")


// protected only admin can access
const getAllusers = async (req, res, next) => {
    try {
        const users = await User.find().select("-password");
        res.json(users);
    } catch (error) {
        return next(new HttpError(error))

    }
}


//it should be protected so that only authorized users or the user themselves can view their data.
const getUserById = async (req, res, next) => {
    const {id} = req.params
    try {
        const user = await User.findById(id)
        res.json({
            status:"success",
            data:user
        })
    } catch (error) {
        return next(new HttpError(error.message))
    }
}

//unprotected
const registerUser = async (req, res, next) => {
    try {
        const { firstName, lastName, email, password, password2 } = req.body;

        // Check if all fields are provided
        if (!firstName || !lastName || !email || !password || !password2) {
            return next(new HttpError("Please input all fields", 422));
        }

        const newEmail = email.toLowerCase();

        // Check if the email already exists
        const notNewEmail = await User.findOne({ email: newEmail });
        if (notNewEmail) {
            return next(new HttpError("Email already exists", 422));
        }

        // Ensure password is at least 7 characters
        if (password.trim().length < 7) {
            return next(new HttpError("Password should not be less than 7 characters", 422));
        }

        // Check if passwords match
        if (password !== password2) {
            return next(new HttpError("Passwords do not match", 422));
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = await User.create({
            firstName,
            lastName,
            email: newEmail,
            password: hashedPassword
        });

        // Send success response
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.log(error);
        
        return next(new HttpError("User registration failed", 500));
    }
};

//unprotected
const loginUser = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return next(new HttpError("Please input all fields"), 422)
        }
        const newEmail = email.toLowerCase();
        const user = await User.findOne({email: newEmail})
        if(!user) {
            return next(new HttpError("Invalid email or password", 422))
        }

        const comparePassword = await bcrypt.compare(password, user.password)
        if(!comparePassword) {
            return next(new HttpError("Invalid email or password", 422))
        }
        const {_id: id , name } = user;
        const token = Jwt.sign({id, name}, process.env.JWT_KEY, {expiresIn: "1d" })
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000
        }).status(200).json({ message: 'Login successful', name, id });
    } catch (error) {
        console.error(error);
        return next(new HttpError("login failed, please verify credentials", 422))
        
    }
}

const logoutUser = (req, res, next) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'None'
        }).status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.log(error)
        return next(new HttpError("Logout failed", 500));
    }
}

// protected to prevent unauthorized users from making changes.
const updateUser = async (req, res, next) => {
    try {
        const { currentPassword, newPassword, confirmNewPassword} = req.body;
        if(!name || !email || !currentPassword || !newPassword) {
            return next(new HttpError("fill all required fields", 400))
        }

        const userToUpdate = await User.findById(req.user.id);
        if(!userToUpdate) {
            return next(new HttpError("User not found", 404));
        }

        const passwordMatch = await bcrypt.compare(currentPassword, userToUpdate.password);
        
        if (!passwordMatch) {
            return next(new HttpError("Current password is incorrect", 401));
        }

        if (newPassword !== confirmNewPassword) {
            return next(new HttpError("New password do not match", 400))
        }

        
        const hashedPassword = await bcrypt.hash(newPassword, 10); 
        
        userToUpdate.password = hashedPassword;
        await userToUpdate.save();

        
        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        return next(new HttpError("Failed to update password", 500));
    }
};

// protected to prevent unauthorized users from making changes.
const deleteUser = async (req, res, next) => {
    res.json({message: "deleted"});
}

// protected to prevent unauthorized users from making changes.
const changeRole = async (req, res, next) => {
    res.json({message: "role changed"});
}
module.exports = {getAllusers, getUserById, registerUser,
    loginUser,logoutUser, updateUser, deleteUser, changeRole}