const { createClient } = require("ioredis")
const mongoose = require("mongoose")
const cloudinary = require('cloudinary').v2;

const healthCheckController = async (req, res) => {
    const health = {
        status: 'ok',
        timestamps: new Date(),
        uptime: process.uptime(),
        services: {
            mongodb: 'unknown',
            redis: 'unknown',
            cloudinary: 'unknown',
        }
    }

    try {
        const dbState = mongoose.connection.readyState
        health.services.mongodb = dbState === 1 ? 'connected' : 'disconnected'
    } catch (error) {
        health.services.mongodb = {
            status: 'disconnected',
            error: error
        }
    }

    try {
        const redisClient = createClient({
            url: `redis://:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
        })

        redisClient.on("error", (err) => {
            health.services.redis = {
                status: 'disconnected',
                error: err
            }
        })

        await redisClient.connect();
        const pingResponse = await redisClient.ping();

        if (pingResponse === 'PONG') {
            health.services.redis = 'connected';
        } else {
            throw new Error('Redis ping failed');
        }
        await redisClient.disconnect();
        // redisClient.on("ready", () => {
        //     health.services.redis = 'connected'
        // })

    } catch (error) {
        health.services.redis = {
            status: 'disconnected',
            error: error
        }
    }

    try {
        const response = await cloudinary.api.ping();
        if (response.status === 'ok') {
            health.services.cloudinary = 'connected'
        }

    } catch (error) {
        health.services.cloudinary = {
            status: 'disconnected',
            error: error
        }
    }

    res.send(health)

}

module.exports = healthCheckController