const userModel =require("../../../DB/model/User")
const displayProfile =async(req,res)=>{
    try {
        console.log(req.user);
        const user =await userModel.findById(req.user._id)
        res.json({message:"Done",user})
    } catch (error) {
        res.json({message:"catch error",error})
    }
}
module.exports = displayProfile