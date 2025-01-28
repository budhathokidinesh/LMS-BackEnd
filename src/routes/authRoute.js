import express from "express";
const router = express.Router();
import {
  activateUser,
  generateOTP,
  insertNewUser,
  loginUser,
  logoutUser,
  resetNewPassword,
} from "../controllers/authController.js";
import {
  loginDataValidation,
  newPasswordResetValidation,
  newUserDataValidation,
  userActivationDataValidation,
} from "../middlewares/validations/authDataValidation.js";
import {
  renewAccessJWTMiddleware,
  userAuthMiddleware,
} from "../middlewares/authMiddleware.js";

// User signup
router.post("/register", newUserDataValidation, insertNewUser);
router.post("/activate-user", userActivationDataValidation, activateUser);
router.post("/login", loginDataValidation, loginUser);
router.get("/renew-jwt", renewAccessJWTMiddleware);
router.get("/logout", userAuthMiddleware, logoutUser);
router.post("/otp", generateOTP);
router.post("/reset-password", newPasswordResetValidation, resetNewPassword);

export default router;
