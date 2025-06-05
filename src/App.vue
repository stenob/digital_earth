<template>
  <div id="cesiumContainer" ref ="cesiumContainer"> </div >
</template>
<script setup>
  import * as Cesium from "cesium";
  import "./Widgets/widgets.css";
  import {onMounted} from "vue";

  Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2ZGU5Nzc0Ni04YmYwLTQ5NTktOTIyMC1jOTlhNjQzYTJlZDAiLCJpZCI6MzA3NzQ4LCJpYXQiOjE3NDg1ODc3ODZ9.B-KjrGfF-Gjf9BLXWsb8l2EZTzicHKKwCUgVySAn85Y";

  window.CESIUM_BASE_URL = "/";


  //设置默认视角
  Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(89.5, 20.4, 110.4, 61.2);

  onMounted(() => {
    var viewer = new Cesium.Viewer("cesiumContainer", {
      terrain: Cesium.Terrain.fromWorldTerrain({
      requestVertexNormals: true,
      requestWaterMask: true,
     }),
    })
    
    viewer.scene.globe.enableLighting = true;
    //隐藏logo
    viewer.cesiumWidget.creditContainer.style.display = 'none';
    //隐藏时间轴
    //viewer.timeline.container.style.display = 'none';
  });


</script>
<style>
*{
  margin: 0;
  padding: 0;
}
#cesiumContainer {
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
} 
</style>

