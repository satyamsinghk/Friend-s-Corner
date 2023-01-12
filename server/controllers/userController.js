const {
  verifyPasswordhash,
  genratePasswordHash,
} = require("../utils/passwordUtil");
const { errorCreator, responseCreator } = require("../utils/responseHandler");
const userModel = require("../models/userModel");
const { generateToken, verifyToken } = require("../utils/jwtUtil");
const { generateQRcode, verifyOTP } = require("../utils/totpUtil");

const signup = async (req, res, next) => {
  try {
    const userData = req.body;
    userData.password = await genratePasswordHash(userData.password);

    const data = await userModel.createUser(userData);
    if (data) {
      res.status(201);
      next();
      // res.send(`user ${userData.username} created successfully`);
    }
  } catch (error) {
    next(error);
  }
};

const loginWithCredentials = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const { password: pwdHash, ...userData } = await userModel.getUser(
      username
    );
    if (await verifyPasswordhash(password, pwdHash)) {
      const token = generateToken(userData);
      // console.log(token);
      res.cookie("token", token, { httpOnly: true, maxAge: 3600 * 1000 });
      res.status(200);
      res.send(responseCreator(`${username} logged in successfully`, userData));
    } else {
      errorCreator("Incorrect Password!!!", 401);
    }
  } catch (error) {
    next(error);
  }
};

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    const data = verifyToken(token);
    const { password, ...userData } = await userModel.getUser(data.username);
    if (userData) {
      res.locals.userData = userData;
      next();
    }
  } catch (error) {
    next(error);
  }
};

const loginWithCookie = async (req, res, next) => {
  try {
    res.send(
      responseCreator("User authenticated with cookie", res.locals.userData)
    );
  } catch (error) {
    next(error);
  }
};

const addFriend = async (req, res, next) => {
  try {
    const { username } = res.locals.userData;
    const { id, name } = req.body;
    //   console.log(userData);
    const data = await userModel.updateFriend(username, id, name);
    if (data) {
      res.status(200);
      res.send(responseCreator(`You're friends with ${name}`, data.friendList));
    } else {
      const err = new Error("Something went wrong");
      err.status = 500;
      throw err;
    }
  } catch (error) {
    next(error);
  }
};

const removeFriend = async (req, res, next) => {
  try {
    const { username } = res.locals.userData;
    const { id, name } = req.body;
    const data = await userModel.updateFriend(username, id, false);
    if (data) {
      res.status(200);
      res.send(
        responseCreator(
          `You're no longer friends with ${name}`,
          data.friendList
        )
      );
    } else {
      errorCreator("Something went wrong", 500);
    }
  } catch (error) {
    next(error);
  }
};

const generateResetCode = async (req, res, next) => {
  try {
    const { data, secret } = await generateQRcode();
    // const { username } = req.query;
    const { username } = req.body;
    const userUpdated = await userModel.updateUser(username, { secret });
    if (userUpdated) {
      res.send(`
      <h1>user ${username} created successfully!!!</h1>
      <h1>Two Factor authentication setup</h1>
      <h2>Please scan the QR code with Google Authenticator</h2>
      <img src="${data}"/>`);
    }
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { username, password: pwd, token } = req.body;
    console.log(token);
    const user = await userModel.getUser(username);
    const { secret } = user;
    const isOTPvalid = verifyOTP(token, secret, pwd);

    if (isOTPvalid) {
      const password = await genratePasswordHash(pwd);
      const userUpdated = await userModel.updateUser(username, { password });
      if (userUpdated) {
        res.send(
          responseCreator(`Password updated successfully for ${username}`)
        );
      } else {
        errorCreator("Something Went wrong!!!");
      }
    } else {
      errorCreator("Invalid OTP", 403);
    }
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  res.clearCookie("token");
  res.send(responseCreator("User Logged out successfully!!!"));
};

module.exports = {
  loginWithCredentials,
  signup,
  addFriend,
  removeFriend,
  authMiddleware,
  loginWithCookie,
  generateResetCode,
  resetPassword,
  logout,
};
