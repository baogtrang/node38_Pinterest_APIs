import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const secret_key = process.env.KEY_SECRET;

const createToken = (data) => {
  console.log(data);
  return jwt.sign(data, secret_key, { expiresIn: "1d" });
};

export { createToken };
