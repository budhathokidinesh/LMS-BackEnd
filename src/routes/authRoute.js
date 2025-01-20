import express from "express";
const router = express.Router();
import {
  activateUser,
  insertNewUser,
  loginUser,
} from "../controllers/authController.js";
import {
  loginDataValidation,
  newUserDataValidation,
  userActivationDataValidation,
} from "../middlewares/validations/authDataValidation.js";

// User signup
router.post("/register", newUserDataValidation, insertNewUser);
router.post("/activate-user", userActivationDataValidation, activateUser);
router.post("/login", loginDataValidation, loginUser);

export default router;
