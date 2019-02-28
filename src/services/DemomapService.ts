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
                    name: Joi.string().lowercase(),
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
                }
            }
            res.send(coords);
        }).catch((err) => {
            log.error(err);
        });
    }
}

export default DemomapService;
