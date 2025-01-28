//this is for otp
export const generateOtp = (length = 4) => {
  let str = "";

  for (let i = 0; i < 4; i++) {
    str += Math.floor(Math.random() * 10); //random number 0-9
  }
  return str;
};
