import CacheService from "./CacheService";
import * as fs from "fs";
import log from "../util/logging";

class DemomapService {


    private cache;
    private options;
    constructor(options) {
        this.cache = new CacheService(options.ttl);
        this.options = options;
    }

    private getCoordsFromJSON(): any {
        return this.cache.get("demomapcoords", () => {
            return new Promise((resolve, reject) => {
                fs.readFile(this.options.coordsfile, "utf8", (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        return resolve(JSON.parse(data));
                    }
                });
              });
        }).then(value => {
            return value;
        }).catch((err) => {
            log.error(err);
        });
    }

    getCoords(req, res): any {
        this.getCoordsFromJSON().then((coords) => {
            res.send(coords);
        }).catch((err) => {
            log.error(err);
        });
    }
}

export default DemomapService;
