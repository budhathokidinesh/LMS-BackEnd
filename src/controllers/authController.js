import { hashPassword } from "../../utils/bcrypt.js";
import { responseClient } from "../middlewares/responseClient.js";
import {
  createNewSession,
  deleteSession,
} from "../models/Session/SessionModel.js";
import { createNewUser, updateUser } from "../models/User/userModel.js";
import { v4 as uuidv4 } from "uuid";
import {
  userAccountActivatedNotification,
  userActivationUrlEmail,
} from "../services/email/emailService.js";

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
