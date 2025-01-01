import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
    },
    association: {
      type: String,
    },
    expire: {
      type: Date,
      default: new Date(Date.now() + 3600000), //1hr
      expires: 0,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Session", sessionSchema); // session
