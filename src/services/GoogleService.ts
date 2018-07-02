import CacheService from "./CacheService";
import * as GoogleSpreadsheet  from "google-spreadsheet";


class GoogleService {

    private cache: CacheService;
    private doc: GoogleSpreadsheet;
    private sheet;
    constructor() {
        this.cache = new CacheService(1200);
        this.doc = new GoogleSpreadsheet ("19WKHONdULFT3U8T-5dhguM5UgO71OzHAzwhZq1MKXaY");
    }

    getData(): any {
        return this.cache.get("press_reviews", () => {
                return new Promise((resolve) => {
                    this.doc.useServiceAccountAuth(require("../../google_cred.json"), (err1) => {
                        this.doc.getInfo((err2, info) => {
                            let last_update = info.updated;
                            this.sheet = info.worksheets[0];
                            this.sheet.getRows(( err3, rows ) => {
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
