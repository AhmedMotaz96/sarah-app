const messageModel =require("../../../DB/model/message");
const userModel =require("../../../DB/model/User");
const sendMessage =async(req,res)=>{
    try {
        const {id}=req.params;
        const messageBody =req.body.messageBody
        const {senderId}=req.query
        const user =await userModel.findById(id).select('name')
        if (!user) {
            res.json({message:"in-valid reciver account ID"})
        } else {
            if (senderId) {
                const senderUser =await userModel.findById(senderId)
                if (senderUser) {
                    const message =await messageModel.insertMany({messageBody,reciverId:user._id})
                    res.json({message:"Done",message})
                } else {
                    res.json({message:"in-valid login user"})
                }
            } else {
                const message =await messageModel.insertMany({messageBody,reciverId:user._id})
                res.json({message:"Done",message})
            }
        }
    } catch (error) {
        res.json({message:"catch error",error})
    }
}

const messageList = async (req,res)=>{
    try {
        const message =await messageModel.find({reciverId:req.user._id}).select("-senderId")
        res.json({message:"Done",message})
    } catch (error) {
        res.json({message:"catch error",error})
    }
}

const messageByMeList =async(req,res)=>{
    try {
        const message =await messageModel.find({senderId:req.user._id}).populate([
            {path:"reciverId",select:"name email"},
            {path:"senderId",select:"name email"}
        ])
        res.json({message:"Done",message})
    } catch (error) {
        res.json({message:"catch error",error})
    }
}
const deleteMessage =async (req,res)=>{
    try {
        const message =await messageModel.deleteOne({
            reciverId:req.user._id,
            _id:req.params.id
        })
        if (message.deletedCount) {
            res.json({message:"Done",message})
        } else {
            res.json({message:"in-valid message id or u are not auth"})
        }
    } catch (error) {
        res.json({message:"catch error",error})
    }
}
const updateMessage =async (req,res)=>{
    try {
        const message =await messageModel.updateOne({
            reciverId:req.user._id,
            _id:req.params.id
        })
        if (message.upsertedCount) {
            res.json({message:"Done",message})
        } else {
            res.json({message:"in-valid message id or u are not auth"})
        }
    } catch (error) {
        res.json({message:"catch error",error})
    }
}
module.exports ={sendMessage,messageList,messageByMeList,deleteMessage,updateMessage}