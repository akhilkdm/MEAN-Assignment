
const { registerService, loginService, blockUserService, updateProfileService, getUserService, deactivateService, activateService } = require("../services/userService");
const gnerateToken = require("../utils/generateToken");

const register = async (req, res) => {
  try {
    const user = await registerService(req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json("User already exists");
  }
};

const login = async (req, res) => {
  try {
    const user = await loginService(req.body);
    console.log(user,"user");
    if (user) {
      const token = gnerateToken(user._id)
      console.log(token)
      res.status(200).json({user, token});
    } else {
      res.status(500).json("Invalid email or password");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const blockUser = async (req,res)=>{
  try {
    const user = await blockUserService(req.params.id,req.body.userId);
    if (user) {
      res.status(200).json("User blocked");
    } 
    
  } catch (error) {
    res.status(500).json(error);
    console.log(error)
  }
}

const getUser = async (req,res)=>{
  try {
   
    const user = await getUserService(req.params.id);
    if(user){
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json(error);
    console.log(error)
  }
}

const updateProfile = async (req,res)=>{
  try {
    const user = await updateProfileService(req.params.id, req.body);
    if(user){
      res.status(200).json(user)
    }
  } catch (error) {
    res.status(500).json(error);
    console.log(error)
  }
}

const deactivate = async( req,res)=>{
  try {
    console.log(req.body.userId);
    const user = await deactivateService(req.body.userId)
    if(user){
      res.status(200).json("Deactivated successfully")
    }
  } catch (error) {
    res.status(500).json(error);
    console.log(error)
  }
}

const activate = async( req,res)=>{
  try {
    console.log(req.body.userId);
    const user = await activateService(req.body.userId)
    if(user){
      res.status(200).json("Activated successfully")
    }
  } catch (error) {
    res.status(500).json(error);
    console.log(error)
  }
}

module.exports = { register, login, blockUser, getUser, updateProfile, deactivate, activate };
