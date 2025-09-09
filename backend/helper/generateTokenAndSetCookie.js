import jwt from "jsonwebtoken"; 

export const generateTokenAndSetCookie = (res, userId) => {
    const token = jwt.sign({userId},process.env.JWT_SECRET_KEY,{expiresIn:"1d"}); // Generate a JWT token with userId and secret key
    
    const tokenOption ={
        httpOnly:true,
        secure:process.env.NODE_ENV === 'production',
        sameSite:process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
        maxAge:24*60*60*1000
    }

     res.cookie("token",token,tokenOption).status(200)
     

    return token;
}