const userModel = require("../../../DB/model/User");

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const newUser = new userModel({ name, email, password });
        const savedUser = await newUser.save()
        res.json({ message: "Done", savedUser })
    } catch (error) {
        if (error.keyValue) {
            if (error.keyValue.email) {
                res.json({ message: "email exist", error })
            }
        } else {
            res.json({ message: "catch error", error })
        }
    }

}


module.exports = signup