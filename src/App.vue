<template>
  <!-- 主容器 -->
  <div class="app-container">
    <!-- Cesium 容器 -->
    <div id="cesiumContainer" ref="cesiumContainer"></div>

    <!-- 加载遮罩 -->
    <div id="loadingOverlay">
      <h1>Loading...</h1>
    </div>

    <!-- 侧边栏 -->
    <aside class="sidebar">
      <!-- 标题区域 -->
      <div class="sidebar-header">
        <h1 class="title">数字地球展厅</h1>
      </div>

      <!-- 主导航按钮 -->
      <div class="sidebar-section">
        <h3>导航</h3>
        <div class="button-group">
          <button class="sidebar-button" @click="navigateTo('./展厅/时间轴/时间轴.html')">
            <i class="fas fa-clock"></i>
            地质年代介绍
          </button>
          <button class="sidebar-button" @click="navigateTo(' ./展厅/问答网站/index.html')">
            <i class="fas fa-question-circle"></i>
            地质知识大挑战
          </button>
          <button class="sidebar-button" @click="openMuseum">
            <i class="fas fa-university"></i>
            参观地质博物馆
          </button>
        </div>
      </div>

      <!-- 工具按钮组 -->
      <div class="sidebar-section">
        <h3>工具</h3>
        <div class="button-group">
          <button class="sidebar-button" @click="toggleToolbar">
            <i class="fas fa-mountain"></i>
            {{ showToolbar ? '隐藏地形控制' : '地形夸张' }}
          </button>
          <button class="sidebar-button" @click="showForm = !showForm">
            <i class="fas fa-plus-circle"></i>
            {{ showForm ? '隐藏事件表单' : '添加地质事件' }}
          </button>
          <button class="sidebar-button" @click="startDrawingLine">
            <i class="fas fa-draw-polygon"></i>
            {{ drawingLine ? '点击地图确定起止点' : '添加线要素' }}
          </button>
          <button class="sidebar-button" @click="startDrawingPolygon">
            <i class="fas fa-vector-square"></i>
            {{ drawingPolygon ? '点击地图确定面范围（双击结束）' : '添加面要素' }}
          </button>
          <button class="sidebar-button" @click="toggleEventsPanel">
            <i class="fas fa-list"></i>
            {{ showEventsPanel ? '隐藏事件列表' : '显示事件列表' }}
          </button>
        </div>
      </div>

      <!-- 地形控制面板 -->
      <div class="sidebar-section" v-show="showToolbar">
        <h3>地形控制</h3>
        <div class="terrain-controls">
          <div class="control-group">
            <label>夸张度</label>
            <div class="control-inputs">
              <input 
                type="range" 
                min="1" 
                max="5" 
                step="0.01" 
                v-model="exaggeration" 
                @input="updateExaggeration"
              >
              <input 
                type="number" 
                v-model="exaggeration" 
                @input="updateExaggeration"
                min="1" 
                max="5" 
                step="0.01"
              >
            </div>
          </div>
          <div class="control-group">
            <label>相对高度</label>
            <div class="control-inputs">
              <input 
                type="range" 
                min="-1000" 
                max="9000" 
                step="1" 
                v-model="relativeHeight" 
                @input="updateExaggeration"
              >
              <input 
                type="number" 
                v-model="relativeHeight" 
                @input="updateExaggeration"
                min="-1000" 
                max="9000" 
                step="1"
              >
            </div>
          </div>
        </div>
      </div>
    </aside>

    <!-- 右侧事件面板 -->
    <aside class="events-panel" :class="{ 'panel-hidden': !showEventsPanel, 'form-visible': showForm }">
      <div class="panel-content">
        <div class="panel-section">
        <h3>地质事件列表</h3>
        <div class="event-list">
          <div 
            v-for="event in filteredEvents" 
            :key="event.id"
            class="event-item"
            :class="{active: isEventActive(event)}"
            @click="flyToEvent(event)"
          >
            <div class="event-year">{{ event.year }}年</div>
            <div class="event-title">{{ event.title }}</div>
            <div class="event-type" :style="{backgroundColor: getEventColor(event.type)}">
              {{ event.type }}
            </div>
          </div>
        </div>
      </div>

        <div class="panel-section" v-if="lineFeatures.length > 0">
          <h3>线要素列表</h3>
          <div class="feature-list">
            <div 
              v-for="line in lineFeatures" 
              :key="line.id"
              class="feature-item"
              :class="{active: editingLine && editingLine.id === line.id}"
            >
              <div class="feature-info">
                <div class="feature-title">{{ line.name }}</div>
                <div class="feature-meta">
                  <span class="feature-type">{{ line.type }}</span>
                  <span class="feature-year">{{ line.year }}年</span>
                  <span class="feature-length">长度: {{ line.length ? line.length.toFixed(2) : '0.00' }} km</span>
                </div>
              </div>
              <div class="feature-actions">
                <button class="action-button edit" @click="editLine(line)">编辑</button>
                <button class="action-button delete" @click="deleteLine(line)">删除</button>
              </div>
            </div>
          </div>
        </div>

        <div class="panel-section" v-if="polygonFeatures.length > 0">
          <h3>面要素列表</h3>
          <div class="feature-list">
            <div 
              v-for="polygon in polygonFeatures" 
              :key="polygon.id"
              class="feature-item"
              :class="{active: editingPolygon && editingPolygon.id === polygon.id}"
            >
              <div class="feature-info">
                <div class="feature-title">{{ polygon.name }}</div>
                <div class="feature-meta">
                  <span class="feature-type">{{ polygon.type }}</span>
                  <span class="feature-year">{{ polygon.year }}年</span>
                  <span class="feature-area">面积: {{ polygon.area.toFixed(2) }} km²</span>
                </div>
              </div>
              <div class="feature-actions">
                <button class="action-button edit" @click="editPolygon(polygon)">编辑</button>
                <button class="action-button delete" @click="deletePolygon(polygon)">删除</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>

    <!-- 底部时间轴 -->
    <div class="timeline-container">
      <input 
        type="range" 
        v-model="currentYear" 
        :min="minYear" 
        :max="maxYear" 
        step="1" 
        class="timeline-slider"
        @input="updateEvents"
      >
      <div class="timeline-labels">
        <span>{{ minYear }}</span>
        <span>{{ currentYear }}</span>
        <span>{{ maxYear }}</span>
      </div>
    </div>

    <!-- 弹出表单 -->
    <EventForm v-model:show="showForm" @addEvent="addGeoEvent" />

    <!-- 线要素编辑表单 -->
    <div v-if="showLineForm" class="modal-overlay">
      <div class="modal-form">
        <h3>线要素属性</h3>
        <div class="form-content">
          <label>名称：<input v-model="editingLine.name" /></label>
          <label>类别：<input v-model="editingLine.type" /></label>
          <label>时间：<input v-model="editingLine.year" type="number" /></label>
          <label>长度：<input v-model="editingLine.length" type="number" readonly /> km</label>
          <label>描述：<textarea v-model="editingLine.description"></textarea></label>
        </div>
        <div class="form-actions">
          <button class="form-button save" @click="saveLineEdit">保存</button>
          <button class="form-button cancel" @click="cancelLineEdit">取消</button>
        </div>
      </div>
    </div>

    <!-- 面要素编辑表单 -->
    <div v-if="showPolygonForm" class="modal-overlay">
      <div class="modal-form">
        <h3>面要素属性</h3>
        <div class="form-content">
          <label>名称：<input v-model="editingPolygon.name" /></label>
          <label>类别：<input v-model="editingPolygon.type" /></label>
          <label>时间：<input v-model="editingPolygon.year" type="number" /></label>
          <label>面积：<input v-model="editingPolygon.area" type="number" readonly /> km²</label>
          <label>描述：<textarea v-model="editingPolygon.description"></textarea></label>
        </div>
        <div class="form-actions">
          <button class="form-button save" @click="savePolygonEdit">保存</button>
          <button class="form-button cancel" @click="cancelPolygonEdit">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import * as Cesium from "cesium";
import "./Widgets/widgets.css";
import { onMounted, ref, computed } from "vue";
import EventForm from "@/components/EventForm.vue";

// 禁用 Vue DevTools
if (window.__VUE_DEVTOOLS_GLOBAL_HOOK__) {
  window.__VUE_DEVTOOLS_GLOBAL_HOOK__.enabled = false;
}

const showToolbar = ref(false);
const currentYear = ref(0);
const minYear = ref(0);
const maxYear = ref(2023);
const showForm = ref(false);
const exaggeration = ref(1.0);
const relativeHeight = ref(0);
const lineFeatures = ref([]); // 存储所有线要素
let lineIdCounter = 0;
const drawingLine = ref(false); // 是否正在绘制线
const tempLinePoints = ref([]); // 临时存储线的起止点
const editingLine = ref(null); // 当前正在编辑的线
const showLineForm = ref(false); // 控制线属性表单显示
const lineEntities = []; // 存储Cesium实体
const showLineList = ref(true);
const polygonFeatures = ref([]); // 存储所有面要素
let polygonIdCounter = 0;
const drawingPolygon = ref(false); // 是否正在绘制面
const tempPolygonPoints = ref([]); // 临时存储面的点
const editingPolygon = ref(null); // 当前正在编辑的面
const showPolygonForm = ref(false); // 控制面属性表单显示
const polygonEntities = []; // 存储Cesium面实体
const tempPolygonPointEntities = []; // 临时点实体
const showPolygonList = ref(true); // 控制面要素列表显示
const showEventsPanel = ref(false); // 默认隐藏事件面板

const toggleToolbar = () => {
  showToolbar.value = !showToolbar.value;
};

const navigateTo = (path) => {
  window.open(path, '_blank');
};

Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2ZGU5Nzc0Ni04YmYwLTQ5NTktOTIyMC1jOTlhNjQzYTJlZDAiLCJpZCI6MzA3NzQ4LCJpYXQiOjE3NDg1ODc3ODZ9.B-KjrGfF-Gjf9BLXWsb8l2EZTzicHKKwCUgVySAn85Y";

window.CESIUM_BASE_URL = "/";

//设置默认视角
Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(89.5, 20.4, 110.4, 61.2);

let viewer;
let eventEntities = [];
let eventIdCounter = 0;

// 事件类型颜色映射
const eventTypeColors = {
  '火山喷发': '#FF5722',
  '地震': '#F44336',
  '海啸': '#2196F3',
  '地质变迁': '#4CAF50',
  '陨石撞击': '#9C27B0'
};

// 示例的地质事件
const geoEvents = [
  {
    id: eventIdCounter++,
    year: 79,
    longitude: 14.426,
    latitude: 40.817,
    title: "维苏威火山喷发",
    description: "公元79年，维苏威火山大规模喷发，摧毁了庞贝古城和赫库兰尼姆古城，造成数千人死亡。",
    type: "火山喷发",
    region: "意大利维苏威火山"
  },
  {
    id: eventIdCounter++,
    year: 1980,
    longitude: -122.18,
    latitude: 46.20,
    title: "圣海伦火山喷发",
    description: "1980年圣海伦火山喷发是美国历史上最致命的火山事件之一，造成57人死亡，火山灰影响全球气候。",
    type: "火山喷发",
    region: "美国华盛顿州"
  },
  {
   id: eventIdCounter++,
    year: 2004,
    longitude: 95.982,
    latitude: 3.316,
    title: "印度洋大地震",
    description: "2004年印度洋大地震震级达9.1-9.3级，引发的海啸导致14个国家受灾，约23万人死亡。",
    type: "地震",
    region: "印度尼西亚苏门答腊"

  }
];

const filteredEvents = computed(() => {
  return geoEvents.filter(event => event.year <= currentYear.value);
});

function getEventColor(type) {
  return eventTypeColors[type] || '#607D8B';
}

function isEventActive(event) {
  return event.year === currentYear.value;
}

function flyToEvent(event) {
  currentYear.value = event.year;
  updateEvents();
  
  const targetEntity = eventEntities.find(e => e.id === event.id);
  if (targetEntity) {
    viewer.selectedEntity = targetEntity; // 设置选中的实体以显示信息框
    viewer.flyTo(targetEntity, {
      offset: new Cesium.HeadingPitchRange(0, -0.5, 100000)
    });
  }
}

function updateExaggeration() {
  if (viewer) {
    const { scene } = viewer;
    scene.verticalExaggeration = Number(exaggeration.value);
    scene.verticalExaggerationRelativeHeight = Number(relativeHeight.value);
  }
}

onMounted(async () => {
  viewer = new Cesium.Viewer("cesiumContainer", {
    timeline: false,
    animation: false,
    sceneModePicker: false,
    baseLayerPicker: true,
    geocoder: Cesium.IonGeocodeProviderType.GOOGLE,
    navigationHelpButton: false,
    infoBox: true,
    selectionIndicator: false,
    terrain: Cesium.Terrain.fromWorldTerrain({
      requestVertexNormals: true,
      requestWaterMask: true,
    }),
  });

  // 设置信息框样式
  viewer.infoBox.frame.sandbox = "allow-same-origin allow-top-navigation allow-pointer-lock allow-popups allow-forms allow-scripts";
  
  // 设置点击事件处理
  viewer.screenSpaceEventHandler.setInputAction((movement) => {
    // 如果正在绘制线或面，使用相应的处理函数
    if (drawingLine.value) {
      handleMapClick(movement);
    } else if (drawingPolygon.value) {
      handlePolygonClick(movement);
    } else {
      // 否则处理普通点击，显示信息框
      const pickedObject = viewer.scene.pick(movement.position);
      if (Cesium.defined(pickedObject) && pickedObject.id) {
        viewer.selectedEntity = pickedObject.id;
      }
    }
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

  // 设置双击事件处理（用于结束面的绘制）
  viewer.screenSpaceEventHandler.setInputAction((movement) => {
    if (drawingPolygon.value) {
      handlePolygonDoubleClick(movement);
    }
  }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);

  const { scene } = viewer;
  
  // 设置初始地形夸张
  scene.verticalExaggeration = 3.0;
  exaggeration.value = scene.verticalExaggeration;
  relativeHeight.value = scene.verticalExaggerationRelativeHeight;

  // 关闭光照效果
  scene.globe.enableLighting = false;
  scene.skyAtmosphere.show = false;

  // 隐藏logo
  viewer.cesiumWidget.creditContainer.style.display = 'none';

  // 隐藏加载覆盖层
  document.getElementById("loadingOverlay").style.display = "none";
  
  // 初始加载事件
  updateEvents();
});

function updateEvents() {
  // 清除之前的事件实体
  eventEntities.forEach(entity => {
    viewer.entities.remove(entity);
  });
  eventEntities = [];
  
  // 添加当前年份的事件
  geoEvents.filter(event => event.year === currentYear.value).forEach(event => {
    const entity = viewer.entities.add({
      id: event.id,
      name: event.title,
      position: Cesium.Cartesian3.fromDegrees(event.longitude, event.latitude),
      point: {
        pixelSize: 15,
        color: Cesium.Color.fromCssColorString(getEventColor(event.type)),
        outlineColor: Cesium.Color.WHITE,
        outlineWidth: 2,
        heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
        disableDepthTestDistance: Number.POSITIVE_INFINITY
      },
      label: {
        text: event.title,
        font: '14pt sans-serif',
        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
        outlineWidth: 2,
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        pixelOffset: new Cesium.Cartesian2(0, -15),
        showBackground: true,
        backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.7),
        backgroundPadding: new Cesium.Cartesian2(7, 5),
        distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 10000000),
        heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
        disableDepthTestDistance: Number.POSITIVE_INFINITY
      },
      description: generateEventDescription(event)
    });
    
    eventEntities.push(entity);
  });
  
  // 如果有当前年份的事件，飞向它们
  if (eventEntities.length > 0) {
    viewer.flyTo(eventEntities);
  }
}

function generateEventDescription(event) {
  return `
    <div style="padding: 15px; color: white; font-family: Arial, sans-serif;">
      <h2 style="color: #4CAF50; margin: 0 0 15px 0; font-size: 18px; border-bottom: 2px solid rgba(76, 175, 80, 0.3); padding-bottom: 8px;">
        ${event.title}
      </h2>
      <div style="margin-bottom: 10px;">
        <strong style="color: #4CAF50;">类型：</strong>
        <span style="display: inline-block; padding: 2px 8px; background: ${getEventColor(event.type)}; border-radius: 4px; color: white;">${event.type}</span>
      </div>
      <div style="margin-bottom: 10px;">
        <strong style="color: #4CAF50;">年份：</strong> <span style="color: white;">${event.year}年</span>
      </div>
      <div style="margin-bottom: 10px;">
        <strong style="color: #4CAF50;">位置：</strong> <span style="color: white;">${event.region || '未知'}</span>
      </div>
      <div style="margin-top: 15px;">
        <strong style="color: #4CAF50;">描述：</strong>
        <p style="margin: 8px 0 0 0; line-height: 1.5; color: white;">${event.description}</p>
      </div>
    </div>
  `;
}

function addGeoEvent(event) {
  const newEvent = {
    id: eventIdCounter++,
    ...event,
    type: event.type || '地质事件'
  };
  geoEvents.push(newEvent);
  geoEvents.sort((a, b) => a.year - b.year);
  
  // 更新年份范围
  minYear.value = Math.min(minYear.value, newEvent.year);
  maxYear.value = Math.max(maxYear.value, newEvent.year);
  
  updateEvents();
}

defineExpose({ addGeoEvent });
/************************************************
 * 
 * 线要素相关逻辑
 */
function startDrawingLine() {
  // 确保其他绘制状态被关闭
  drawingPolygon.value = false;
  // 清空所有临时点
  tempLinePoints.value = [];
  tempPolygonPoints.value = [];
  // 移除所有临时实体
  tempPointEntities.forEach(p => viewer.entities.remove(p.entity));
  tempPointEntities.length = 0;
  tempPolygonPointEntities.forEach(e => viewer.entities.remove(e));
  tempPolygonPointEntities.length = 0;
  // 开始绘制线
  drawingLine.value = true;
}

const tempPointEntities = []; // 临时存储起止点实体
function handleMapClick(movement) {
  if (!drawingLine.value) return;
  const cartesian = viewer.scene.pickPosition(movement.position);
  if (!cartesian) return;
  const cartographic = Cesium.Cartographic.fromCartesian(cartesian);
  const lon = Cesium.Math.toDegrees(cartographic.longitude);
  const lat = Cesium.Math.toDegrees(cartographic.latitude);
  tempLinePoints.value.push([lon, lat]);

  // 添加临时点实体作为反馈
  const pointEntity = viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(lon, lat, 30),
    point: {
      pixelSize: 14,
      color: Cesium.Color.YELLOW,
      outlineColor: Cesium.Color.ORANGE,
      outlineWidth: 3,
      heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND
    }
  });
  tempPointEntities.push({
    entity: pointEntity,
    lineId: lineIdCounter,
    index: tempLinePoints.value.length
  });

  if (tempLinePoints.value.length === 2) {
    const thisLineId = lineIdCounter++;
    const length = calculateLineLength(tempLinePoints.value);
    const newLine = {
      id: thisLineId,
      name: '新线要素',
      type: '未分类',
      year: currentYear.value,
      description: '',
      positions: [...tempLinePoints.value],
      length
    };
    lineFeatures.value.push(newLine);
    addLineEntity(newLine);
    drawingLine.value = false;
    tempLinePoints.value = [];
    editLine(newLine);
  }
}

function addLineEntity(line) {
  // 先移除旧实体
  const old = lineEntities.find(e => e.id === line.id);
  if (old) viewer.entities.remove(old.entity);

  // 只用经纬度，不加高度
  const positions = line.positions.flat();

  // 添加贴地线
  const entity = viewer.entities.add({
    id: line.id,
    polyline: {
      positions: Cesium.Cartesian3.fromDegreesArray(positions),
      width: 4,
      material: Cesium.Color.ORANGE.withAlpha(0.8),
      clampToGround: true // 贴地
      // arcType 不设置，默认即可
    },
    description: `
      <div>
        <h2>${line.name}</h2>
        <p><strong>类别:</strong> ${line.type}</p>
        <p><strong>年份:</strong> ${line.year}</p>
        <p><strong>长度:</strong> ${line.length ? line.length.toFixed(2) : '0.00'} km</p>
        <p><strong>描述:</strong> ${line.description}</p>
      </div>
    `
  });
  // 记录实体
  const idx = lineEntities.findIndex(e => e.id === line.id);
  if (idx >= 0) lineEntities[idx] = { id: line.id, entity };
  else lineEntities.push({ id: line.id, entity });
}
function refreshAllLines() {
  // 清除所有线实体
  lineEntities.forEach(e => viewer.entities.remove(e.entity));
  lineEntities.length = 0;
  // 重新添加
  lineFeatures.value.forEach(addLineEntity);
}
function editLine(line) {
  editingLine.value = { ...line }; // 拷贝，防止直接修改
  showLineForm.value = true;
}

function saveLineEdit() {
  // 找到原始线并更新
  const idx = lineFeatures.value.findIndex(l => l.id === editingLine.value.id);
  if (idx >= 0) {
    // 重新计算长度
    const positions = lineFeatures.value[idx].positions;
    const length = calculateLineLength(positions);
    lineFeatures.value[idx] = { ...editingLine.value, positions: [...positions], length };
    addLineEntity(lineFeatures.value[idx]);
  }
  showLineForm.value = false;
  editingLine.value = null;
}
function calculateLineLength(points) {
  if (!points || points.length < 2) return 0;
  let total = 0;
  for (let i = 1; i < points.length; i++) {
    const [lon1, lat1] = points[i - 1];
    const [lon2, lat2] = points[i];
    const p1 = Cesium.Cartesian3.fromDegrees(lon1, lat1);
    const p2 = Cesium.Cartesian3.fromDegrees(lon2, lat2);
    total += Cesium.Cartesian3.distance(p1, p2);
  }
  return total / 1000; // 米转公里
}

function cancelLineEdit() {
  showLineForm.value = false;
  editingLine.value = null;
}

function deleteLine(line) {
  // 删除线实体
  const idx = lineEntities.findIndex(e => e.id === line.id);
  if (idx >= 0) {
    viewer.entities.remove(lineEntities[idx].entity);
    lineEntities.splice(idx, 1);
  }
  // 删除数据
  const i = lineFeatures.value.findIndex(l => l.id === line.id);
  if (i >= 0) lineFeatures.value.splice(i, 1);

  // 删除对应的临时点
  for (let j = tempPointEntities.length - 1; j >= 0; j--) {
    if (tempPointEntities[j].lineId === line.id) {
      viewer.entities.remove(tempPointEntities[j].entity);
      tempPointEntities.splice(j, 1);
    }
  }
}

/**********************************************************
 * 
 * 面要素相关逻辑
 */
function startDrawingPolygon() {
  // 确保其他绘制状态被关闭
  drawingLine.value = false;
  // 清空所有临时点
  tempLinePoints.value = [];
  tempPolygonPoints.value = [];
  // 移除所有临时实体
  tempPointEntities.forEach(p => viewer.entities.remove(p.entity));
  tempPointEntities.length = 0;
  tempPolygonPointEntities.forEach(e => viewer.entities.remove(e));
  tempPolygonPointEntities.length = 0;
  // 开始绘制面
  drawingPolygon.value = true;
}
function handlePolygonClick(movement) {
  if (!drawingPolygon.value) return;
  const cartesian = viewer.scene.pickPosition(movement.position);
  if (!cartesian) return;
  const cartographic = Cesium.Cartographic.fromCartesian(cartesian);
  const lon = Cesium.Math.toDegrees(cartographic.longitude);
  const lat = Cesium.Math.toDegrees(cartographic.latitude);
  tempPolygonPoints.value.push([lon, lat]);

  // 添加临时点实体
  const pointEntity = viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(lon, lat, 30),
    point: {
      pixelSize: 12,
      color: Cesium.Color.CYAN,
      outlineColor: Cesium.Color.BLUE,
      outlineWidth: 2,
      heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND
    }
  });
  tempPolygonPointEntities.push(pointEntity);
}
function handlePolygonDoubleClick(movement) {
  if (!drawingPolygon.value || tempPolygonPoints.value.length < 3) return;

  // 立即关闭绘制状态，防止多次触发
  drawingPolygon.value = false;

  // 复制点数据，防止后续清空影响
  const polygonPointsCopy = [...tempPolygonPoints.value];

  // 计算面积
  const area = calculatePolygonArea(polygonPointsCopy);
  const thisPolygonId = polygonIdCounter++;
  const newPolygon = {
    id: thisPolygonId,
    name: '新面要素',
    type: '未分类',
    year: currentYear.value,
    area,
    description: '',
    positions: polygonPointsCopy
  };
  polygonFeatures.value.push(newPolygon);
  addPolygonEntity(newPolygon);

  // 清空临时点和实体
  tempPolygonPoints.value = [];
  tempPolygonPointEntities.forEach(e => viewer.entities.remove(e));
  tempPolygonPointEntities.length = 0;

  // 移除所有临时点实体
  tempPointEntities.forEach(p => viewer.entities.remove(p.entity));
  tempPointEntities.length = 0;

  editPolygon(newPolygon);
}

function addPolygonEntity(polygon) {
  // 先移除旧实体
  const old = polygonEntities.find(e => e.id === polygon.id);
  if (old) viewer.entities.remove(old.entity);

  // 经纬度数组
  const positions = polygon.positions.flat();

  const entity = viewer.entities.add({
    id: polygon.id,
    polygon: {
      hierarchy: Cesium.Cartesian3.fromDegreesArray(positions),
      material: Cesium.Color.CYAN.withAlpha(0.4),
      outline: true,
      outlineColor: Cesium.Color.BLUE,
      heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
    },
    description: `
      <div>
        <h2>${polygon.name}</h2>
        <p><strong>类别:</strong> ${polygon.type}</p>
        <p><strong>年份:</strong> ${polygon.year}</p>
        <p><strong>面积:</strong> ${polygon.area.toFixed(2)} km²</p>
        <p><strong>描述:</strong> ${polygon.description}</p>
      </div>
    `
  });
  // 记录实体
  const idx = polygonEntities.findIndex(e => e.id === polygon.id);
  if (idx >= 0) polygonEntities[idx] = { id: polygon.id, entity };
  else polygonEntities.push({ id: polygon.id, entity });
}
function editPolygon(polygon) {
  editingPolygon.value = { ...polygon };
  showPolygonForm.value = true;
}

function savePolygonEdit() {
  const idx = polygonFeatures.value.findIndex(p => p.id === editingPolygon.value.id);
  if (idx >= 0) {
    polygonFeatures.value[idx] = { ...editingPolygon.value, positions: [...polygonFeatures.value[idx].positions] };
    addPolygonEntity(polygonFeatures.value[idx]);
  }
  showPolygonForm.value = false;
  editingPolygon.value = null;
}

function cancelPolygonEdit() {
  showPolygonForm.value = false;
  editingPolygon.value = null;
}

function deletePolygon(polygon) {
  // 删除面实体
  const idx = polygonEntities.findIndex(e => e.id === polygon.id);
  if (idx >= 0) {
    viewer.entities.remove(polygonEntities[idx].entity);
    polygonEntities.splice(idx, 1);
  }
  // 删除数据
  const i = polygonFeatures.value.findIndex(p => p.id === polygon.id);
  if (i >= 0) polygonFeatures.value.splice(i, 1);

  // 删除对应的临时点
  for (let j = tempPolygonPointEntities.length - 1; j >= 0; j--) {
    viewer.entities.remove(tempPolygonPointEntities[j]);
    tempPolygonPointEntities.splice(j, 1);
  }
}
function calculatePolygonArea(points) {
  // 使用Shoelace公式，单位为km²
  if (points.length < 3) return 0;
  let area = 0;
  for (let i = 0; i < points.length; i++) {
    const [x1, y1] = points[i];
    const [x2, y2] = points[(i + 1) % points.length];
    area += Cesium.Math.toRadians(x1) * Math.sin(Cesium.Math.toRadians(y2));
    area -= Cesium.Math.toRadians(x2) * Math.sin(Cesium.Math.toRadians(y1));
  }
  area = Math.abs(area * 6378137 * 6378137 / 2); // 地球半径
  return area / 1e6; // m²转km²
}

function toggleEventsPanel() {
  showEventsPanel.value = !showEventsPanel.value;
}

function openMuseum() {
  window.open('http://www.3dxinyuan.top/hfut/spg.html?m=KJ-niSbNLhAyvr', '_blank');
}
</script>

<style>
/* 基础样式重置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Microsoft YaHei", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}

/* 隐藏主窗口的滚动条 */
html, body {
  overflow: hidden;
  width: 100%;
  height: 100%;
}

/* 主容器 */
.app-container {
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
}

/* Cesium 容器 */
#cesiumContainer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
}

/* 加载遮罩 */
#loadingOverlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  color: white;
}

/* 侧边栏 */
.sidebar {
  position: fixed;
  top: 20px;
  left: 20px;
  width: 320px;
  max-height: calc(100vh - 100px);
  background: rgba(42, 42, 42, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px;
  color: white;
  z-index: 100;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  overflow-y: auto;
}

.sidebar-header {
  padding: 10px 0;
  margin-bottom: 10px;
  border-bottom: 2px solid rgba(76, 175, 80, 0.3);
}

.sidebar-header .title {
  color: #4CAF50;
  font-size: 24px;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  margin: 0;
}

.sidebar-section {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 15px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.sidebar-section h3 {
  color: #4CAF50;
  font-size: 16px;
  margin-bottom: 15px;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(76, 175, 80, 0.3);
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.sidebar-button {
  width: 100%;
  background: rgba(76, 175, 80, 0.1);
  color: white;
  border: 1px solid rgba(76, 175, 80, 0.2);
  padding: 10px 15px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
  text-align: left;
  display: flex;
  align-items: center;
  gap: 10px;
}

.sidebar-button:hover {
  background: rgba(76, 175, 80, 0.2);
  transform: translateX(5px);
}

.sidebar-button i {
  font-size: 16px;
  width: 20px;
  text-align: center;
}

/* 地形控制面板 */
.terrain-controls {
  margin-top: 10px;
}

.control-group {
  margin-bottom: 15px;
}

.control-group label {
  display: block;
  margin-bottom: 8px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 14px;
}

.control-inputs {
  display: flex;
  gap: 10px;
  align-items: center;
}

.control-inputs input[type="range"] {
  flex: 1;
  height: 6px;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.1);
  outline: none;
  appearance: none;
}

.control-inputs input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #4CAF50;
  cursor: pointer;
  border: 2px solid white;
  box-shadow: 0 0 10px rgba(76, 175, 80, 0.5);
}

.control-inputs input[type="number"] {
  width: 70px;
  padding: 4px 8px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  color: white;
  font-size: 14px;
}

/* 右侧事件面板 */
.events-panel {
  position: fixed;
  top: 50px;
  right: 5px;
  width: 360px;
  max-height: calc(100vh - 100px);
  background: rgba(42, 42, 42, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 20px;
  color: white;
  z-index: 100;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  overflow-y: auto;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.panel-hidden {
  transform: translateX(calc(100% + 5px));
  opacity: 0;
  pointer-events: none;
}

/* 当表单显示时，调整事件面板的位置 */
.events-panel.form-visible {
  transform: translateY(calc(100% + 10px));
  top: -50%;
}

.panel-hidden.form-visible {
  transform: translate(calc(100% + 5px), calc(100% + 10px));
}

.panel-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.panel-section {
  margin-bottom: 30px;
}

.panel-section:last-child {
  margin-bottom: 0;
}

.panel-section h3 {
  color: #4CAF50;
  font-size: 18px;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 2px solid rgba(76, 175, 80, 0.3);
}

.event-list,
.feature-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.event-item,
.feature-item {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 15px;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.event-item:hover,
.feature-item:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateX(5px);
}

.event-item.active,
.feature-item.active {
  background: rgba(76, 175, 80, 0.15);
  border-left: 3px solid #4CAF50;
}

.event-year {
  font-size: 16px;
  font-weight: bold;
  color: #4CAF50;
  margin-bottom: 5px;
}

.event-title {
  font-size: 14px;
  color: white;
  margin-bottom: 8px;
  line-height: 1.4;
}

.event-type {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  color: white;
}

.feature-info {
  margin-bottom: 12px;
}

.feature-title {
  font-size: 16px;
  font-weight: bold;
  color: #4CAF50;
  margin-bottom: 8px;
}

.feature-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
}

.feature-meta span {
  background: rgba(255, 255, 255, 0.1);
  padding: 2px 8px;
  border-radius: 4px;
}

.feature-actions {
  display: flex;
  gap: 8px;
}

.action-button {
  flex: 1;
  padding: 8px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
}

.action-button.edit {
  background: rgba(76, 175, 80, 0.2);
  color: white;
  border: 1px solid rgba(76, 175, 80, 0.3);
}

.action-button.edit:hover {
  background: rgba(76, 175, 80, 0.3);
}

.action-button.delete {
  background: rgba(244, 67, 54, 0.2);
  color: white;
  border: 1px solid rgba(244, 67, 54, 0.3);
}

.action-button.delete:hover {
  background: rgba(244, 67, 54, 0.3);
}

/* 时间轴容器 */
.timeline-container {
  position: fixed;
  bottom: 20px;
  left: 360px;
  right: 360px;
  background: rgba(42, 42, 42, 0.95);
  padding: 20px;
  border-radius: 12px;
  z-index: 100;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.timeline-slider {
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.1);
  outline: none;
  appearance: none;
  margin-bottom: 10px;
}

.timeline-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #4CAF50;
  cursor: pointer;
  border: 2px solid white;
  box-shadow: 0 0 10px rgba(76, 175, 80, 0.5);
}

.timeline-labels {
  display: flex;
  justify-content: space-between;
  color: white;
  font-size: 14px;
}

.timeline-labels span {
  background: rgba(255, 255, 255, 0.1);
  padding: 4px 8px;
  border-radius: 4px;
}

/* 模态框样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
}

.modal-form {
  background: rgba(42, 42, 42, 0.95);
  padding: 30px;
  border-radius: 12px;
  width: 400px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
}

.modal-form h3 {
  color: #4CAF50;
  font-size: 20px;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid rgba(76, 175, 80, 0.3);
}

.form-content {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-content label {
  display: flex;
  flex-direction: column;
  gap: 5px;
  color: white;
}

.form-content input,
.form-content textarea {
  padding: 8px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 14px;
}

.form-content textarea {
  height: 100px;
  resize: vertical;
}

.form-actions {
  display: flex;
  gap: 10px;
  margin-top: 20px;
  justify-content: flex-end;
}

.form-button {
  padding: 10px 20px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
}

.form-button.save {
  background: #4CAF50;
  color: white;
}

.form-button.save:hover {
  background: #45a049;
}

.form-button.cancel {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.form-button.cancel:hover {
  background: rgba(255, 255, 255, 0.15);
}

/* 滚动条样式 - 仅应用于面板内部 */
.sidebar::-webkit-scrollbar,
.events-panel::-webkit-scrollbar,
.features-panel::-webkit-scrollbar {
  width: 8px;
}

.sidebar::-webkit-scrollbar-track,
.events-panel::-webkit-scrollbar-track,
.features-panel::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

.sidebar::-webkit-scrollbar-thumb,
.events-panel::-webkit-scrollbar-thumb,
.features-panel::-webkit-scrollbar-thumb {
  background: rgba(76, 175, 80, 0.5);
  border-radius: 4px;
}

.sidebar::-webkit-scrollbar-thumb:hover,
.events-panel::-webkit-scrollbar-thumb:hover,
.features-panel::-webkit-scrollbar-thumb:hover {
  background: rgba(76, 175, 80, 0.7);
}

/* 响应式布局 */
@media (max-width: 1400px) {
  .events-panel {
    width: 320px;
  }
}

@media (max-width: 992px) {
  .events-panel {
    position: fixed;
    width: calc(100vw - 20px);
    max-height: 50vh;
    margin: 10px;
    top: auto;
    bottom: 100px;
    right: 0;
    left: 0;
  }
}

/* Cesium InfoBox 样式 */
:deep(.cesium-infoBox) {
  background: rgba(42, 42, 42, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  max-width: 360px;
  transform: none !important;
}

:deep(.cesium-infoBox-title) {
  background: rgba(76, 175, 80, 0.2);
  color: #4CAF50;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  padding: 12px;
  font-size: 16px;
}

:deep(.cesium-infoBox-description) {
  padding: 15px;
  color: white;
  font-size: 14px;
  line-height: 1.5;
}

:deep(.cesium-infoBox-defaultTable) {
  color: white;
}

:deep(.cesium-infoBox-defaultTable tr:nth-child(odd)) {
  background: rgba(255, 255, 255, 0.05);
}

:deep(.cesium-infoBox-defaultTable td) {
  padding: 8px;
}

/* 隐藏 infoBox 的关闭按钮 */
:deep(.cesium-infoBox-close) {
  display: none;
}

/* 自定义滚动条样式 */
:deep(.cesium-infoBox)::-webkit-scrollbar {
  width: 6px;
}

:deep(.cesium-infoBox)::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

:deep(.cesium-infoBox)::-webkit-scrollbar-thumb {
  background: rgba(76, 175, 80, 0.5);
  border-radius: 3px;
}

:deep(.cesium-infoBox)::-webkit-scrollbar-thumb:hover {
  background: rgba(76, 175, 80, 0.7);
}
</style>