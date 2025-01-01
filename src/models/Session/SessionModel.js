import sessionSchema from "./SessionSchema.js";

//for session schema
export const createNewSession = (sessionObj) => {
  return sessionSchema(sessionObj).save();
};
