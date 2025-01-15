import {
  EMAIL_REQ,
  FNAME_REQ,
  LNAME_REQ,
  PASSWORD_REQ,
  PHONE,
  SESSIONID_REQ,
  T_REQ,
} from "./joiConst.js";
import { validateData } from "./joiValidation.js";

export const newUserDataValidation = (req, res, next) => {
  const obj = {
    fName: FNAME_REQ,
    lName: LNAME_REQ,
    phone: PHONE,
    email: EMAIL_REQ,
    password: PASSWORD_REQ,
  };
  validateData({ req, res, next, obj });
};

export const userActivationDataValidation = (req, res, next) => {
  // create schema or rules
  const obj = {
    sessionId: SESSIONID_REQ,
    t: T_REQ,
  };

  validateData({ req, res, next, obj });
};
