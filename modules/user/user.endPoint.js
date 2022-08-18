const { roles } = require("../../middlwear/auth")
const endPoint ={
    profile : [roles.Admin,roles.Hr],
    updatename :[roles.Hr]

}
module.exports = endPoint