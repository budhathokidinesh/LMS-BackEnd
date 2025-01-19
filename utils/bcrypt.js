import bcrypt from "bcryptjs";
const saltRound = 15;
export const hashPassword = (plainPassword) => {
  return bcrypt.hashSync(plainPassword, saltRound);
};

//comparing the passeord(both of them should be string)
export const comparePassword = (plainPassword, hashPassword) => {
  return bcrypt.compareSync(plainPassword, hashPassword);
};
