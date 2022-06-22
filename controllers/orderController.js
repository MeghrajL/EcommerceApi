const getAllOrders = async (req, res) => {
  res.send("getAllOrders");
};
const getSingleOrder = async (req, res) => {
  res.send("getSingleOrder");
};
const getCurrentUserOrders = async (req, res) => {
  res.send("getCurrentUserOrders");
};
const createOrder = async (req, res) => {
  res.send("createOrder");
};
const updateOrder = async (req, res) => {
  res.send("updateOrder");
};

export {
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  createOrder,
  updateOrder,
};
