"use strict";
const redis = require("redis");
const redisClient = redis.createClient();

(async () => {
  await redisClient.connect();
})();

redisClient.on("ready", () => {
  console.log("Connected to the Redis");
});

redisClient.on("error", (err) => {
  console.log("Error to the Redis");
});

const get = async (key) => await redisClient.get(key);

const set = async (key, count) => await redisClient.set(key, count);

const incrby = async (key, count) => await redisClient.incrBy(key, count);

const decrby = async (key, count) => await redisClient.decrBy(key, count);

const exists = async (key) => await redisClient.exists(key);

const setnx = async (key, count) => await redisClient.setNX(key, count);

module.exports = {
  get,
  set,
  incrby,
  exists,
  setnx,
  decrby,
};
