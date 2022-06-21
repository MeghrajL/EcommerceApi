import Product from "../models/Product.js";
import { StatusCodes } from "http-status-codes";
import CustomError from "../errors/index.js";
import "express-async-errors";

import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const createProduct = async (req, res) => {
  req.body.user = req.user.userId; //setting user field in our model equal to the logged in (admin)user's id
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
};
const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.status(StatusCodes.OK).json({ products, count: products.length });
};

const getSingleProduct = async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findOne({ _id: productId }).populate("reviews");
  //populate("reviews"); is the mongo virtual here but querying is not availbale on virtual so we set up different(getSingleProductReviews) route for getting product specific reviews

  if (!product) {
    throw new CustomError.NotFoundError(`No Product with id : ${productId}`);
  }

  res.status(StatusCodes.OK).json({ product });
};

const updateProduct = async (req, res) => {
  const productId = req.params.id;

  const product = await Product.findOneAndUpdate({ _id: productId }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    throw new CustomError.NotFoundError(`No Product with id : ${productId}`);
  }

  res.status(StatusCodes.OK).json({ product });
};
const deleteProduct = async (req, res) => {
  const productId = req.params.id;

  const product = await Product.findOne({ _id: productId });

  if (!product) {
    throw new CustomError.NotFoundError(`No Product with id : ${productId}`);
  }
  await product.remove(); //deletes product and also triggers pre func in product model to delete all reviews before deleting the product

  res.status(StatusCodes.OK).json({ msg: "Product Removed Successfully" });
};

const uploadImage = async (req, res) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  if (!req.files) {
    throw new CustomError.BadRequestError("No File Uploaded");
  }

  const productImage = req.files.image;

  if (!productImage.mimetype.startsWith("image")) {
    throw new CustomError.BadRequestError("Please Upload Image");
  }

  const maxSize = 1024 * 1024;

  if (productImage.size > maxSize) {
    throw new CustomError.BadRequestError(
      "Please upload image smaller than 1MB"
    );
  }

  const imagePath = path.join(
    __dirname,
    "../public/uploads/" + `${productImage.name}`
  );

  await productImage.mv(imagePath);

  res.status(StatusCodes.OK).json({ image: `/uploads/${productImage.name}` });
};

export {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};
