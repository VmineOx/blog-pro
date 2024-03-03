const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { User , validateRegisterUser, validateLoginUser } = require("../models/user");



module.exports.registerUserCtrl = asyncHandler(async (req,res) =>{
    
    // validation
    const {error} = validateRegisterUser(req.body)
    if (error) {
        return res.status(400).json({message : error.details[0].message})
    }
    
    //is user already exist
    let user = await User.findOne({email: req.body.email});

    if(user){
        return res.status(400).json({ message: "user already exist"});
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    //new user and save it to db
    user = new User({
        username : req.body.username,
        email: req.body.email,
        password: hashPassword,
    });
    await user.save();
    
    //send response to client
    res.status(201).json({message: "registration completed, you can login!"})


});


module.exports.loginUserCtrl = asyncHandler ( async (req,res)=>{
    
    // validation
    const {error} = validateLoginUser(req.body)
    if (error) {
        return res.status(400).json({message : error.details[0].message})
    }

    // is user exist
    const user = await User.findOne({email: req.body.email});
    if (!user) {
        return res.status(400).json({message: "invalid email or password"})
    }

    // is password correct
    const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordMatch) {
        return res.status(400).json({message: "invalid email or password"})
    } 


    // generate token (jwt)
    const token = user.generateAuthToken();

    // response to client
    res.status(200).json({
        _id: user._id,
        token,
})
})
