import CacheService from "./CacheService";
import * as Crypto from "crypto";

const Metascraper = require("metascraper");
const Got = require("got");

class MetaService {

    private cache: CacheService;
    private config;

    constructor(config) {
        this.config = config;
        this.cache = new CacheService(this.config.ttl);
    }

    get(page: string): any {
        let cacheKey = this.config.prefix +  Crypto.createHash("md5").update(page).digest("hex");

        return this.cache.get(cacheKey, async () => {
            // Deny loopback
            if (/^https?:\/\/localhost|^https?:\/\/127(?:\.[0-9]+){0,2}\.[0-9]+/.test(page)) {
                return Promise.reject("Invalid hostname");
            }

            try {
                const {body: html, url} = await Got(page);
                const meta = await Metascraper({html, url});

                return Promise.resolve(meta);
            } catch (e) {
                return Promise.reject({message: e.message});
            }

        }).then(value => {
            return value;
        });
    }
}

export default MetaService;
