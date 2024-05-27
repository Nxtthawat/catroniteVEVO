const axios = require('axios');

module.exports.getUserId = async (username) => {
    try{
        const response = await axios.post(`https://users.roblox.com/v1/usernames/users`,{
            usernames:[
                username,
            ],
            excludeBannedUsers: true
        },{
            headers:{
                'Content-Type': 'application/json',
            }
        })

        //console.log(response.data.data[0].id)
        return response.data.data[0].id
    }catch (error){
        console.log(error)
        return null
    }
}