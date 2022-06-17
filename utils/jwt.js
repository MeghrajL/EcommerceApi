import jwt from "jsonwebtoken";

const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  return token;
};

const isTokenValid = ({ token }) => {
  jwt.verify(token, process.env.JWT_SECRET);
};

const attachCookiesToResponse = ({ res, user }) => {
  const token = createJWT({ payload: user });

  const oneDayInMilliSeconds = 1000 * 60 * 60 * 24;

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDayInMilliSeconds),
    secure: process.env.NODE_ENV === "production", //works as https in prod & http and https in dev
    signed: true, //cookie will be available but with signature, sigining our cookies thus we now that who(client) modified it
  });
};

export { createJWT, isTokenValid, attachCookiesToResponse };
