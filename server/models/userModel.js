const mongoose = require("mongoose");
const { errorCreator } = require("../utils/responseHandler");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "name is mandatory!!!"],
  },
  username: {
    type: String,
    unique: true,
    required: [true, "username is mandatory!!!"],
  },
  password: {
    type: String,
    validate: {
      validator: (value) => value.length >= 8,
      message: (data) => "Password should be atleast 8 characters!!!",
    },
  },
  friendList: {
    type: [String],
  },
  secret: {
    type: String,
  },
});

userSchema.statics.createUser = async (userData) => {
  const data = await userModel.create(userData);
  console.log(data);
  if (data) {
    return data;
  }
};

userSchema.statics.getUser = async (username) => {
  const userData = (
    await userModel.findOne({ username }, { _id: 0, __v: 0 })
  )?.toObject();
  if (userData) {
    return userData;
  } else {
    errorCreator("Incorrect Password!!!", 401);
  }
};

userSchema.statics.updateFriend = async (username, id, addFriend = true) => {
  let data;
  if (addFriend) {
    data = await userModel.updateOne(
      { username },
      { $addToSet: { friendList: id } }
    );
  } else {
    data = await userModel.updateOne(
      { username },
      { $pull: { friendList: id } }
    );
  }

  if (data.modifiedCount || data.matchedCount) {
    return userModel.getUser(username);
  }
};

userSchema.statics.updateUser = async (username, data) => {
  const updateData = await userModel.updateOne(
    { username },
    { $set: { ...data } }
  );
  if (updateData.modifiedCount) {
    return true;
  } else {
    errorCreator("Something went Wrong!!!");
  }
};

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;

// mongoose.set('strictQuery', true);
