// const jwt = require('jsonwebtoken')

// const verifyToken = (req,res,next)=>{
//     const token = req.cookies.token;

//     if(!token){
//         return res.status(401).json("you are not authenticated");
//     }

//     jwt.verify(token, process.env.SECRET, (err,data)=>{
//         if(err){
//             return res.status(403).json("token is not valid");
//         }

//         req.userId = data._id;

//         next()
//     })
// }

// module.exports=verifyToken







const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
  
    if (!authHeader) {
      return res.status(401).json({ success: false, message: 'Authorization header is missing' });
    }
  
    const token = authHeader.split(' ')[1]; 
    
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ success: false, message: 'Invalid or expired token' });
      }
      req.user = decoded; 
      next();
    });
  };


  module.exports=verifyToken