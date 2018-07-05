import CacheService from "./CacheService";
import * as google from "googleapis";

class GoogleService {

    private cache: CacheService;
    private config;
    private sheets;
    constructor(config) {
        this.config = config;
        this.cache = new CacheService(this.config.ttl);
        this.sheets = new google.sheets_v4.Sheets({
            withCredentials: false,
            auth: this.config.api_key
        });
    }

    getData(): any {
        return this.cache.get("press_reviews", () => {
                return this.sheets.spreadsheets.values.get({
                    spreadsheetId: this.config.sheet_id,
                    range: this.config.range
                }).then((res) => {
                    res.data.values.reverse();
                    return Promise.resolve(res.data);
                });
        }).then(value => {
            return value;
        });
    }
}

export default GoogleService;
