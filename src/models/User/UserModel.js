import userSchema from "./UserSchema.js";

//insert new user
export const createNewUser = (userObj) => {
  return userSchema(userObj).save();
};

//Update user by email to active
export const updateUser = (filter, update) => {
  return userSchema.findOneAndUpdate(filter, update, { new: true });
};
