import sessionSchema from "./SessionSchema.js";

//for session schema
export const createNewSession = (sessionObj) => {
  return sessionSchema(sessionObj).save();
};

export const deleteSession = (filter) => {
  return sessionSchema.findOneAndDelete(filter);
};
export const deleteManySession = (filter) => {
  return sessionSchema.deleteMany(filter);
};

export const getSession = (filter) => {
  return sessionSchema.findOne(filter);
};
