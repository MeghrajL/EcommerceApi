import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import CustomError from "../errors/index.js";
import { attachCookiesToResponse, createTokenUser } from "../utils/index.js";
import "express-async-errors";

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError("Email already exists");
  }

  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? "admin" : "user";

  const user = await User.create({ name, email, password, role });

  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });
  res.status(StatusCodes.CREATED).json({ user: tokenUser });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new CustomError.BadRequestError("Please enter email and password");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError.UnauthenticatedError(
      "User with this email doesn't exists"
    );
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError("incorrect password");
  }

  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });
  res.status(StatusCodes.OK).json({ user: tokenUser });
};

const logout = async (req, res) => {
  res.cookie("token", "randomLogout", {
    httpOnly: true,
    expires: new Date(Date.now()), //didnt add extra time bcs in postman we cant refresh cookies
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out" });
};

export { login, logout, register };
