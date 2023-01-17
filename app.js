const { getAllMessages } = require('./jobs/kargo_takip_client.js');

const schedule = require('node-schedule');


schedule.scheduleJob('0 */30 * * * *', () => {
    getAllMessages();
});



