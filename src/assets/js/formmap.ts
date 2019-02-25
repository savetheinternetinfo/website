import * as jQuery from "jquery";
import * as leaflet from "leaflet";
window.jQuery = jQuery;
window.$ = jQuery;

const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;
const regexp = new RegExp(regex);

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function bindPopoup(feature, layer) {
    let popupText = "";

    for (let index = 0; index < feature.properties.length; index++) {
        const element = feature.properties[index];
        const translation = ((element.translation) ? element.translation : element.name);
        popupText += `<p class="mb-0"><b>${translation}</b> ${element.value}</p>`;
    }

    let listText = `<li class="shadow-md p-2 mb-4">${popupText}</li>`;
    layer.bindPopup(popupText);

    jQuery("#event-list").append(listText);
}


jQuery(() => {
    let demomap = leaflet.map("demomap").setView([50, 5.0], 4);
    leaflet.tileLayer("https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png", {
        attribution: "&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors | Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL | Save the Internet!"
    }).addTo(demomap);

    if (window.location.pathname === "/") {
        // Disable every map function
        demomap.dragging.disable();
        demomap.touchZoom.disable();
        demomap.doubleClickZoom.disable();
        demomap.scrollWheelZoom.disable();
        demomap.boxZoom.disable();
        demomap.keyboard.disable();
        jQuery(".leaflet-control-zoom").css("visibility", "hidden");
        jQuery("#demomap").css("cursor", "pointer");
        demomap.on("click", (e) => {
            window.location.href = "/actionday";
        });
    }

    /*
    jQuery.get("/mapcoords").done((data) => {
        if (window.location.pathname === "/") {
            leaflet.geoJSON(data).addTo(demomap);
        } else {
            leaflet.geoJSON(data, {
                onEachFeature: bindPopoup
            }).addTo(demomap);
        }
    });
    //*/

    jQuery("#search").click(function() {
        const place   = jQuery("#demo-place").val();
        const detail  = jQuery("#demo-detail").val();
        const postal  = jQuery("#demo-postal").val();
        const city    = jQuery("#demo-city").val();
        const country = jQuery("#demo-country").val();
        const date    = jQuery("#demo-date").val();
        const time    = jQuery("#demo-time").val();

        let form_data = {
            /* "format": "json", */
            "street":     place + ' ' + detail,
            "city":       city,
            "postalcode": postal,
            "country":    country
        };
        let query = "?format=json";
        for (let key in form_data) {
            query += '&' + key + '=' + form_data[key];
        }

        const where = city +', '+ place+ ((detail !== '') ? ' '+detail :'');
        const when = date + " - " + time;

        jQuery.ajax({
            url: "https://nominatim.openstreetmap.org/search" + query,
            type: "get"
        }).done(function(data) {
            let features = [];

            for (let index in data) {
                features.push({
                    "type": "Feature",
                    "properties": {
                        "where": where,
                        "when": when
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [ data[index].lat, data[index].lon ]
                    }
                });
            }

            console.log({
                "type": "FeatureCollection",
                "features": features
            });

            /*
            leaflet.geoJSON({
                "type": "FeatureCollection",
                "features": features
            }, {
                onEachFeature: bindPopoup
            }).addTo(demomap);
            //*/
        });
    });

});
