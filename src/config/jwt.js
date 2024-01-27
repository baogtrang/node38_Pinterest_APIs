import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import prisma from "./connect.config.js";
dotenv.config();
const secret_key = process.env.KEY_SECRET_JWT;

const createToken = (data) => {
  return jwt.sign(data, secret_key, { expiresIn: "5h" });
};

const checkToken = (token) => {
  return jwt.verify(token, secret_key, (error, deCode) => {
    if (error) {
      return {
        statusCode: 400,
        message: "Token incorrect",
      };
    }
    return {
      statusCode: 200,
      deCode,
    };
  });
};

const verifyToken = async (req, res, next) => {
  let { token } = req.headers;
  if (!token) {
    res.status(400).send("Pls!! fill in valid token");
    return;
  }

  let isValidToken = checkToken(token);

  if (isValidToken.statusCode === 400) {
    res.status(400).send(isValidToken.message);
    return;
  }

  let { email, user_id } = isValidToken.deCode;
  let dataEmail = await prisma.users.findFirst({
    where: {
      email,
      user_id,
    },
  });

  if (!dataEmail) {
    res.status(404).send("This Token is not true");
    return;
  }
  next();
};
export { createToken, verifyToken, checkToken };
