const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

const registerService = async (data) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);
    const newUser = new userModel({
      username: data.username,
      email: data.email,
      phone: data.phone,
      password: hashedPassword,
      
    });
    return await newUser.save();
  } catch (error) {
    throw Error(error);
  }
};

const loginService = async (data) => {
  try {
    console.log(data,"data")
    const user = await userModel.findOne({ email: data.email });
    if (user && (await bcrypt.compare(data.password, user.password))) {
      return user;
    }
  } catch (error) {
    throw Error(error);
  }
};

const blockUserService = async (id,userId)=>{
  try {
    const user = await userModel.findByIdAndUpdate(userId, {
      $push: { blocked: id },
    })
    return user;
  } catch (error) {
    throw Error(error);
  }
}

const getUserService = async (id)=>{
  try {
  
    const user = await userModel.findById(id);
    return user;
  } catch (error) {
    throw Error(error);

  }
}

const updateProfileService = async (id,data)=>{
  try{
    const user = await userModel.findByIdAndUpdate(id,{
      $set: data
    })
    return user;
  }catch(error){
    throw Error(error);
  }
}

const deactivateService = async (userId)=>{
  try {
    const user = await userModel.findByIdAndUpdate(userId,{
      $set: {isActive:false}
    })
    return user;
  } catch (error) {
    throw Error(error);
  }
}

const activateService = async (userId)=>{
  try {
    const user = await userModel.findByIdAndUpdate(userId,{
      $set: {isActive:true}
    })
    return user;
  } catch (error) {
    throw Error(error);
  }
}
module.exports = { registerService, loginService,blockUserService,updateProfileService, getUserService , deactivateService , activateService};
