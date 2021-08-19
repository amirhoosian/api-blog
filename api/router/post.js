const router = require('express').Router();
const mongoose = require('mongoose')
const User = require('../models/User')
const Post = require('../models/Post')




//UPDATE POST
router.post('/', async (req, res) => {
   const newPost = new Post(req.body)
   try {
       const savedPost = await newPost.save()
       res.status(200).json(savedPost)
   } catch (error) {
       res.status(400).json('sumthing wrong')
   }
})



//UPDATE POST
router.put('/:id', async (req, res) => {
   try {
       const post = await Post.findById(req.params.id)
       if(post.username == req.body.username){
        try {
            const updatePost = await Post.findByIdAndUpdate(req.params.id, {
                $set: req.body
            },{new: true})
            res.status(200).json(updatePost)
        } catch (error) {
            res.status(400).json('sumthing wrong')
        }
       }else{
           res.status(401).json('you can only update own post')
       }
   } catch (error) {
       res.status(400).json('sumthing wrong')
   }
})
//DELETED POST
router.delete('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if(post.username == req.body.username){
         try {
            await post.delete()
             res.status(200).json(" post deleted")
         } catch (error) {
             res.status(400).json('sumthing wrong')
         }
        }else{
            res.status(401).json('you can only update own post')
        }
    } catch (error) {
        res.status(400).json('sumthing wrong')
    }
 })

//GET POST

router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        
        res.status(200).json(post)
    }catch (err) {
        res.status(404).json("post not found")
    }
 })

 router.get('/', async (req, res) => {
     const userName = req.query.user
     const catName = req.query.cat
    try {
       let posts;
       if(userName){
           posts = await Post.findById({username})
       }else if(catName){
           posts = await Post.findById({categories:{
               $in: [catName]
           }})
       }else{
           posts = Post.find()
       }
       res.status(200).json(posts)
    }catch (err) {
        res.status(404).json("post not found")
    }
 })



module.exports = router