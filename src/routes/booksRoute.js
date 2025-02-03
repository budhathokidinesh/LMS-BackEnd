import express from "express";
import { insertNewBook } from "../controllers/booksController.js";
import {
  adminAuthMiddleware,
  userAuthMiddleware,
} from "../middlewares/authMiddleware.js";
import { newBookDataValidation } from "../middlewares/validations/bookDataValidation.js";
const router = express.Router();

router.get("/", (req, res, next) => {
  res.json({ message: "TODO" });
});
// Inserting new book
router.post(
  "/",
  userAuthMiddleware,
  adminAuthMiddleware,
  newBookDataValidation,
  insertNewBook
);

export default router;
