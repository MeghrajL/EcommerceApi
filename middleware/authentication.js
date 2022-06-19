import CustomError from "../errors/index.js";
import { isTokenValid } from "../utils/index.js";

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;

  if (!token) {
    throw new CustomError.UnauthenticatedError("Authentication Invalid");
  }

  try {
    const { name, userId, role } = isTokenValid({ token });
    req.user = { name, userId, role };
    next();
  } catch (error) {
    throw new CustomError.UnauthenticatedError("Authentication Invalid");
  }
};

const authorizePermissions = (...roles) => {
  //roles is rest param here (containes the roles we pass in authorizePermissions() call in userRoutes)
  return (req, res, next) => {
    //we return a function from here bcs  authorizePermissions is directly called in userRoutes so it need a callback func
    if (!roles.includes(req.user.role)) {
      throw new CustomError.UnauthorizedError(
        "Unauthorized access to this route"
      );
    }
    next();
  };
};
export { authenticateUser, authorizePermissions };
