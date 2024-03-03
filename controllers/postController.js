const fs = require("fs");
const path = require("path");
const asyncHandler = require("express-async-handler")
const {Post, validateCreatePost} = require ("../models/Post");


module.exports.createPostCntrl = asyncHandler(async ( req,res )=>{
    
    //1. Validation for data
    const {error} = validateCreatePost(req.body);
    if(error){
        return res.status(400).json({ message: error.details[0].message })
    }

    //2. Create new post and save it db

    const post = await Post.create({
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        user: req.user.id,
    })

    //3. Send response the client

    res.status(201).json(post);
})