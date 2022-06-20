import CustomError from "../errors/index.js";

const checkPermissions = (requestUser, resourceUserId) => {
  //console.log(requestUser);
  //console.log(resourceUserId);
  //console.log(typeof resourceUserId);
  if (requestUser.role === "admin") return; //if user rquesting is an admin we return so that the excetion in the getSingleUser func can continue
  if (requestUser.userId === resourceUserId.toString()) return; //if th requesting user is requesting his own data then we allow
  throw new CustomError.UnauthorizedError( //if the requesting user is not admin or not himself then we throw err
    "Not authorized to access this route"
  );
};

export default checkPermissions;
