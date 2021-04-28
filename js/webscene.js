$(document).ready(function(){
    
    scene_display();
    
});

function scene_display() {
    require([
        "esri/WebScene",
        "esri/views/SceneView",
        "esri/layers/BuildingSceneLayer",
        "esri/widgets/Slice",
        "esri/widgets/Slice/SlicePlane",
        "esri/widgets/LayerList",
        "esri/core/Collection"
      ], (
        WebScene,
        SceneView,
        BuildingSceneLayer,
        Slice,
        SlicePlane,
        LayerList,
        Collection
      ) => {
        // Load webscene and display it in a SceneView
        const webscene = new WebScene({
          portalItem: {
            id: "6048eb1a3d2c4798ac36a831c2857664"
          }
        });
  
        const view = new SceneView({
          container: "viewDiv",
          map: webscene
        });
  
        // Create the BuildingSceneLayer and add it to the webscene
        const buildingLayer = new BuildingSceneLayer({
          portalItem: {
              id: "bb6a6b42b7334464abd11801bfccd871"
          }
        });
        webscene.layers.add(buildingLayer);
  
        sliceWidget = new Slice({
          view: view,
          container: document.createElement("div")
        });

        view.ui.add("menu", "top-right");

        const excludedLayers = [];

        sliceWidget.viewModel.excludedLayers.addMany(excludedLayers);
        const sliceButton = document.getElementById("slice");
        const resetPlaneBtn = document.getElementById("resetPlaneBtn");
        const clearPlaneBtn = document.getElementById("clearPlaneBtn");
        const sliceOptions = document.getElementById("sliceOptions");

        const plane = new SlicePlane({
          position: {
            latitude: 40.64681223094478,
            longitude: -74.21318257215083,
            z: 400
          },
          tilt: 32.62,
          width: 29,
          height: 29,
          heading: 0.46
        });

        let sliceTiltEnabled = true;

        buildingLayer.when(() => {
          // Iterate through the flat array of sublayers and extract the ones
          // that should be excluded from the slice widget
          buildingLayer.allSublayers.forEach((layer) => {
            // modelName is standard accross all BuildingSceneLayer,
            // use it to identify a certain layer
            switch (layer.modelName) {
              // Because of performance reasons, the Full Model view is
              // by default set to false. In this scene the Full Model should be visible.
              case "FullModel":
                layer.visible = true;
                break;
              case "Overview":
              default:
                layer.visible = true;
            }
          });
  
          setSliceWidget();
        });

        function setSliceWidget() {
          sliceWidget = new Slice({
            view: view,
            container: "sliceContainer"
          });
          sliceTiltEnabled = true;
          sliceWidget.viewModel.tiltEnabled = sliceTiltEnabled;
          sliceWidget.viewModel.shape = plane;
          sliceWidget.viewModel.watch("state", (value) => {
            if (value === "ready") {
              clearPlaneBtn.style.display = "none";
            } else {
              clearPlaneBtn.style.display = "inherit";
            }
          });
        }

        resetPlaneBtn.addEventListener("click", () => {
          document.getElementById("tiltEnabled").checked = true;
          sliceTiltEnabled = true;
          sliceWidget.viewModel.tiltEnabled = sliceTiltEnabled;
          sliceWidget.viewModel.shape = plane;
        });

        clearPlaneBtn.addEventListener("click", () => {
          sliceWidget.viewModel.clear();
        });
  
        document
          .getElementById("tiltEnabled")
          .addEventListener("change", (event) => {
            sliceTiltEnabled = event.target.checked;
            sliceWidget.viewModel.tiltEnabled = sliceTiltEnabled;
          });
    });
}