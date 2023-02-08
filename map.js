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
        title: "Utah Roads",
        renderer: {
            type: "unique-value",
            field: "CARTOCODE",
            defaultSymbol: {
                type: "simple-line",
                color: "#db7f39",
                width: 1
            },
            uniqueValueInfos: [
                {
                    value: "1",
                    symbol: {
                        type: "simple-line",
                        color: "#db7f39",
                        width: 3
                    }
                },{
                    value: "2",
                    symbol: {
                        type: "simple-line",
                        color: "#db7f39",
                        width: 3
                    }
                },{
                    value: "3",
                    symbol: {
                        type: "simple-line",
                        color: "#db7f39",
                        width: 3
                    }
                },{
                    value: "4",
                    symbol: {
                        type: "simple-line",
                        color: "#db7f39",
                        width: 3
                    }
                },{
                    value: "5",
                    symbol: {
                        type: "simple-line",
                        color: "#db7f39",
                        width: 3
                    }
                },{
                    value: "6",
                    symbol: {
                        type: "simple-line",
                        color: "#db7f39",
                        width: 2
                    }
                },{
                    value: "7",
                    symbol: {
                        type: "simple-line",
                        color: "#db7f39",
                        width: 2
                    }
                },{
                    value: "8",
                    symbol: {
                        type: "simple-line",
                        color: "#db7f39",
                        width: 2
                    }
                },{
                    value: "9",
                    symbol: {
                        type: "simple-line",
                        color: "#db7f39",
                        width: 2
                    }
                },{
                    value: "10",
                    symbol: {
                        type: "simple-line",
                        color: "#db7f39",
                        width: 2
                    }
                }
            ]
        }
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
        title: "Utah Streams",
        definitionExpression: "FCode_Text IN ('Canal/Ditch', 'Canal/Ditch - Aqueduct', 'Stream/River', 'Stream/River - Ephemeral',"
        + "'Stream/River - Intermittent', 'Stream/River - Perennial')",
        renderer: {
            type: "unique-value",
            field: "FCode_Text",
            defaultSymbol: {
                type: "simple-line",
                color: "#22daf2"
            },
            uniqueValueInfos: [
                {
                    value: "Canal/Ditch",
                    symbol: {
                        type: "simple-line",
                        color: "#99e6f0",
                        marker: {
                            color: "#99e6f0",
                            placement: "begin",
                            style: "cross"
                        },
                        width: 1
                    }
                },{
                    value: "Canal/Ditch - Aqueduct",
                    symbol: {
                        type: "simple-line",
                        color: "#99e6f0",
                        marker: {
                            color: "#99e6f0",
                            placement: "begin-end",
                            style: "cross"
                        },
                        width: 1
                    }
                },{
                    value: "Stream/River",
                    symbol: {
                        type: "simple-line",
                        color: "#99e6f0",
                        style: "long-dash-dot-dot",
                        width: 1
                    }
                },{
                    value: "Stream/River - Intermittent",
                    symbol: {
                        type: "simple-line",
                        color: "#99e6f0",
                        style: "long-dash-dot-dot",
                        width: 1
                    }
                },{
                    value: "Stream/River - Ephemeral",
                    symbol: {
                        type: "simple-line",
                        color: "#99e6f0",
                        style: "long-dash-dot-dot",
                        width: 1
                    }
                },{
                    value: "Stream/River - Perennial",
                    symbol: {
                        type: "simple-line",
                        color: "#99e6f0",
                        width: 1
                    }
                }
            ]
        }
    });

    const lakes = new FeatureLayer({
        url: "https://services1.arcgis.com/99lidPhWCzftIe9K/arcgis/rest/services/UtahLakesNHD/FeatureServer/0",
        visible: false,
        title: "Utah Lakes",
        renderer: {
            type: "simple",
            symbol: {
                type: "simple-fill",
                color: "#99e6f0",
                outline: {
                    color: [0,0,0,0],
                    width: 0
                }
            }
        }
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
        title: "PreK to 12 Schools",
        renderer: {
            type: "simple",
            symbol: {
                type: "web-style",
                styleName: "Esri2DPointSymbolsStyle",
                name: "school"
            }
        }
    });

    const healthCareFacilities = new FeatureLayer({
        url: "https://services1.arcgis.com/99lidPhWCzftIe9K/arcgis/rest/services/UtahHealthCareFacilities/FeatureServer/0",
        visible: false,
        title: "Health Care Facilities",
        renderer: {
            type: "simple",
            symbol: {
                type: "web-style",
                styleName: "Esri2DPointSymbolsStyle",
                name: "hospital"
            }
        }
    });

    map.addMany([roads,railroads,streams,lakes,utahCountyParcels,schoolsPreKto12,healthCareFacilities]);
    
    map.add(miPipes,100);
});