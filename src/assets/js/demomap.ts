import * as jQuery from "jquery";
import * as leaflet from "leaflet";
window.jQuery = jQuery;
window.$ = jQuery;

const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;
const regexp = new RegExp(regex);

function bindPopoup(feature, layer) {
    let description = feature.properties.description; // Get the description
    let match = description.match(regexp); // Check for a Link in the description
    let link;
    if (match) {
        link = description.match(regexp)[0]; // Link found!
    } else {
        link = undefined; // There is no link
    }
    description = description.replace(link, ""); // replace the link in the description with nothing
    let popoupText;
    if (link) {
        popoupText = `
            <h4>${feature.properties.name}</h4>
            <p><a href="${link}">${description}</a></p>
        `;
    } else if (description) {
        popoupText = `
            <h4>${feature.properties.name}</h4>
            <p>${description}</p>
        `;
    } else {
        popoupText = `
            <h4>${feature.properties.name}</h4>
        `;
    }

    let listText = "<li class='shadow-md p-3 mb-4'>" + popoupText + "</li>";
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