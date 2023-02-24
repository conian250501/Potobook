import jwt from "jsonwebtoken";
export const jwtHelper = {
  createToken: (userId) => {
    return jwt.sign(
      { name: `${process.env.JWT_OPTIONS_NAME}`, userId: userId },
      `${process.env.JWT_SECRET_KEY}`,
      { expiresIn: "2d" }
    );
  },
};
