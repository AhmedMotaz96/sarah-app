const userModel=require("../../../DB/model/User");
const bycrpt =require('bcrypt');
const jwt=require('jsonwebtoken');

const signin =async(req,res)=>{
    try {
        const {email,password}=req.body;
        const user=await userModel.findOne({email});
        console.log(user);
        if (!user) {
            res.json({message:"in-valid email"})
        } else {
            const match=await bycrpt.compare(password,user.password)
            if (!match) {
                res.json({message:"in-valid password"})
            } else {
                const token =jwt.sign({id:user.id,isLoggedIn:true},
                    process.env.tokenSignature,{expiresIn:"1h"})
                    res.json({message:"Done",token})
            }
        }
    } catch (error) {
        res.json({message:"catch error",error})
    }
}
module.exports = signin