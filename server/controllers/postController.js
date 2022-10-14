const {
  addPostService,
  getOtherPostsService,
  getUserPostsService,
  editPostService,
  deletePostService,
  getaPostService,
  blockPostService,
} = require("../services/postService");

const getOtherPosts = async (req, res) => {
  try {
    const posts = await getOtherPostsService(req.params.id);
    if (posts) {
      res.status(200).json(posts);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const addPost = async (req, res) => {
  try {
    const post = await addPostService(req.body);
    console.log("post", post);
    if (post) {
      res.status(200).json(post);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const getUserPosts = async (req, res) => {
  try {
    const post = await getUserPostsService(req.params.id);
    if (post) {
      res.status(200).json(post);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const getaPost = async (req, res) => {
  try {
    const post = await getaPostService(req.params.id);
    if (post) {
      res.status(200).json(post);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const editPost = async (req, res) => {
  try {
    const post = await editPostService(req.params.id, req.body);
    if (post) {
      res.status(200).json("Post updated");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const deletepost = async (req, res) => {
  try {
    const post = await deletePostService(req.params.id);
    if (post) {
      res.status(200).json("Post deleted");
    } else {
      res.status(401).json("No such post");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const blockPost = async (req,res)=>{
  try {
    const post = await blockPostService(req.params.id, req.body);
    if (post) {
      res.status(200).json("Post blocked");
    } 
  } catch (error) {
    res.status(500).json(error);
    console.log(error)
  }
}



module.exports = {
  getOtherPosts,
  addPost,
  getUserPosts,
  getaPost,
  editPost,
  deletepost,
  blockPost,
 
};
