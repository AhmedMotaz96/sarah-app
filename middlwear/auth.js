const jwt =require('jsonwebtoken');
const userModel=require('../DB/model/User');
const roles ={
    User:"User",
    Admin:"Admin",
    Hr:"hr"
}
const auth =(accessRoles)=>{
    return async(req,res,next)=>{
        try {
            const headerToken=req.headers['authorization']
            console.log(headerToken);
            if (!headerToken ||headerToken==null ||headerToken== undefined ||
                !headerToken.startsWith(`${process.env.bearerTokenKey}`)) {
                res.json({message:"in-valid header token"})
            } else {
                const token =headerToken.split(" ")[1]
                console.log(token);
                if (!token|| token==undefined||token==null||token.length<1) {
                    res.json({message:"in-valid token"})
                } else {
                    const decoded =jwt.verify(token,process.env.tokenSignature)
                    console.log(decoded);
                    const findUser=await userModel.findById(decoded.id).select('name email role')
                    console.log(findUser);
                    if (!findUser) {
                        res.json({message:"in-valid user account"})
                    } else {
                        console.log({accessRoles});
                        console.log(findUser.roles);
                        if (accessRoles.includes(findUser.roles)) {
                            req.User = findUser
                            next()
                        } else {
                            res.json({message:"not auth user"})
                        }
                    }
                }
            }
        } catch (error) {
            res.json({message:"catch error",error})
        }
    }
}
module.exports={ auth ,roles }