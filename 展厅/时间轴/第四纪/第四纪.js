// 场景初始化
let scene, camera, renderer, controls;
let earth, atmosphere;
let currentPeriod = 'holocene';

// 初始化函数
function init() {
    // 创建场景
    scene = new THREE.Scene();
    
    // 创建相机
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    
    // 创建渲染器
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000);
    document.body.appendChild(renderer.domElement);
    
    // 添加轨道控制器
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    
    // 创建地球
    createEarth();
    
    // 添加环境光
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    // 添加平行光（模拟太阳光）
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);
    
    // 添加事件监听
    window.addEventListener('resize', onWindowResize);
    document.querySelectorAll('.timeline-item').forEach(item => {
        item.addEventListener('click', () => {
            // 移除所有active类
            document.querySelectorAll('.timeline-item').forEach(i => i.classList.remove('active'));
            // 添加active类到当前点击项
            item.classList.add('active');
            currentPeriod = item.dataset.period;
            updateEarthAppearance();
            updateInfoPanel();
        });
    });
    
    // 初始化时设置默认选中项
    document.querySelector('[data-period="holocene"]').classList.add('active');
    
    // 隐藏加载界面
    document.getElementById('loading').style.display = 'none';
    
    // 开始动画循环
    animate();
}

// 创建地球
function createEarth() {
    // 地球几何体
    const geometry = new THREE.SphereGeometry(2, 64, 64);
    
    // 地球材质
    const material = new THREE.MeshPhongMaterial({
        map: new THREE.TextureLoader().load('https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg'),
        bumpMap: new THREE.TextureLoader().load('https://threejs.org/examples/textures/planets/earth_normal_2048.jpg'),
        bumpScale: 0.05,
        specularMap: new THREE.TextureLoader().load('https://threejs.org/examples/textures/planets/earth_specular_2048.jpg'),
        specular: new THREE.Color('grey'),
        shininess: 5
    });
    
    earth = new THREE.Mesh(geometry, material);
    scene.add(earth);
    
    // 添加大气层
    const atmosphereGeometry = new THREE.SphereGeometry(2.1, 64, 64);
    const atmosphereMaterial = new THREE.MeshPhongMaterial({
        color: 0x0077ff,
        transparent: true,
        opacity: 0.1
    });
    
    atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphere);
}

// 更新地球外观
function updateEarthAppearance() {
    if (currentPeriod === 'pleistocene') {
        // 更新世时期 - 增加冰盖覆盖
        earth.material.map = new THREE.TextureLoader().load('https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg');
        atmosphere.material.opacity = 0.15;
        // 添加冰盖效果
        earth.material.bumpScale = 0.1;
    } else {
        // 全新世时期 - 现代地球外观
        earth.material.map = new THREE.TextureLoader().load('https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg');
        atmosphere.material.opacity = 0.1;
        earth.material.bumpScale = 0.05;
    }
}

// 更新信息面板
function updateInfoPanel() {
    const infoPanel = document.getElementById('info');
    if (currentPeriod === 'pleistocene') {
        infoPanel.innerHTML = `
            <h2>更新世（洪积世）</h2>
            <p>距今约180万年至1万年，是第四纪的早期。这一时期绝大多数动、植物属种与现代相似，显著特征为气候变冷，有冰期与间冰期的明显交替。</p>
            
            <div class="period-info">
                <h3>气候与环境</h3>
                <p><strong>冰川活动：</strong></p>
                <p>• 北半球高、中纬度地区出现大规模冰川活动</p>
                <p>• 欧洲：多瑙、贡兹、民德、里斯、武木等五大冰期</p>
                <p>• 北美：内布拉斯加、堪萨斯、伊利诺和威斯康辛等四个冰期</p>
                <p>• 中国：鄱阳、大姑、庐山、大理等四个冰期</p>
                <p>• 冰期高峰时，全球30%以上陆地被冰川覆盖</p>
                
                <p><strong>海平面变化：</strong></p>
                <p>• 冰期时海平面下降，间冰期时上升</p>
                <p>• 距今15000年前，中国黄海、东海大陆架最低海面为-150米至-160米</p>
                
                <p><strong>气候带转移：</strong></p>
                <p>• 末次冰期最盛时期，欧洲大陆冰流由北纬77°南移到北纬55°</p>
                <p>• 苔原由北纬69°移到北纬45°</p>
            </div>

            <div class="period-info">
                <h3>生物发展</h3>
                <p><strong>动物：</strong></p>
                <p>• 寒冷气候促使大型哺乳动物进化（猛犸象、巨型犀等）</p>
                <p>• 人类出现并进化（早期猿人、晚期猿人、早期智人）</p>
                <p>• 更新世晚期（约2万年前），现代人类经白令海峡进入美洲</p>
                
                <p><strong>植物：</strong></p>
                <p>• 被子植物在温和和较冷区域迅速繁殖</p>
                <p>• 热带森林缩小，北方高纬度地区发展草原</p>
                <p>• 出现适应酷寒的植物群落（地衣、苔藓、侏儒菅茅等）</p>
            </div>
        `;
    } else {
        infoPanel.innerHTML = `
            <h2>全新世（冲积世）</h2>
            <p>从1万年前至现代，是地球历史上最新的地质时期。这一时期气候相对温暖稳定，人类文明得到了快速发展。</p>
            
            <div class="period-info">
                <h3>气候与环境</h3>
                <p><strong>气候变暖：</strong></p>
                <p>• 全球气候逐渐变暖</p>
                <p>• 冰川大规模退缩</p>
                <p>• 海平面上升并稳定在现代水平</p>
                
                <p><strong>环境稳定：</strong></p>
                <p>• 生物群落逐渐稳定</p>
                <p>• 形成与现代相似的生态环境</p>
                <p>• 存在短暂气候波动（中世纪暖期、小冰期等）</p>
            </div>

            <div class="period-info">
                <h3>生物与人类发展</h3>
                <p><strong>生物：</strong></p>
                <p>• 哺乳动物面貌与现代基本一致</p>
                <p>• 形成寒带、温带、亚热带和热带等不同植物群</p>
                
                <p><strong>人类发展：</strong></p>
                <p>• 从狩猎采集社会过渡到农业社会</p>
                <p>• 发展出城市和复杂文明</p>
                <p>• 科技、文化、艺术等方面取得巨大进步</p>
            </div>
        `;
    }
}

// 窗口大小调整
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// 动画循环
function animate() {
    requestAnimationFrame(animate);
    
    // 地球自转
    earth.rotation.y += 0.001;
    atmosphere.rotation.y += 0.001;
    
    controls.update();
    renderer.render(scene, camera);
}

// 页面加载完成后初始化
window.addEventListener('load', init); 