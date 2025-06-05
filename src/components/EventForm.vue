<template>
  <div v-if="show" class="event-form">
    <h3>添加地理事件</h3>
    <div class="form-group">
      <label>年份:</label>
      <input type="number" v-model="newEvent.year" min="0" max="2023">
    </div>
    <div class="form-group">
      <label>经度:</label>
      <input type="number" v-model="newEvent.longitude" min="-180" max="180" step="0.0001">
    </div>
    <div class="form-group">
      <label>纬度:</label>
      <input type="number" v-model="newEvent.latitude" min="-90" max="90" step="0.0001">
    </div>
    <div class="form-group">
      <label>标题:</label>
      <input type="text" v-model="newEvent.title">
    </div>
    <div class="form-group">
      <label>类型:</label>
      <select v-model="newEvent.type">
        <option value="火山喷发">火山喷发</option>
        <option value="地震">地震</option>
        <option value="海啸">海啸</option>
        <option value="地质变迁">地质变迁</option>
        <option value="陨石撞击">陨石撞击</option>
      </select>
    </div>
    <div class="form-group">
      <label>描述:</label>
      <textarea v-model="newEvent.description"></textarea>
    </div>
    <button @click="addEvent">添加事件</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  show: {
    type: Boolean,
    required: true
  }
});

const emit = defineEmits(['update:show', 'addEvent']);

const newEvent = ref({
  year: 0,
  longitude: 0,
  latitude: 0,
  title: '',
  type: '火山喷发',
  description: ''
});

function addEvent() {
  if (!newEvent.value.title || !newEvent.value.description) {
    alert('请填写标题和描述');
    return;
  }
  
  emit('addEvent', { ...newEvent.value });
  
  // 重置表单
  newEvent.value = {
    year: 0,
    longitude: 0,
    latitude: 0,
    title: '',
    type: '火山喷发',
    description: ''
  };
}
</script>

<style scoped>
.event-form {
  position: fixed;
  top: 50px;
  right: 5px;
  width: 360px;
  background: rgba(0, 0, 0, 0.75);
  padding: 20px;
  border-radius: 12px;
  color: white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  animation: slideIn 0.3s ease;
  z-index: 1000;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.event-form:hover {
  background: rgba(0, 0, 0, 0.85);
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.4);
}

.event-form h3 {
  margin: 0 0 20px 0;
  padding-bottom: 10px;
  border-bottom: 2px solid rgba(255, 255, 255, 0.1);
  font-size: 18px;
  font-weight: 600;
  color: #4CAF50;
  letter-spacing: 1px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  color: white;
  font-size: 14px;
  transition: all 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  outline: none;
  border-color: #4CAF50;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
}

.form-group textarea {
  min-height: 100px;
  resize: vertical;
}

.form-group select {
  cursor: pointer;
}

.form-group select option {
  background: rgba(0, 0, 0, 0.9);
  color: white;
}

button {
  background: #4CAF50;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  margin-top: 20px;
  box-shadow: 0 2px 10px rgba(76, 175, 80, 0.2);
}

button:hover {
  background: #45a049;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
}

button:active {
  transform: translateY(0);
}

/* 添加输入验证样式 */
.form-group input:invalid,
.form-group textarea:invalid {
  border-color: #ff5252;
}

/* 添加响应式布局 */
@media (max-width: 768px) {
  .event-form {
    max-width: 320px;
    padding: 15px;
  }

  .form-group {
    margin-bottom: 12px;
  }

  button {
    padding: 10px 15px;
    font-size: 14px;
  }
}

/* 添加输入动画 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translate(-50%, -45%);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
}

.event-form {
  animation: fadeIn 0.3s ease;
}
</style> 