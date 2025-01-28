import { comparePassword, hashPassword } from "../../utils/bcrypt.js";
import { responseClient } from "../middlewares/responseClient.js";
import {
  createNewSession,
  deleteManySession,
  deleteSession,
  getSession,
} from "../models/Session/SessionModel.js";
import {
  createNewUser,
  getUserByEmail,
  updateUser,
} from "../models/User/userModel.js";
import { v4 as uuidv4 } from "uuid";
import {
  passwordResetOTPNotificationEmail,
  userAccountActivatedNotification,
  userActivationUrlEmail,
  userProfileUpdatedNotificationEmail,
} from "../services/email/emailService.js";
import { getJwts } from "../../utils/jwt.js";
import { generateOtp } from "../../utils/randomGenerator.js";

uuidv4();
// To insert new user
export const insertNewUser = async (req, res, next) => {
  try {
    //SIGN UP PROCESS
    // recieve the user data
    const { password } = req.body;
    //encrypting the password
    req.body.password = hashPassword(password);

    //insert user into db
    const user = await createNewUser(req.body);
    if (user?._id) {
      // create an unique user activation link and send to their email
      const session = await createNewSession({
        token: uuidv4(),
        association: user.email,
      });

      if (session?._id) {
        const url = `${process.env.ROOT_URL}/activate-user?sessionId=${session._id}&t=${session.token}`;

        //send this url to their email
        const emailId = await userActivationUrlEmail({
          email: user.email,
          url,
          name: user.fName,
        });

        if (emailId) {
          const message =
            "We have sent you an email with activation link. Please, check your email and follow the instructions.";
          return responseClient({ req, res, message });
        }
      }
    }

    throw new Error("Unable to create new account");
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error collection")) {
      error.message =
        "The email is already exists, try another email or reset your password";

      error.statusCode = 400;
    }
    next(error);
  }
};

// To activate the user
export const activateUser = async (req, res, next) => {
  try {
    const { sessionId, t } = req.body;
    console.log(sessionId, t);

    const session = await deleteSession({
      _id: sessionId,
      token: t,
    });

    if (session?._id) {
      // update user to active
      const user = await updateUser(
        { email: session.association },
        { status: "active" }
      );
      if (user?._id) {
        // send email notification
        userAccountActivatedNotification({
          email: user.email,
          name: user.fName,
        });

        // response
        const message = "Your account has been activated. You may log in Now!";
        return responseClient({ req, res, message });
      }
    }
    const message = "Invalid link or token expire";
    const statusCode = 400;
    responseClient({ req, res, message, statusCode });
  } catch (error) {
    next(error);
  }
};
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // get user by email
    console.log(email, password);

    const user = await getUserByEmail(email);
    if (user?._id) {
      console.log(user);
      //compare password
      const isPassMatched = comparePassword(password, user.password);
      if (isPassMatched) {
        console.log("user authenticated successfully");

        // create JWTS
        const jwts = await getJwts(email);
        //response JWTS
        return responseClient({
          req,
          res,
          message: "Login successfull",
          payload: jwts,
        });
      }
    }

    const message = "Invalid login details";
    const statusCode = 401;
    responseClient({ req, res, message, statusCode });
  } catch (error) {
    next(error);
  }
};
//this middleware for the logout the user
export const logoutUser = async (req, res, next) => {
  try {
    // get the token

    const { email } = req.userInfo;
    // update refreshJWT to  ""
    await updateUser({ email }, { refreshJWT: "" });
    // remove the acessJWT from session table
    await deleteManySession({ association: email });
    responseClient({ req, res, message: "you are logged out!" });
  } catch (error) {
    next(error);
  }
};
export const generateOTP = async (req, res, next) => {
  try {
    const { email } = req.body;
    console.log(req.body);
    // get user by email
    const user = typeof email === "string" ? await getUserByEmail(email) : null;
    if (user?._id) {
      // generate otp
      const otp = generateOtp();

      //store in session table
      const session = await createNewSession({
        token: otp,
        association: email,
        expires: new Date(Date.now() + 300000), // expires in 5 minuts
      });
      if (session?._id) {
      }
      //send otp to user email
      const info = await passwordResetOTPNotificationEmail({
        email,
        name: user.fName,
        otp,
      });
      console.log(info);
    }

    responseClient({ req, res, message: "otp is sent to your email" });
  } catch (error) {
    next(error);
  }
};
// this is for reset the password

export const resetNewPassword = async (req, res, next) => {
  try {
    console.log(req.body);
    const { email, password, otp } = req.body;

    //check otp im session table
    const sessions = await getSession({
      token: otp,
      association: email,
    });
    if (sessions?._id) {
      //encrypt the password
      const hashPass = hashPassword(password);

      // update user table

      const user = await updateUser({ email }, { password: hashPass });
      if (user?._id) {
        // send email notification.
        userProfileUpdatedNotificationEmail({ name: user.fName, email });
        return responseClient({
          req,
          res,
          statusCode: 200,
          message:
            "Your password has been updated successfully. You may login now. Thanks.",
        });
      }
    }
    responseClient({
      req,
      res,
      statusCode: 400,
      message: "Invalid data or token is expired",
    });
  } catch (error) {
    next(error);
  }
};
