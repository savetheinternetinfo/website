import CacheService from "./CacheService";
import * as GoogleSpreadsheet  from "google-spreadsheet";


class GoogleService {

    private cache: CacheService;
    private doc: GoogleSpreadsheet;
    private sheet;
    private config;
    constructor(config) {
        this.config = config;
        this.cache = new CacheService(1200);
        this.doc = new GoogleSpreadsheet ("19WKHONdULFT3U8T-5dhguM5UgO71OzHAzwhZq1MKXaY");
    }

    getData(): any {
        return this.cache.get("press_reviews", () => {
                return new Promise((resolve, reject) => {
                    this.doc.useServiceAccountAuth(this.config, (err1) => {
                        if (err1) { reject(err1); }
                        this.doc.getInfo((err2, info) => {
                            if (err2) { reject(err2); }
                            let last_update = info.updated;
                            this.sheet = info.worksheets[0];
                            this.sheet.getRows(( err3, rows ) => {
                                if (err3) { reject(err3); }
                                rows.shift(); // Remove the Table header
                                rows.reverse(); // Reverse the Array so the newer rows are first
                                resolve({
                                    "rows": rows,
                                    "last_update": last_update
                                });
                            });
                        });
                    });
            }).then(value => {
                return value;
            });
        });
    }
}

export default GoogleService;
