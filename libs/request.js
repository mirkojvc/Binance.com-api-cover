/** 
 * Module for request generating
 */

const axios     = require('axios');
const crypto    = require('crypto');
const keys      = require('../libs/keys');

const endpoint  = "https://api.binance.com";

/**
 * Get regular request from binance.com
 * @param {String} path 
 * @param {String} params 
 * @return {JSON} data 
 */
const sendRequest = async (path, params = "") => {
    try {
        const currTime  = getCurrentTime();
        const options   = params !== "" ? "?"+params+currTime : "";
        const url       = endpoint+path+options;
        const response = await axios({
            method: "GET",
            url: url,
        });

        const data = await response.data;
        return data;
    } catch(error) {
        console.error(error);
    }    
}

/**
 * Get signed request from binance.com
 * @param {String} path 
 * @param {String} params 
 * @param {String} method 
 * @return {JSON} data
 */
const sendRequestWithSignature = async (path, params = "", method = "GET") => {
    try {
        const currTime  = "&timestamp="+getCurrentTime();
        const hash      = getUserSignature(params+currTime);
        const options   = params !== "" ? "?"+params+currTime : "";
        const url       = endpoint+path+options+"&signature="+hash;
        const response = await axios({
            method: method,
            url: url,
            headers: {
            'X-MBX-APIKEY': keys.key,
            },
        });

        const data = await response.data;
        return data;
    } catch(error) {
        console.error(error);
    }
}

/**
 * Creates a signature from users key and path options
 * @param {String} options 
 * @return {String} 
 */
const getUserSignature = (options) => {
    return crypto.createHmac('sha256', keys.secret).update(options).digest('hex');
}

/**
 * Returns current timestamp
 */
const getCurrentTime = () => {
    return new Date().getTime();
}

module.exports = {sendRequest, sendRequestWithSignature};
