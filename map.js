require([
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/FeatureLayer"
], function(Map, MapView, FeatureLayer){
    const map = new Map({
        basemap: "satellite"
    });

    const view = new MapView({
        container: "viewDiv",
        map: map,
        center: [-111.65, 40.4],
        zoom: 12
    });

    const miPipes = new FeatureLayer({
        url: "https://maps.cuwcd.com/arcgis/rest/services/testing/MIPipelinesCOF/MapServer/0",
        popupTemplate: {
            title: "M&I Pipes"
        },
        definitionExpression: "facility_name = 'Alpine Aqueduct Reach 3'"
    });
    map.add(miPipes);
});