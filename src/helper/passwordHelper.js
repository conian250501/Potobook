import bcrypt from "bcrypt";
import { User } from "../app/models/userModel";
export const passwordHelper = {
  hashPassword: async (password, saltRounds) => {
    const passwordHased = await bcrypt.hash(password, saltRounds);
    return passwordHased;
  },
  comparePassword: async (id, password) => {
    const user = await User.findById(id);
    if (!user) return false;
    const isValidPassword = await bcrypt.compare(password, `${user?.password}`);
    return isValidPassword;
  },
};
