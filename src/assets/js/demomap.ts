import * as jQuery from "jquery";
import * as leaflet from "leaflet";
window.jQuery = jQuery;
window.$ = jQuery;

function bindPopoup(feature, layer) {
    layer.bindPopup("<h1>" + feature.properties.name + "</h1><p>name: " + feature.properties.description + "</p>");
}

jQuery(() => {
    let demomap = leaflet.map("demomap").setView([50, 5.0], 4);
    leaflet.tileLayer("https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png", {
        attribution: "&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors"
    }).addTo(demomap);

    jQuery.get("/mapcoords").done((data) => {
        leaflet.geoJson(data, {
            onEachFeature: bindPopoup
          }).addTo(demomap);
    });

});