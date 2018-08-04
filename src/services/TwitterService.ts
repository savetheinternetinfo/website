import * as twitter from "twitter";
import CacheService from "./CacheService";

export type User = {
    screen_name: string;
    profile_image_url_https: string;
};

export type Status = {
    id: number;
    created_at: string;
    text: string;
    user: User;
};

export type Tweets = {
    statuses: Status[];
};

class TwitterService {

    private tclient: twitter;
    private cache: CacheService;
    private config;

    constructor(options) {
        if (options.consumer_key && options.consumer_key != null) {
            this.tclient = new twitter({
                "consumer_key": options.consumer_key,
                "consumer_secret": options.consumer_secret,
                "access_token_key": options.access_token_key,
                "access_token_secret": options.access_token_secret
            });
        }
        this.cache = new CacheService(options.ttl);
        this.config = options;
    }

    getTweet(): Promise<Tweets> {
        return this.cache.get<Tweets>("tweets", () => {
            return this.tclient ? this.tclient.get<Tweets>("search/tweets", {
                q: this.config.query
            }).then((res) => {
                return Promise.resolve(res);
            }) : Promise.resolve({});
        }).then(value => {
            return value;
        });
    }
}

export default TwitterService;
