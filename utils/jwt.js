import jwt from "jsonwebtoken";
import { createNewSession } from "../src/models/Session/SessionModel.js";
import { updateUser } from "../src/models/User/userModel.js";

//generate access JWT

// ACCESSJWT_SECRETE
// REFRESHJWT_SECRETE
export const createAccessJWT = async (email) => {
  //create
  const token = jwt.sign({ email }, process.env.ACCESSJWT_SECRETE, {
    expiresIn: "15m",
  });
  //store
  const obj = {
    token,
    association: email,
    expires: new Date(Date.now() + 900000), //1hr
  };
  const newSessions = await createNewSession(obj);
  return newSessions?._id ? token : null;
};
//decode accessJWT

//generate refresh JWT
export const createRefreshJWT = async (email) => {
  //create
  const refreshJWT = jwt.sign({ email }, process.env.REFRESHJWT_SECRETE, {
    expiresIn: "30d",
  });
  //store
  console.log(refreshJWT);
  const user = await updateUser({ email }, { refreshJWT });
  return user?._id ? refreshJWT : null;
};
//decode refresh JWT
export const getJwts = async (email) => {
  return {
    accessJWT: await createAccessJWT(email),
    refreshJWT: await createRefreshJWT(email),
  };
};
