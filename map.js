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
    "esri/Graphic",
], function(Map, MapView, BasemapGallery, Legend, LayerList, Measurement, Print, Expand, FeatureLayer,
    geometryEngine, GraphicsLayer, Graphic){
    const map = new Map({
        basemap: "satellite"
    });

    const view = new MapView({
        container: "viewDiv",
        map: map,
        center: [-111.75, 40.37],
        zoom: 13,
        popup: {
            dockEnabled: true
        }
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

    document.getElementById("print-btn").addEventListener("click",async function(){
        const closedPopup = await view.popup.close();
        Promise.all([closedPopup]).then(window.print());
    });

    const node = document.getElementById("print-btn");

    const printExpand = new Expand({
        view: view,
        content: node,
        expandIconClass: "esri-icon-printer",
        container: "toolBar"
    });

    view.ui.add("print-btn","bottom-right")
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
            id: "miPopup",
            title: "{name}",
            content: [
                {
                    type: "fields",
                    fieldInfos: [
                        {
                            fieldName: "alt_name",
                            label: "Alternate Name"
                        },{
                            fieldName: "diameter_inches",
                            label: "Diameter (inches)",
                            format: {
                                digitSeparator: false,
                                places: 0
                            }
                        },{
                            fieldName: "description",
                            label: "Description"
                        },{
                            fieldName: "facility_name",
                            label: "Facility"
                        }
                    ]
                }
            ]
        },
        title: "Alpine Aqueduct Reach 3 Pipelines",
        outFields: ["*"]
    });

    const roads = new FeatureLayer({
        url: "https://services1.arcgis.com/99lidPhWCzftIe9K/arcgis/rest/services/UtahRoads/FeatureServer/0",
        visible: true,
        title: "Utah Roads",
        outFields: ["CARTOCODE"],
        opacity: 0,
        legendEnabled: false,
        listMode: "hide"
    });

    const roadsVisible = new FeatureLayer({
        url: "https://services1.arcgis.com/99lidPhWCzftIe9K/arcgis/rest/services/UtahRoads/FeatureServer/0",
        visible: false,
        title: "Utah Roads",
        popupTemplate: {
            id: "roads-popup",
            title: "Utah Roads",
            content: [{
                type: "fields",
                fieldInfos: [
                    {
                        fieldName: "FULLNAME",
                        label: "Name"
                    },{
                        fieldName: "CARTOCODE",
                        label: "Cartographic Code"
                    }
                ]
            }]
        },
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
        visible: true,
        title: "Utah Railroads",
        opacity: 0,
        legendEnabled: false,
        listMode: "hide"
    });

    const railroadsVisible = new FeatureLayer({
        url: "https://services1.arcgis.com/99lidPhWCzftIe9K/arcgis/rest/services/UtahRailroads/FeatureServer/0",
        visible: false,
        title: "Utah Railroads",
        renderer: {
            type: "simple",
            symbol: {
                type: "simple-line",
                style: "long-dash-dot",
                color: "#424242",
                width: 2
            }
        },
        popupTemplate: {
            title: "Utah Railroads",
            content: [{
                type: "fields",
                fieldInfos: [{
                    fieldName: "RAILROAD",
                    label: "Railroad"
                }]
            }]
        }
    });

    const streams = new FeatureLayer({
        url: "https://services1.arcgis.com/99lidPhWCzftIe9K/arcgis/rest/services/UtahStreamsNHD/FeatureServer/0",
        visible: true,
        title: "Utah Streams",
        definitionExpression: "FCode_Text IN ('Canal/Ditch', 'Canal/Ditch - Aqueduct', 'Stream/River', 'Stream/River - Ephemeral',"
        + "'Stream/River - Intermittent', 'Stream/River - Perennial')",
        outFields: ["FCode_Text"],
        legendEnabled: false,
        opacity: 0,
        listMode: "hide"
    });

    const streamsVisible = new FeatureLayer({
        url: "https://services1.arcgis.com/99lidPhWCzftIe9K/arcgis/rest/services/UtahStreamsNHD/FeatureServer/0",
        visible: false,
        title: "Utah Streams",
        definitionExpression: "FCode_Text IN ('Canal/Ditch', 'Canal/Ditch - Aqueduct', 'Stream/River', 'Stream/River - Ephemeral',"
        + "'Stream/River - Intermittent', 'Stream/River - Perennial')",
        outFields: ["FCode_Text"],
        popupTemplate: {
            title: "Utah Streams",
            content: [{
                type: "fields",
                fieldInfos: [
                    {
                        fieldName: "GNIS_Name",
                        label: "Name"
                    },{
                        fieldName: "FCode_Text",
                        label: "Feature Code Text"
                    }
                ]
            }]
        },
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
                        width: 3
                    }
                }
            ]
        }
    });

    /*const lakes = new FeatureLayer({
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
    });*/

    const utahCountyParcels = new FeatureLayer({
        url: "https://services1.arcgis.com/99lidPhWCzftIe9K/arcgis/rest/services/Parcels_Utah_LIR/FeatureServer/0",
        visible: true,
        title: "Utah County Parcels",
        opacity: 0,
        legendEnabled: false,
        outFields: ["TOTAL_MKT_VALUE","PARCEL_ID"],
        listMode: "hide"
    });

    const utahCountyParcelsVisible = new FeatureLayer({
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
        outFields: ["TOTAL_MKT_VALUE","PARCEL_ID"],
        popupTemplate: {
            title: "Utah County Parcels",
            content: [{
                type: "fields",
                fieldInfos: [
                    {
                        fieldName: "PARCEL_ID",
                        label: "Parcel ID"
                    },{
                        fieldName: "TOTAL_MKT_VALUE",
                        label: "Total Market Value",
                        format: {
                            digitSeparator: true,
                            places: 2
                        }
                    }
                ]
            }]
        }
    });

    const schoolsPreKto12 = new FeatureLayer({
        url: "https://services1.arcgis.com/99lidPhWCzftIe9K/arcgis/rest/services/Schools_PreKto12/FeatureServer/0",
        visible: true,
        title: "PreK to 12 Schools",
        opacity: 0,
        legendEnabled: false,
        outFields: ["OBJECTID"],
        listMode: "hide"
    });

    const schoolsPreKto12Visible = new FeatureLayer({
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
        outFields: ["OBJECTID"],
        popupTemplate: {
            title: "Utah Schools PreK to 12",
            content: [{
                type: "fields",
                fieldInfos: [
                    {
                        fieldName: "SchoolName",
                        label: "School Name"
                    }
                ]
            }]
        }
    });

    const healthCareFacilities = new FeatureLayer({
        url: "https://services1.arcgis.com/99lidPhWCzftIe9K/arcgis/rest/services/UtahHealthCareFacilities/FeatureServer/0",
        visible: true,
        title: "Health Care Facilities",
        opacity: 0,
        legendEnabled: false,
        outFields: ["TYPE"],
        definitionExpression: "TYPE = 'HOSPITAL'",
        listMode: "hide"
    });

    const healthCareFacilitiesVisible = new FeatureLayer({
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
        },
        outFields: ["TYPE"],
        definitionExpression: "TYPE = 'HOSPITAL'",
        popupTemplate: {
            title: "Utah Health Care Facilities - Hospitals",
            content: [{
                type: "fields",
                fieldInfos: [
                    {
                        fieldName: "NAME",
                        label: "Name"
                    }
                ]
            }]
        }
    });

    map.addMany([roads,railroads,streams,utahCountyParcels,schoolsPreKto12,healthCareFacilities]);
    map.addMany([roadsVisible,railroadsVisible,streamsVisible,utahCountyParcelsVisible,schoolsPreKto12Visible,healthCareFacilitiesVisible]);
    
    map.add(miPipes,100);

    const graphics = new GraphicsLayer({
        title: "Graphics",
        listMode: "hide"
    });
    map.add(graphics);

    let miPipesLayerView;
    let roadsLayerView;
    let railroadsLayerView;
    let streamsLayerView;
    //let lakesLayerView;
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

    /*lakes.when(()=>{
        view.whenLayerView(lakes).then(function(layerView){
            lakesLayerView = layerView
        })
    })
    .catch(errorCallback);*/

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
            document.getElementById("pipeScore").innerText = "";
            
            document.getElementById("propertyScore").innerText = "";
            
            document.getElementById("streetScore").innerText = "";
            
            document.getElementById("highwayRailroadScore").innerText = "";
            
            document.getElementById("criticalFacScore").innerText = "";
            
            document.getElementById("accessScore").innerText = "";
            
            document.getElementById("waterScore").innerText = "";
            
            document.getElementById("totalScore").innerText = "";

            if(response.results.length){
                if (highlight && feature) {
                    highlight.remove();
                    feature = null;
                    graphics.removeAll();
                    document.getElementById("pipeline_id").innerText = "";
                }
                feature = response.results.filter(function(result){
                    return result.graphic.layer === miPipes;
                })[0].graphic;
                highlight = miPipesLayerView.highlight(feature);

                const name = feature.attributes["name"];

                document.getElementById("pipeline_id").innerText = name;

                return feature;

            } else if (response.results.length === 0){
                if (highlight && feature) {
                    highlight.remove();
                    feature = null;
                    graphics.removeAll();
                    document.getElementById("pipeline_id").innerText = "";
                }
            }
        })
    });

    document.getElementById("calculate").addEventListener("click",function(){
        calculateFunction()
    });

    let pipeScore;
    var propertyScoreArray = [];
    var streetAScoreArray = [];
    var streetBScoreArray = [];
    var highwayScoreArray = [];
    var railroadScoreArray = [];
    var schoolScoreArray = [];
    var hospitalScoreArray = [];
    var accessScoreArray = [];
    var seasonalStreamScoreArray = [];
    var perennialStreamScoreArray = [];

    async function calculateFunction(){
        if (feature){
            const geometry = feature.geometry;
            const buffer = geometryEngine.buffer(geometry, 1000, "feet");
            const bufferSym = {
                type: "simple-fill",
                color: [0,0,0,0],
                outline: {
                    color: [0,0,0,0],
                    width: 1
                }
            };
            graphics.add(new Graphic({
                geometry: buffer,
                symbol: bufferSym
            }));

            const pipeDiameter = feature.attributes["diameter_inches"];
            if(pipeDiameter >= 84){
                pipeScore = 10;
            } else if(pipeDiameter < 84 && pipeDiameter >= 60){
                pipeScore = 9;
            } else if (pipeDiameter < 60 && pipeDiameter >= 43){
                pipeScore = 7;
            } else if (pipeDiameter < 43 && pipeDiameter >= 24){
                pipeScore = 5;
            } else if (pipeDiameter < 24 && pipeDiameter >= 12){
                pipeScore = 3;
            } else if (pipeDiameter < 12){
                pipeScore = 1;
            } else {
                pipeScore = "No Diameter"
            }

            await propertyScore(buffer);
            await streetAScore(geometry,buffer);
            await streetBScore(geometry,buffer);
            await highwayScore(geometry,buffer);
            await railroadScore(geometry,buffer);
            await schoolScore(geometry,buffer);
            await hospitalScore(geometry,buffer);
            await accessScore(geometry,buffer);
            await seasonalStreamScore(geometry,buffer);
            await perennialStreamScore(geometry,buffer);
            Promise.all([propertyScore,streetAScore,streetBScore,
            highwayScore,railroadScore,schoolScore,hospitalScore,
        accessScore,seasonalStreamScore,perennialStreamScore]).then(()=>{calculateScore()})
            
        }
    }

    async function propertyScore(buffer){
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

        await utahCountyParcelsLayerView.queryFeatures(queryParcels)
            .then((results) => {
                const attribute = results.features[0].attributes["Average Market Value"];
                console.log("Average Market Value: ",attribute);
                let propertyScore;
                
                if (attribute >= 1000000){
                    propertyScore = 10
                } else if (attribute >= 500000 && attribute < 1000000){
                    propertyScore = 9;
                } else if (attribute >= 375000 && attribute < 500000){
                    propertyScore = 7;
                } else if (attribute >= 250000 && attribute < 375000){
                    propertyScore = 5;
                } else if (attribute >= 125000 && attribute < 250000){
                    propertyScore = 3;
                } else if (attribute >= 0 && attribute < 125000){
                    propertyScore = 1;
                } else {
                    propertyScore = 0;
                };

                propertyScoreArray = [];
                propertyScoreArray.push(propertyScore);
                console.log("PropertyScoreArray in Promise: ",propertyScoreArray[0]);
                
            });   
    }

    async function streetAScore(geometry,buffer){
        const queryStreetsA = roadsLayerView.createQuery();
        queryStreetsA.geometry = buffer;
        queryStreetsA.outFields = ["*"];
        queryStreetsA.returnGeometry = true;
        queryStreetsA.where = "CARTOCODE IN ('1','2','3','4','5','6','7','8','9','10')"
        await roadsLayerView.queryFeatures(queryStreetsA).then((results) =>{
            let streetScoreArray = [];
            if (results.features.length >= 1){
                const features = results.features;
                features.forEach(function(result,index){
                    const streetAGeometry = result.geometry;
                    const streetADist = geometryEngine.distance(geometry,streetAGeometry,"feet");
                    console.log("street A distance: ",streetADist)
                    let streetAScore;
                    if(streetADist == 0){
                        streetAScore = 10;
                    } else if(streetADist > 0 && streetADist < 50){
                        streetAScore = 9;
                    } else if(streetADist >= 50 && streetADist < 100){
                        streetAScore = 7;
                    } else if(streetADist >= 100 && streetADist < 250){
                        streetAScore = 5;
                    } else if(streetADist >= 250 && streetADist < 500){
                        streetAScore = 3;
                    } else if(streetADist >= 500 && streetADist < 1000){
                        streetAScore = 1;
                    } else {
                        streetAScore = 0;
                    }

                    streetScoreArray.push(streetAScore);
                });
            } else {
                streetScoreArray.push(0);
            }

            streetAScoreArray = [];
            let streetAScoreMax = Math.max(...streetScoreArray)
            streetAScoreArray.push(streetAScoreMax);
            
            console.log("Total Street A Score: ",streetAScoreArray[0]);
            
        });
    }

    async function streetBScore(geometry,buffer){
        const queryStreetsB = roadsLayerView.createQuery();
        queryStreetsB.geometry = buffer;
        queryStreetsB.outFields = ["*"];
        queryStreetsB.returnGeometry = true;
        queryStreetsB.where = "CARTOCODE IN ('11','12','13','14','15','16','17','18','99')"
        await roadsLayerView.queryFeatures(queryStreetsB).then((results) =>{
            let streetScoreArray = [];
            if(results.features.length >= 1){
                const features = results.features;
                features.forEach(function(result,index){
                    const streetBGeometry = result.geometry;
                    const streetBDist = geometryEngine.distance(geometry,streetBGeometry,"feet");
                    console.log("street B distance: ",streetBDist)
                    let streetBScore;
                    if(streetBDist == 0){
                        streetBScore = 7;
                    } else if(streetBDist > 0 && streetBDist < 50){
                        streetBScore = 5;
                    } else if(streetBDist >= 50 && streetBDist < 100){
                        streetBScore = 3;
                    } else if(streetBDist >= 100 && streetBDist < 500){
                        streetBScore = 1;
                    } else {
                        streetBScore = 0;
                    }

                    streetScoreArray.push(streetBScore);
                });
            } else {
                streetScoreArray.push(0);
            };

            streetBScoreArray = [];

            let totalStreetBScore = Math.max(...streetScoreArray);
            streetBScoreArray.push(totalStreetBScore);
            console.log("Total Street B Score: ",streetBScoreArray[0]);
        });
    }

    async function highwayScore(geometry,buffer){
        const queryHighways = roadsLayerView.createQuery();
        queryHighways.geometry = buffer;
        queryHighways.outFields = ["8"];
        queryHighways.returnGeometry = true;
        queryHighways.where = "CARTOCODE IN ('1','2','3','4','5')";
        await roadsLayerView.queryFeatures(queryHighways).then((results)=>{
            let highwayArray = [];

            if(results.features.length >= 1){
                const features = results.features;

                features.forEach(function(result,index){
                    const highwayGeom = result.geometry;
                    const highwayIntersect = geometryEngine.crosses(geometry,highwayGeom);
                    
                    let highwayScore;

                    if(highwayIntersect){
                        highwayScore = 10;
                    } else {
                        highwayScore = 0;
                    };

                    highwayArray.push(highwayScore);
                });
            } else {
                highwayArray.push(0);
            }

            highwayScoreArray = [];
            let totalHighwayScore = Math.max(...highwayArray);
            highwayScoreArray.push(totalHighwayScore)
            console.log("Total Highway Score: ",totalHighwayScore);
        });
    }

    async function railroadScore(geometry,buffer){
        const queryRailroads = railroadsLayerView.createQuery();
        queryRailroads.geometry = buffer;
        queryRailroads.outFields = ["*"];
        queryRailroads.returnGeometry = true;
        await railroadsLayerView.queryFeatures(queryRailroads).then((results)=>{
            let railroadArray = [];
            if (results.features.length >= 1){

                const features = results.features;

                features.forEach(function(result,index){
                    const railroadGeom = result.geometry;
                    const railroadIntersect = geometryEngine.crosses(geometry,railroadGeom);
                    
                    let railroadScore;

                    if(railroadIntersect){
                        railroadScore = 10;
                    } else {
                        railroadScore = 0;
                    };

                    railroadArray.push(railroadScore);
                });
            } else {
                railroadArray.push(0);
            }
            railroadScoreArray = [];
            let totalRailroadScore = Math.max(...railroadArray);
            railroadScoreArray.push(totalRailroadScore)
            console.log("Total Railroad Score: ",totalRailroadScore);
        });
    }

    async function schoolScore(geometry,buffer){
        const querySchools = schoolsPreKto12LayerView.createQuery();
        querySchools.geometry = buffer;
        querySchools.outFields = ["*"];
        querySchools.returnGeometry = true;
        await schoolsPreKto12LayerView.queryFeatures(querySchools).then((results)=>{
            let schoolArray = [];
            if (results.features.length >= 1){
                const features = results.features;
                features.forEach(function(result,index){
                    const schoolGeom = result.geometry;
                    const schoolDist = geometryEngine.distance(geometry, schoolGeom, "feet");
                    console.log("School Distance: ",schoolDist);
                    let schoolScore;
                    if (schoolDist < 100){
                        schoolScore = 10;
                    } else if (schoolDist >= 100 && schoolDist < 150){
                        schoolScore = 9;
                    } else if (schoolDist >= 150 && schoolDist < 200){
                        schoolScore = 7;
                    } else if (schoolDist >= 200 && schoolDist < 300){
                        schoolScore = 5;
                    } else if (schoolDist >= 300 && schoolDist < 500){
                        schoolScore = 3;
                    } else if (schoolDist >= 500 && schoolDist < 1000){
                        schoolScore = 1;
                    } else {
                        schoolScore = 0;
                    }
                    schoolArray.push(schoolScore);
                })
            } else {
                schoolArray.push(0);
            }
            schoolScoreArray = [];
            let totalSchoolScore = Math.max(...schoolArray);
            schoolScoreArray.push(totalSchoolScore);
            console.log("Total School Score: ",totalSchoolScore);
        });
    }

    async function hospitalScore(geometry,buffer){
        const queryHospitals = healthCareFacilitiesLayerView.createQuery();
        queryHospitals.geometry = buffer;
        queryHospitals.outFields = ["*"];
        queryHospitals.returnGeometry = true;
        await healthCareFacilitiesLayerView.queryFeatures(queryHospitals).then((results)=>{
            let hospitalArray = [];
            if (results.features.length >= 1){
                const features = results.features;
                features.forEach(function(result,index){
                    const hospitalGeom = result.geometry;
                    const hospitalDist = geometryEngine.distance(geometry, hospitalGeom, "feet");
                    let hospitalScore;
                    if (hospitalDist < 100){
                        hospitalScore = 10;
                    } else if (hospitalDist >= 100 && hospitalDist < 150){
                        hospitalScore = 9;
                    } else if (hospitalDist >= 150 && hospitalDist < 200){
                        hospitalScore = 7;
                    } else if (hospitalDist >= 200 && hospitalDist < 300){
                        hospitalScore = 5;
                    } else if (hospitalDist >= 300 && hospitalDist < 500){
                        hospitalScore = 3;
                    } else if (hospitalDist >= 500 && hospitalDist < 1000){
                        hospitalScore = 1;
                    } else {
                        hospitalScore = 0;
                    }
                    hospitalArray.push(hospitalScore);
                })
            } else {
                hospitalArray.push(0);
            }
            hospitalScoreArray = [];
            let totalHospitalScore = Math.max(...hospitalArray);
            hospitalScoreArray.push(totalHospitalScore);
            console.log("Total Hospital Score: ",totalHospitalScore);
        });
    }

    async function accessScore(geometry,buffer){
        const queryAccess = roadsLayerView.createQuery();
        queryAccess.geometry = buffer;
        queryAccess.outFields = ["*"];
        queryAccess.returnGeometry = true;
        await roadsLayerView.queryFeatures(queryAccess).then((results) =>{
            let accessArray = [];
            if (results.features.length >= 1){
                const features = results.features;
                features.forEach(function(result,index){
                    const accessGeometry = result.geometry;
                    const accessDist = geometryEngine.distance(geometry,accessGeometry,"feet");
                    console.log("Access distance: ",accessDist)
                    let accessScore;
                    if(accessDist == 0){
                        accessScore = 1;
                    } else if(accessDist > 0 && accessDist <= 50){
                        accessScore = 3;
                    } else if(accessDist > 50 && accessDist <= 100){
                        accessScore = 5;
                    } else if(accessDist > 100 && accessDist <= 200){
                        accessScore = 7;
                    } else if(accessDist > 200 && accessDist <= 350){
                        accessScore = 9;
                    } /*else if(accessDist > 350 && accessDist <= 500){
                        accessScore = 10;
                    } */else if(accessDist > 350) {
                        accessScore = 10;
                    }

                    accessArray.push(accessScore);
                });
            } else {
                accessArray.push(10);
            }

            accessScoreArray = [];
            let totalAccessScore = Math.min(...accessArray);
            accessScoreArray.push(totalAccessScore);
            console.log("Total Access Score: ",totalAccessScore);
        });
    }

    async function seasonalStreamScore(geometry,buffer){
        
        const querySeasonalStreams = streamsLayerView.createQuery();
        querySeasonalStreams.geometry = buffer;
        querySeasonalStreams.outFields = ["*"];
        querySeasonalStreams.returnGeometry = true;
        querySeasonalStreams.where = "FCode_Text IN ('Canal/Ditch', 'Canal/Ditch - Aqueduct', 'Stream/River', 'Stream/River - Ephemeral',"
        + "'Stream/River - Intermittent')"
        await streamsLayerView.queryFeatures(querySeasonalStreams).then((results)=>{
            let seasonalStreamArray = [];
            if (results.features.length >= 1){

                const features = results.features;

                features.forEach(function(result,index){
                    const seasonalStreamGeom = result.geometry;
                    const seasonalStreamIntersect = geometryEngine.crosses(geometry,seasonalStreamGeom);
                    
                    let seasonalStreamScore;

                    if(seasonalStreamIntersect){
                        seasonalStreamScore = 7;
                    } else {
                        seasonalStreamScore = 0;
                    };

                    seasonalStreamArray.push(seasonalStreamScore);
                });
            } else {
                seasonalStreamArray.push(0);
            }
            seasonalStreamScoreArray = [];
            let totalSeasonalStreamScore = Math.max(...seasonalStreamArray);
            seasonalStreamScoreArray.push(totalSeasonalStreamScore);
            console.log("Total Seasonal Stream Score: ",totalSeasonalStreamScore);
            
        });
    }

    async function perennialStreamScore(geometry, buffer){
        const queryPerennialStreams = streamsLayerView.createQuery();
        queryPerennialStreams.geometry = buffer;
        queryPerennialStreams.outFields = ["*"];
        queryPerennialStreams.returnGeometry = true;
        queryPerennialStreams.where = "FCode_Text = 'Stream/River - Perennial'"
        await streamsLayerView.queryFeatures(queryPerennialStreams).then((results)=>{
            let perennialStreamArray = [];
            if (results.features.length >= 1){

                const features = results.features;

                features.forEach(function(result,index){
                    const perennialStreamGeom = result.geometry;
                    const perennialStreamIntersect = geometryEngine.crosses(geometry,perennialStreamGeom);
                    
                    let perennialStreamScore;

                    if(perennialStreamIntersect){
                        perennialStreamScore = 9;
                    } else {
                        perennialStreamScore = 0;
                    };

                    perennialStreamArray.push(perennialStreamScore);
                });
            } else {
                perennialStreamArray.push(0);
            }
            perennialStreamScoreArray = [];
            let totalPerennialStreamScore = Math.max(...perennialStreamArray);
            perennialStreamScoreArray.push(totalPerennialStreamScore);
            console.log("Total Perennial Stream Score: ",totalPerennialStreamScore);
            
        });
    }

    let totalCOFScore;
    function calculateScore(){
        document.getElementById("pipeScore").innerText = pipeScore;
        console.log("propertyScoreArray in CalculateScore",propertyScoreArray[0]);
        const finalPropertyScore = propertyScoreArray[0];
        document.getElementById("propertyScore").innerText = finalPropertyScore;
        console.log("StreetAScore in CalculateScore",streetAScoreArray[0]);
        console.log("StreetBScore in CalculateScore",streetBScoreArray[0]);
        const finalStreetScore = Math.max(streetAScoreArray[0],streetBScoreArray[0]);
        document.getElementById("streetScore").innerText = finalStreetScore;
        console.log("Final Street Score: ",finalStreetScore);
        const finalHighwayRailScore = Math.max(highwayScoreArray[0],railroadScoreArray[0])
        document.getElementById("highwayRailroadScore").innerText = finalHighwayRailScore;
        console.log("Final Highway Railroad Score: ",finalHighwayRailScore);
        const finalCriticalFacScore = Math.max(schoolScoreArray[0],hospitalScoreArray[0]);
        document.getElementById("criticalFacScore").innerText = finalCriticalFacScore;
        console.log("Final Critical Facility Score:",finalCriticalFacScore)
        const finalAccessScore = accessScoreArray[0];
        document.getElementById("accessScore").innerText = finalAccessScore;
        console.log("Final Access Score: ",finalAccessScore);
        const finalStreamScore = Math.max(seasonalStreamScoreArray[0],perennialStreamScoreArray[0]);
        document.getElementById("waterScore").innerText = finalStreamScore;
        console.log("Final Stream Score: ",finalStreamScore);
        totalCOFScore = ((pipeScore*0.2) + (finalStreetScore*0.2) + (finalCriticalFacScore*0.2) + 
        (finalPropertyScore*0.2) + (finalAccessScore*0.1) + (finalStreamScore*0.09) + (finalHighwayRailScore*0.01)).toFixed(2);
        document.getElementById("totalScore").innerText = totalCOFScore;
    }
});