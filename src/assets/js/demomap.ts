import * as jQuery from "jquery";
import * as leaflet from "leaflet";
import * as moment from "moment";
window.jQuery = jQuery;
window.$ = jQuery;

jQuery(() => {

    const demomap = leaflet.map("demomap");
    const selectedLang = jQuery('html').attr('lang');
    function bindPopoup(feature, layer) {
        let popupText = "";

        for (let index = 0; index < feature.properties.length; index++) {
            const element = feature.properties[index];
            if(element.fa_icon === "fa-clock-o") {
                let momentObj = moment(element.value, "DD.MM.YYYY H:m");

                // Get locale data
                var localeData = moment.localeData(selectedLang);
                var format = localeData.longDateFormat('LLL')
                // Remove year part
                format = format.replace(/.YYYY/, ''); 
                element.value = momentObj.locale(selectedLang).format(format);
            }
            popupText += `<p class="mb-0 font-thin"><i class="fa ${element.fa_icon}" aria-hidden="true"></i> ${element.value}</p>`;
        }

        let listText = `<li class="shadow-md p-2 mb-4 rounded-lg cursor-pointer" id="markerListItem" data-latlang="${feature.geometry.coordinates}">${popupText}</li>`;
        let popup = layer.bindPopup(popupText);
        popup.on('click', function(e){
            demomap.flyTo(e.latlng, 14, {
                animate: true,
                duration: 1.5
            });
        });
        jQuery("#event-list").append(listText);
    }

    const STIIcon = leaflet.icon({
        iconUrl: "/static/pin-sti.png",
        iconSize: [32, 32],
        iconAnchor: [16, 37],
        popupAnchor: [0, -28]
      });
    const nonSTIIcon = leaflet.icon({
        iconUrl: "/static/pin_blank.png",
        iconSize: [32, 32],
        iconAnchor: [16, 37],
        popupAnchor: [0, -28]
      });
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

    jQuery.get("/mapcoords").done((data) => {
        if (window.location.pathname === "/") {
            leaflet.geoJSON(data).addTo(demomap);
        } else {
            let geoJSONLayer = leaflet.geoJSON(data, {
                pointToLayer: function (feature, latlng) {
                    if(feature['STIDemo']) {
                        return leaflet.marker(latlng, {icon: STIIcon});
                    }
                    return leaflet.marker(latlng, {icon: nonSTIIcon});
                },
                onEachFeature: bindPopoup
            }).addTo(demomap);
            demomap.fitBounds(geoJSONLayer.getBounds());
        }
        jQuery("#event-list li").click(function() {
            let latLang = jQuery(this).data("latlang");
            latLang = latLang.split(',');
            demomap.flyTo([latLang[1], latLang[0]], 14, {
                animate: true,
                duration: 1.5
            });
        });

    });

});