import * as twitter from 'twitter'
import CacheService from './CacheService';

export type User = {
    screen_name: string;
    profile_image_url_https: string;
}

export type Status = {
    created_at: string;
    text: string;
    user: User;
}

export type Tweets = {
    statuses: Status[];
}

class TwitterService {

    private tclient : twitter
    private cache : CacheService

    constructor(options) {
        this.tclient = new twitter(options);
        this.cache = new CacheService(600);
    }

    getTweet() : Promise<Tweets> {
        this.cache.flush();
        return this.cache.get<Tweets>("Tweets", () => {
            return this.tclient.get<Tweets>('search/tweets', {count: 20, q: '#FCKArt13'}).then((res) => {
                return Promise.resolve(res);
            });
        }).then(value => {
            return value;
        });
    }

}

export default TwitterService;