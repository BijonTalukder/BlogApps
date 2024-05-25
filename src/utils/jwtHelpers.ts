import jwt from "jsonwebtoken";
const generateToken = async (payload: any) => {
  jwt.sign({ userId: payload }, "signature", {
    expiresIn: "1d",
  });
};
const getUserInfo = async (token: string) => {
  try {
    const userData = jwt.verify(token, "signature");
    return userData
  } catch (error) {
    return null;
  }
};
export const jwtHelpers = {
  generateToken,
  getUserInfo,
};
