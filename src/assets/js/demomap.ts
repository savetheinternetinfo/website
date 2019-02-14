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
    let popoupText = "";

    for(let key in feature.properties) {
        let link;
        let text;
        text = feature.properties[key];
        let match = text.match(regexp); // Check for a Link in the text
        if (match) {
            link = text.match(regexp)[0]; // Link found!
            text = text.replace(link, ""); // replace the link in the description with nothing
        }
        let title = capitalizeFirstLetter(key);
        if (link) {
            popoupText += `
                <p><b>${title}: </b><a href="${link}">${text}</a></p>
            `;
        } else {
            popoupText += `
                <p><b>${title}: </b>${text}</p>
            `;
        }
    }

    let listText = "<li class='shadow-md p-2 mb-4'>" + popoupText + "</li>";
    layer.bindPopup(popoupText);

    jQuery("#event-list").append(listText);
}

jQuery(() => {
    let demomap = leaflet.map("demomap").setView([50, 5.0], 4);
    leaflet.tileLayer("https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png", {
        attribution: "&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors | Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL"
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

    jQuery.get("/mapcoords").done((data) => {
        if (window.location.pathname === "/") {
            leaflet.geoJSON(data).addTo(demomap);
        } else {
            leaflet.geoJSON(data, {
                onEachFeature: bindPopoup
            }).addTo(demomap);
        }

    });

});