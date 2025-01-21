import express from "express";
const router = express.Router();
import { responseClient } from "../middlewares/responseClient.js";

import { userAuthMiddleware } from "../middlewares/authMiddleware.js";
router.get("/profile", userAuthMiddleware, async (req, res) => {
  const user = req.userInfo;
  user.password = undefined;
  (user.__v = undefined), (user.refreshJWT = undefined);

  return responseClient({
    req,
    res,
    message: "User Profile",
    payload: user,
  });
});
export default router;
