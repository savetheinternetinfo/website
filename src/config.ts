let env = require("dotenv").config("../.env");

if (env.error){
    throw new Error("Please copy the '.env.dist' file to a new '.env' file on the project root, and fill out the configuration");
}

export default {
    "server": {
        "port": 3000,
        "cookieprefix": "_sti",
        "localhost_only": false,
        "hook": {
            "githook_secret": "",
            "githook_commands": [
                "git pull"
            ]
        }
    },
    "galleryPath": "public/gallery/",
    "twitter": {
        "consumer_key": env.parsed.TWITTER_CONSUMER_KEY,
        "consumer_secret": env.parsed.TWITTER_CONSUMER_SECRET,
        "access_token_key": env.parsed.TWITTER_TOKEN_KEY,
        "access_token_secret": env.parsed.TWITTER_TOKEN_SECRET
    }
};
