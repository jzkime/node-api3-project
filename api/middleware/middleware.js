const Users = require('../users/users-model')
const Posts = require('../posts/posts-model')

function logger(req, res, next) {
  const date = new Date(Date.now())
  console.log(req.method, req.originalUrl, date.toString())
  next();
}

async function validateUserId(req, res, next) {
  let user = await Users.getById(req.params.id);
  if(!user) return res.status(404).json({ message: "user not found" });
  req.user = user;
  next();
}

function validateUser(req, res, next) {
  if( typeof req.body.name !== 'string' || req.body.name.trim() === '' ) return res.status(400).json({ message: "missing required name field" });
  req.userName = { name: req.body.name.trim()};
  console.log(req)
  next();
}

function validatePost(req, res, next) {
  if(!req.body.text) return res.status(400).json({ message: "missing required text field" });
  req.post = res.body;
  next();
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}