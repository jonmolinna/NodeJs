const User = require('./User.js');
const Post = require('./Post.js');
const jwt = require('jsonwebtoken');

const addPost = async (req, res) => {
  const { title, comment, userID } = req.body; 
  const errors = {};

  try {
      jwt.verify(req.token, "SECRET_KEY");

      if(title.trim() === '') errors.title = "Ingrese un Titulo";
      if(comment.trim() === '') errors.comment = "Ingrese un Comentario";

      if(Object.keys(errors).length > 0){
        throw errors
       }

      const usuario = await User.findById(userID).orFail();

      const post = await Post.create({ title, comment, user: usuario.id })

      return res.status(200).json({ post })
       
  } catch (error) {
      return res.status(400).json({ error })
  }

};

module.exports = {
    addPost,
};