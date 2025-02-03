import { responseClient } from "../middlewares/responseClient.js";
import { createNewBook } from "../models/Book/BookModel.js";

export const insertNewBook = async (req, res, next) => {
  try {
    const { fName, _id } = req.userInfo;
    const obj = {
      ...req.body,
      //   title: "dinesh",
      //   year: "1991",
      //   author: "dinesh",
      //   imgUrl: "dinesh",
      //   isbn: "123",
      //   genre: "dinesh",
      // available: "true",
      // averageRating: "5",
      addedBy: { name: fName, adminId: _id },
      lastUpdatedBy: { name: fName, adminId: _id },
    };
    const book = await createNewBook(obj);
    book._id
      ? responseClient({
          req,
          res,
          message: "The book has been added successfully",
        })
      : responseClient({
          req,
          res,
          message: "Unable to insert new book in the database, try it later",
          statusCode: 401,
        });
  } catch (error) {
    next(error);
  }
};
