const postModel = require("../models/postModel");
const userModel = require("../models/userModel");

const getOtherPostsService = async (id) => {
  try {
    const user = await userModel.findById(id);
    const blockedUsers = user.blocked;
    const deactivatedUsers= await userModel.find({isActive:false})
    const result = deactivatedUsers.map((user)=>{
     return user._id
    })
    const posts = await postModel.find({
      $and: [{ userId: { $ne: id } }, { blockedUsers: { $nin: [id] } },{userId:{$nin:blockedUsers}},{userId:{$nin:result}}],
    }).sort({updatedAt:-1});
    return posts;
  } catch (error) {
    throw Error(error);
  }
};

const addPostService = async (data) => {
  try {
    const newPost = new postModel({
      userId: data.userId,
      username: data.username,
      content: data.content,
    });
    return await newPost.save();
  } catch (error) {
    throw Error(error);
  }
};

const getUserPostsService = async (id) => {
  try {
    const posts = await postModel.find({ userId: id }).sort({ _id: -1 });
    return posts;
  } catch (error) {
    throw Error(error);
  }
};

const getaPostService = async (id) => {
  try {
    const post = await postModel.findById(id);
    return post;
  } catch (error) {
    throw Error(error);
  }
};

const editPostService = async (id, body) => {
  console.log(body);
  try {
    const post = await postModel.findByIdAndUpdate(id, { $set: body });
    return post;
  } catch (error) {
    throw Error(error);
  }
};

const deletePostService = async (id) => {
  try {
    const post = await postModel.findByIdAndDelete(id);
    return post;
  } catch (error) {
    throw Error(error);
  }
};

const blockPostService = async (id, userId) => {
  try {
    const post = await postModel.findByIdAndUpdate(id, {
      $push: { blockedUsers: userId.userId },
    });
    return post;
  } catch (error) {
    throw Error(error);
  }
};



module.exports = {
  getOtherPostsService,
  addPostService,
  getUserPostsService,
  getaPostService,
  editPostService,
  deletePostService,
  blockPostService,
};
