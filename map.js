require([
    "esri/Map",
    "esri/views/MapView",
    "esri/widgets/BasemapGallery",
    "esri/widgets/Legend",
    "esri/widgets/LayerList",
    "esri/widgets/Measurement",
    "esri/widgets/Print",
    "esri/widgets/Expand",
    "esri/layers/FeatureLayer",
    "esri/geometry/geometryEngine",
    "esri/layers/GraphicsLayer",
    "esri/Graphic"
], function(Map, MapView, BasemapGallery, Legend, LayerList, Measurement, Print, Expand, FeatureLayer,
    geometryEngine, GraphicsLayer, Graphic){
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
        /*popupTemplate: {
            title: "M&I Pipes"
        },*/
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
        },
        outFields: ["CARTOCODE"]
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
        },
        outFields: ["TOTAL_MKT_VALUE","PARCEL_ID"]
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
        },
        outFields: ["OBJECTID"]
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

    const graphics = new GraphicsLayer({
        title: "Graphics"
    });
    map.add(graphics);

    let miPipesLayerView;
    let roadsLayerView;
    let railroadsLayerView;
    let streamsLayerView;
    let lakesLayerView;
    let utahCountyParcelsLayerView;
    let schoolsPreKto12LayerView;
    let healthCareFacilitiesLayerView;

    miPipes.when(()=>{
        view.whenLayerView(miPipes).then(function(layerView){
            miPipesLayerView = layerView;
        });
    })
    .catch(errorCallback);

    roads.when(()=>{
        view.whenLayerView(roads).then(function(layerView){
            roadsLayerView = layerView
        })
    })
    .catch(errorCallback);

    railroads.when(()=>{
        view.whenLayerView(railroads).then(function(layerView){
            railroadsLayerView = layerView
        });
    })
    .catch(errorCallback);

    streams.when(()=>{
        view.whenLayerView(streams).then(function(layerView){
            streamsLayerView = layerView;
        });
    })
    .catch(errorCallback);

    lakes.when(()=>{
        view.whenLayerView(lakes).then(function(layerView){
            lakesLayerView = layerView
        })
    })
    .catch(errorCallback);

    utahCountyParcels.when(()=>{
        view.whenLayerView(utahCountyParcels).then(function(layerView){
            utahCountyParcelsLayerView = layerView
        });
    })
    .catch(errorCallback);

    schoolsPreKto12.when(()=>{
        view.whenLayerView(schoolsPreKto12).then(function(layerView){
            schoolsPreKto12LayerView = layerView;
        });
    })
    .catch(errorCallback);

    healthCareFacilities.when(()=>{
        view.whenLayerView(healthCareFacilities).then(function(layerView){
            healthCareFacilitiesLayerView = layerView
        })
    })
    .catch(errorCallback);

    function errorCallback(error){
        console.log("error happened: ",error.message);
    }

    let highlight;
    let feature;

    view.on("click", function(event){
        const options = { include: miPipes };
        view.hitTest(event,options).then((response)=>{
            if (highlight && feature) {
                highlight.remove();
                feature = null;
                graphics.removeAll();
            }
            if(response.results.length){
                
                feature = response.results.filter(function(result){
                    return result.graphic.layer === miPipes;
                })[0].graphic;
                highlight = miPipesLayerView.highlight(feature);
                return feature;
            } else if (response.results.length === 0){
                highlight.remove();
                feature = null;
                graphics.removeAll();
            }
        })
    });

    document.getElementById("calculate").addEventListener("click",calculateFunction);

    function calculateFunction(){
        if (feature){
            const geometry = feature.geometry;
            const buffer = geometryEngine.buffer(geometry, 1000, "feet");
            const bufferSym = {
                type: "simple-fill",
                color: [140,140,222,0.8]
            };
            graphics.add(new Graphic({
                geometry: buffer,
                symbol: bufferSym
            }));

            const queryParcels = utahCountyParcelsLayerView.createQuery();
            queryParcels.outStatistics = [
                {
                    onStatisticField: "TOTAL_MKT_VALUE",
                    outStatisticFieldName: "Average Market Value",
                    statisticType: "avg"
                }
            ];
            queryParcels.geometry = buffer;
            queryParcels.outFields = ["*"];

            utahCountyParcelsLayerView.queryFeatures(queryParcels).then((results) => {
                const attribute = results.features[0].attributes["Average Market Value"];
                console.log(attribute);
            });

            const queryStreets = roadsLayerView.createQuery();
            queryStreets.geometry = buffer;
            queryStreets.outFields = ["*"];
            queryStreets.returnGeometry = true;
            roadsLayerView.queryFeatures(queryStreets).then((results) =>{
                const features = results.features;
                let streetScoreArray = [];
                features.forEach(function(result,index){
                    const streetGeometry = result.geometry;
                    const streetDist = geometryEngine.distance(geometry,streetGeometry,"feet");
                    console.log("street distance: ",streetDist)
                    let streetScore;
                    if(streetDist == 0){
                        streetScore = 10;
                    } else if(streetDist > 0 && streetDist <= 50){
                        streetScore = 9;
                    } else if(streetDist > 50 && streetDist <= 100){
                        streetScore = 7;
                    } else if(streetDist > 100 && streetDist <= 250){
                        streetScore = 5;
                    } else if(streetDist > 250 && streetDist <= 500){
                        streetScore = 3;
                    } else if(streetDist > 500 && streetDist <= 1000){
                        streetScore = 1;
                    } else {
                        streetScore = 0;
                    }

                    streetScoreArray.push(streetScore);
                });

                const totalStreetScore = Math.max(...streetScoreArray);
                console.log("Total Street Score: ",totalStreetScore);
            });

            const queryHighways = roadsLayerView.createQuery();
            queryHighways.geometry = buffer;
            queryHighways.outFields = ["8"];
            queryHighways.returnGeometry = true;
            queryHighways.where = "CARTOCODE IN ('1','2','3','4','5')";
            roadsLayerView.queryFeatures(queryHighways).then((results)=>{
                let highwayScoreArray = [];

                if(results.length >= 1){
                    const features = results.features;

                    features.forEach(function(result,index){
                        const highwayGeom = result.geometry;
                        const highwayIntersect = geometryEngine.intersects(geometry,highwayGeom);
                        
                        let highwayScore;

                        if(highwayIntersect){
                            highwayScore = 10;
                        } else {
                            highwayScore = 0;
                        };

                        highwayScoreArray.push(highwayScore);
                    });
                } else {
                    highwayScoreArray.push(0);
                }

                const totalHighwayScore = Math.max(...highwayScoreArray);
                console.log("Total Highway Score: ",totalHighwayScore);
            });

            const queryRailroads = railroadsLayerView.createQuery();
            queryRailroads.geometry = buffer;
            queryRailroads.outFields = ["*"];
            queryRailroads.returnGeometry = true;
            railroadsLayerView.queryFeatures(queryRailroads).then((results)=>{
                let railroadScoreArray = [];
                if (results.length >= 1){

                    const features = results.features;

                    features.forEach(function(result,index){
                        const railroadGeom = result.geometry;
                        const railroadIntersect = geometryEngine.intersects(geometry,railroadGeom);
                        
                        let railroadScore;

                        if(railroadIntersect){
                            railroadScore = 10;
                        } else {
                            railroadScore = 0;
                        };

                        railroadScoreArray.push(railroadScore);
                    });
                } else {
                    railroadScoreArray.push(0);
                }
                const totalRailroadScore = Math.max(...railroadScoreArray);
                console.log("Total Railroad Score: ",totalRailroadScore);
                
            });

            const querySchools = schoolsPreKto12LayerView.createQuery();
            querySchools.geometry = buffer;
            querySchools.outFields = ["*"];
            querySchools.outStatistics = [
                {
                    onStatisticField: "OBJECTID",
                    outStatisticFieldName: "Total Schools",
                    statisticType: "count"
                }
            ];
            schoolsPreKto12LayerView.queryFeatures(querySchools).then((results)=>{
                const countSchools = results.features[0].attributes["Total Schools"];
                console.log("Count of Schools: ",countSchools)
            })
        }
    }
});