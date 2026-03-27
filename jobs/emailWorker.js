const { emailQueue } = require("../config/queueConfig");
const sendVerifyEmail = require('../utils/sendVerifyEmail')

emailQueue.process('verifyEmail', async (job) => {
    try {
        await sendVerifyEmail(job.data)
    } catch (error) {
        console.log(error)
    }
})