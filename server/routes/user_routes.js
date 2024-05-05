import express from "express";
import userController from "../controllers/user_controller.js";


const router = express.Router();

router.get("/users", userController.getAllUsers);
router.post("/createuser", userController.createUser);
router.get("/getsingleuser/:id", userController.getSingleUser);
router.put("/updateuser/:id", userController.updateUser);
router.delete("/deleteuser/:id", userController.deletUser);
// router.get("/deleteuser", userController.deleteUser);
// router.get("/updateuser", userController.updateUser);

export default router;