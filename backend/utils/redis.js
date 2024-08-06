const redis = require('ioredis');
const client = redis.createClient(6379);

const expirationTime = 300;
const movieKeyFormat = 'imdbID=';

async function setCache(movieId, data) {
    let key = movieKeyFormat + movieId;
    return await set(key, JSON.stringify(data))
}

async function set(key, data) {
    await client.setex(key, expirationTime, data);
}

async function getCache(movieId) {
    let key = movieKeyFormat + movieId;
    let data = await get(key);
    return JSON.parse(data);
}

async function get(key) {
    return await client.get(key);
}

// async function clearCache(movieId) {
//     let key = movieKeyFormat + movieId;
//     return await clear(key);
// }

// async function clear(key) {
//     return await client.del(key);
// }

module.exports.getCache = getCache
module.exports.setCache = setCache
// module.exports.clearCache = clearCache