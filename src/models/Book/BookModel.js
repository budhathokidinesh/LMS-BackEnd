import BookSchema from "./BookSchema.js";

//for session schema
export const createNewBook = (bookObj) => {
  return BookSchema(bookObj).save();
};
