require('dotenv').config();
const axios = require('axios');

async function getAllMessages() {

    const res = await axios.get(`${process.env.KARGO_TAKIP_SERVER_HOST}/kargotakip/user/get`)
       
    if (res.status === 200) {
        const users = res.data
        await Promise.all(users.map(async (user) => {
            const refreshRes = await axios.post(`${process.env.KARGO_TAKIP_SERVER_HOST}/kargotakip/user/refresh`, {id: user.id})
            if (refreshRes.status === 200) {
                const trendyolRes = await axios.post(`${process.env.KARGO_TAKIP_SERVER_HOST}/kargotakip/user/getTrendyolMessages`, {id: user.id})
                const trendyolYemekRes = await axios.post(`${process.env.KARGO_TAKIP_SERVER_HOST}/kargotakip/user/getTrendyolYemekMessages`, {id: user.id})
                const hepsiburadaRes = await axios.post(`${process.env.KARGO_TAKIP_SERVER_HOST}/kargotakip/user/getHepsiburadaMessages`, {id: user.id})
                console.log(trendyolRes.data)
            }
        }))
    }
    else 
        console.log(res)
    

}


module.exports = { getAllMessages }
