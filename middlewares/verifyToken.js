const jwt = require("jsonwebtoken");


//verify Token
function verifyToken(req,res,next){
    const authToken = req.headers.authorization;
    if (authToken){
        const token = authToken.split(" ")[1];
        try{
            const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decodedPayload;
            next();
        }catch{
            return res.status(401).json({message:"invalid token, unable to access"})
        }
    } else {
        return res.status(401).json({message: " token not provided "});
    }
}

// verify token and admin
function verifyTokenAndAdmin(req, res, next){
    verifyToken(req,res, ()=>{
        if(req.user.isAdmin){
            next();
        } else {
            return res.status(403).json({message: "Admin access only"});
        }
    })
}

// Verify token & only user himself
function verifyTokenAndOnlyUser(req, res, next){
    verifyToken(req,res, ()=>{
        if(req.user.id === req.params.id){
            next();
        } else {
            return res.status(403).json({message: "Only user himself can modify his infos"});
        }
    })
}

module.exports = { 
    verifyToken,
    verifyTokenAndAdmin,
    verifyTokenAndOnlyUser
};