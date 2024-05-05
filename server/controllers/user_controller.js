import userModel from "../models/user_models.js";

class userController {
    static getAllUsers = async (req, res) => {
        try {
            const allUsers = await userModel.find({});
            if (allUsers) {
                res.status(200).json(allUsers);
            }
        } catch (error) {
            res.status(400).json(error)
        }

    };

    static createUser = async (req, res) => {
        const { name, email, age } = req.body;
        // res.send(name)
        try {
            if (name && email && age) {
                const newUser = userModel({
                    name,
                    email,
                    age
                })
                const saved_user = await newUser.save();
                if (saved_user) {
                    res.status(201).json({ message: `User created successfulluy` })
                } else {
                    res.status(400).json({ message: 'Something went wrong' })
                }
            } else {
                res.status(400).json({ message: 'All fields required' })
            }
        } catch (error) {
            res.status(400).json(error)
        }
    }
    static getSingleUser = async (req, res) => {
        const { id } = req.params;
        try {
            const userFoundById = await userModel.findById(id);
            res.status(200).json(userFoundById)
        } catch (error) {
            res.status(400).json({ message: 'Something went wrong' })
        }
    }
    static updateUser = async (req, res) => {
        const { id } = req.params;
        try {
            if (id) {
                const getUpdatedData = await userModel.findByIdAndUpdate(id, req.body)
                res.status(200).json({ message: 'updated successfully' })
            } else {
                res.status(400).json({ message: 'User Not Found' })
            }

        } catch (error) {
            res.status(400).json({ message: 'Something went wrong' })
        }
    }
    static deletUser = async (req, res) => {
        const { id } = req.params;
        try {
            if (id) {
                const getDeletedUser = await userModel.findByIdAndDelete(id);
                res.status(200).json({ message: 'User deleted successfully' })
            } else {
                res.status(400).json({ message: "ID Not Found" })
            }
        } catch (error) {
            res.status(400).json({ message: "Something went wrong" })
        }
    }
}

export default userController;