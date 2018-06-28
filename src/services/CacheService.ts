import * as NodeCache from "node-cache";

class CacheService {
    private cache: NodeCache;

    constructor(ttlSeconds) {
        this.cache = new NodeCache({ stdTTL: ttlSeconds, checkperiod: ttlSeconds * 0.2, useClones: false });
    }

    get<T>(key: string, storeFunction: () => Promise<T>): Promise<T> {
        const value = this.cache.get(key);
        if (value) {
            return Promise.resolve(<T> value);
        }

        return storeFunction().then((result: T) => {
            this.cache.set(key, result);
            return result;
        });
    }

    del(keys: string): void {
        this.cache.del(keys);
    }

    delStartWith(startStr = ""): void {
        if (!startStr) {
            return;
        }

        const keys = this.cache.keys();
        for (const key of keys) {
            if (key.indexOf(startStr) === 0) {
                this.del(key);
            }
        }
    }

    flush(): void {
        this.cache.flushAll();
    }
}

export default CacheService;
