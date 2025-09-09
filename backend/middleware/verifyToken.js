import jwt from "jsonwebtoken";
export const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            message:"Please login!",
            success:false,
            error:true,
        })
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if(!decoded){throw new Error("Invalid token")};

        req.userId = decoded.userId;
        next(); 
        // console.log("Token verified successfully for user:", req.userId);

    }catch(err){
        console.log("error in verifyToken:",err);
        return res.status(500).json({
            message:"Error in token verification: " + err.message,
            success:false,
            error:true,
        });
    }



}