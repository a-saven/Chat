require('dotenv').config();
import { verify } from "jsonwebtoken";
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

export const getInfoWithToken = (token) => {
  console.log("json web token", token)
  const decoded = verify(token, JWT_SECRET_KEY);
  return {
    id: decoded.id,
    email: decoded.email,
    token
  };
}