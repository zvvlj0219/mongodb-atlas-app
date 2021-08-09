const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// mongoose connect to mongoDB Atlas
const url = "mongodb+srv://zvvlj0219:se9108li07da13@cluster0.g2zyh.mongodb.net/atlas-sample-app?retryWrites=true&w=majority";
mongoose.connect(url);

// data schema and model
const postsSchema = {
  text : String,
  createdAt:Object
}
const Posts = mongoose.model('Posts',postsSchema);

//get posts
router.get('/',async (req,res)=>{
  try{
    const posts = await Posts.find({});
    res.send(posts)
  }catch(e){
    res.status(500).send()
  }
});

//add posts
router.post('/',async (req,res)=>{
  try{
    const text = req.body.text;
    const newPosts = new Posts({
      text:text,
      createdAt:new Date()
    });
    await newPosts.save();
    res.status(201).send(newPosts);
  }catch(e){
    res.status(400).send();
  }
});

//delete posts
router.delete('/:id',async (req,res)=>{
  try{
    const posts = await Posts.findByIdAndDelete(req.params.id);
    if(!posts){
      return res.status(404).send()
    }
    res.send(posts);
  }catch(e){
    res.status(500).send();
  }
})

module.exports = router;