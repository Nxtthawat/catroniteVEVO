const axios = require('axios');
require('dotenv').config()

const messageSend = async (channel, data) =>{
    axios.post(`https://apis.roblox.com/messaging-service/v1/universes/${process.env.ROBLOX_PLACE_ID}/topics/${channel}`, {'message': JSON.stringify(data)} ,{
        headers:{
            'x-api-key': process.env.ROBLOX_API_KEYS,
            'Content-Type': 'application/json',
        }
    }).then(res => {
        console.log(res.data)
    }).catch(err => {
        console.log(err.response.status)
        console.log(err.response.data)
    })
}

module.exports.kick = (data) =>{
    messageSend('KickPlayerChannel', data);
}

module.exports.warn = (data) =>{
    messageSend('WarnPlayerChannel', data);
}

module.exports.ban = (data) =>{
    messageSend('BanPlayerChannel', data);
}

module.exports.unban = (data) =>{
    messageSend('UnBanPlayerChannel', data);
    console.log(JSON.stringify(data))
}

module.exports.clearWarn = (data) =>{
    messageSend('ClearWarnChannel', data);
}