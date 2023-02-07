require([
    "esri/Map",
    "esri/views/MapView",
    "esri/widgets/BasemapGallery",
    "esri/widgets/Legend",
    "esri/widgets/LayerList",
    "esri/widgets/Measurement",
    "esri/widgets/Print",
    "esri/widgets/Expand",
    "esri/layers/FeatureLayer"
], function(Map, MapView, BasemapGallery, Legend, LayerList, Measurement, Print, Expand, FeatureLayer){
    const map = new Map({
        basemap: "satellite"
    });

    const view = new MapView({
        container: "viewDiv",
        map: map,
        center: [-111.75, 40.37],
        zoom: 13
    });

    const basemapGallery = new BasemapGallery({
        view: view
    });

    const basemapExpand = new Expand({
        view: view,
        content: basemapGallery,
        expandIconClass: "esri-icon-basemap",
        container: "toolBar"
    });

    const legend = new Legend({
        view: view
    });

    const legendExpand = new Expand({
        view: view,
        content: legend,
        expandIconClass: "esri-icon-legend",
        container: "toolBar"
    });

    const layerList = new LayerList({
        view: view
    });

    const layerExpand = new Expand({
        view: view,
        content: layerList,
        expandIconClass: "esri-icon-layer-list",
        container: "toolBar"
    });

    const measurement = new Measurement({
        view: view,
        linearUnit: "us-feet"
    });

    const measureExpand = new Expand({
        view: view,
        content: measurement,
        expandIconClass: "esri-icon-measure",
        container: "toolBar",
        expanded: false
    });

    const print = new Print({
        view: view
    });

    const printExpand = new Expand({
        view: view,
        content: print,
        expandIconClass: "esri-icon-printer",
        container: "toolBar"
    });

    //view.ui.add("titleBar","top-left");
    view.ui.move("zoom","top-left");
    view.ui.add("toolBar","top-right");

    document.getElementById("toolBar").addEventListener("click",function(){
        if(measureExpand.expanded === true){
            measurement.activeTool = "distance";
        } else if (measureExpand.expanded === false){
            measurement.activeTool = null;
        }
    });

    const miPipes = new FeatureLayer({
        url: "https://maps.cuwcd.com/arcgis/rest/services/testing/MIPipelinesCOF/MapServer/0",
        popupTemplate: {
            title: "M&I Pipes"
        },
        definitionExpression: "facility_name = 'Alpine Aqueduct Reach 3'",
        title: "Alpine Aqueduct Reach 3 Pipelines"
    });

    const roads = new FeatureLayer({
        url: "https://services1.arcgis.com/99lidPhWCzftIe9K/arcgis/rest/services/UtahRoads/FeatureServer/0",
        visible: false,
        title: "Utah Roads"
    });
    
    const railroads = new FeatureLayer({
        url: "https://services1.arcgis.com/99lidPhWCzftIe9K/arcgis/rest/services/UtahRailroads/FeatureServer/0",
        visible: false,
        title: "Utah Railroads",
        renderer: {
            type: "simple",
            symbol: {
                type: "simple-line",
                style: "short-dash-dot",
                color: "#424242",
                width: 2
            }
        }
    });

    const streams = new FeatureLayer({
        url: "https://services1.arcgis.com/99lidPhWCzftIe9K/arcgis/rest/services/UtahStreamsNHD/FeatureServer/0",
        visible: false,
        title: "Utah Streams"
    });

    const lakes = new FeatureLayer({
        url: "https://services1.arcgis.com/99lidPhWCzftIe9K/arcgis/rest/services/UtahLakesNHD/FeatureServer/0",
        visible: false,
        title: "Utah Lakes"
    });

    const utahCountyParcels = new FeatureLayer({
        url: "https://services1.arcgis.com/99lidPhWCzftIe9K/arcgis/rest/services/Parcels_Utah_LIR/FeatureServer/0",
        visible: false,
        title: "Utah County Parcels",
        renderer: {
            type: "simple",
            symbol: {
                type: "simple-fill",
                color: [0,0,0,0],
                outline: {
                    width: 0.75,
                    color: "black"
                }
            }
        }
    });

    const schoolsPreKto12 = new FeatureLayer({
        url: "https://services1.arcgis.com/99lidPhWCzftIe9K/arcgis/rest/services/Schools_PreKto12/FeatureServer/0",
        visible: false,
        title: "PreK to 12 Schools"
    });

    const healthCareFacilities = new FeatureLayer({
        url: "https://services1.arcgis.com/99lidPhWCzftIe9K/arcgis/rest/services/UtahHealthCareFacilities/FeatureServer/0",
        visible: false,
        title: "Health Care Facilities"
    });

    map.addMany([roads,railroads,streams,lakes,utahCountyParcels,schoolsPreKto12,healthCareFacilities]);
    
    map.add(miPipes,100);
});