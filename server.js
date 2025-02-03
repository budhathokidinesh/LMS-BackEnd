import express, { response } from "express";
const app = express();
const PORT = process.env.PORT || 8000;

//DB connection
import { dbConnect } from "./src/config/dbCOnfig.js";
dbConnect();
//middlewares
import cors from "cors";
import morgan from "morgan";
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// api endpoints
import authRoute from "./src/routes/authRoute.js";
import { errorHandler } from "./src/middlewares/errorHandler.js";
import { responseClient } from "./src/middlewares/responseClient.js";
import usersRoute from "./src/routes/usersRoute.js";
import booksRoute from "./src/routes/booksRoute.js";

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", usersRoute);
app.use("/api/v1/books", booksRoute);

// server status
app.get("/", (req, res) => {
  const message = "Server is live";
  responseClient({ req, res, message });
});
app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log("Server is running at http://localhost:" + PORT);
});

app.use(errorHandler);
