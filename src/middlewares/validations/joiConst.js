import Joi from "joi";
//this is for user validation
export const FNAME = Joi.string().min(5);
export const FNAME_REQ = FNAME.required();
export const LNAME = Joi.string().min(5);
export const LNAME_REQ = LNAME.required();
export const PHONE = Joi.number();
export const PHONE_REQ = Joi.number().required();
export const EMAIL = Joi.string().email({ minDomainSegments: 2 });
export const EMAIL_REQ = EMAIL.required();
export const PASSWORD = Joi.string();
export const PASSWORD_REQ = PASSWORD.required();

//this for token and session ID
export const SESSIONID = Joi.string().min(5).max(30);
export const SESSIONID_REQ = SESSIONID.required();

export const T = Joi.string().min(5).max(30);
export const T_REQ = Joi.string().min(5).max(30).required();

export const OTP = Joi.number().min(999).max(9999).required();

export const SHORT_STR = Joi.string().min(1).max(100);
export const SHORT_STR_REQ = SHORT_STR.required();

export const LONG_STR = Joi.string().min(1).max(5000);
export const LONG_STR_REQ = LONG_STR.required();

export const YEAR = Joi.number()
  .integer()
  .min(1901)
  .max(new Date().getFullYear());
export const YEAR_REQ = YEAR.required();

// export const ISBN = Joi.number().integer().min(1000000000).max(9999999999999);

export const ISBN = Joi.string()
  .pattern(/^\d{10}$|^\d{13}$/)
  .message({
    "string.pattern.base": "ISBN is not in the valid formate.",
  });
export const ISBN_REQ = ISBN.required();
