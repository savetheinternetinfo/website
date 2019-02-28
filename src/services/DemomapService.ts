import CacheService from "./CacheService";
import * as fs from "fs";
import log from "../util/logging";
import * as Joi from "joi";

class DemomapService {


    private cache;
    private options;
    constructor(options) {
        this.cache = new CacheService(options.ttl);
        this.options = options;
    }

    private getCoordsFromJSON(): any {
        const geoJSONschema = Joi.object().keys({
            type: Joi.string().valid("FeatureCollection"),
            features: Joi.array().items(Joi.object().keys({
                type: Joi.string().valid("Feature"),
                properties: Joi.array().items(Joi.object().keys({
                    fa_icon: Joi.string().lowercase(),
                    value: Joi.any(),
                })),
                geometry: Joi.object().keys({
                    type: Joi.string().valid("Point"),
                    coordinates: Joi.array().ordered([
                        Joi.number().min(-20037508.3427892).max(20037508.3427892),
                        Joi.number().min(-20037508.3427892).max(20037508.3427892)
                    ])  
                })
            }))
        });
        return this.cache.get("demomapcoords", () => {
            return new Promise((resolve, reject) => {
                fs.readFile(this.options.coordsfile, "utf8", (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        return resolve(geoJSONschema.validate(data));
                    }
                });
              });
        }).then(value => {
            return geoJSONschema.validate(value);
        });
    }

    getCoords(req, res): any {
        this.getCoordsFromJSON().then((coords) => {
            res.send(coords);
        }).catch((err) => {
            res.send("Could not generate GeoJSON data!");
            log.error(err);
        });
    }
}

export default DemomapService;
