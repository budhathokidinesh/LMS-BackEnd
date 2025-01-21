import { verifyAccessJWT } from "../../utils/jwt.js";
import { getSession } from "../models/Session/SessionModel.js";
import { getUserByEmail } from "../models/User/userModel.js";
import { responseClient } from "./responseClient.js";

export const userAuthMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;
  let message = "Unauthorized";
  console.log(authorization);
  //get accessJWT;
  if (authorization) {
    const token = authorization.split(" ")[1];

    //check if valid
    const decoded = verifyAccessJWT(token);
    console.log(decoded);
    if (decoded.email) {
      // check if exist in session table
      const tokenSession = await getSession({ token });
      if (tokenSession?._id) {
        //get user by email
        const user = await getUserByEmail(decoded.email);
        if (user?._id && user.status === "active") {
          //return the user
          req.userInfo = user;
          return next();
        }
      }
    }
    message = decoded === "jwt expired" ? decoded : "Unauthorized";
  }
  //   message = decoded === "jwt expired": "Unauthorized";
  responseClient({ req, res, message, statusCode: 401 });
};
