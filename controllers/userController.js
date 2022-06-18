const getAllUsers = async (req, res) => {
  res.send("getAllUsers");
};
const getSingleUser = async (req, res) => {
  res.send("getSingleUser");
};
const showCurrentUser = async (req, res) => {
  res.send("showCurrentUser");
};
const updateUser = async (req, res) => {
  res.send("updateUser");
};
const updateUserPassword = async (req, res) => {
  res.send("updateUserPassword");
};

export {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
