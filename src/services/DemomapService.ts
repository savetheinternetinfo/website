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
            for (let i = 0; i < coords.features.length; i++) {
                const feature = coords.features[i];
                for (let a = 0; a < feature.properties.length; a++) {
                    let property = feature.properties[a];
                    property.translation = res.__("demomap_prop_" + property.name);
                    console.log(property);
                }
            }
            res.send(coords);
        }).catch((err) => {
            log.error(err);
        });
    }
}

export default DemomapService;
