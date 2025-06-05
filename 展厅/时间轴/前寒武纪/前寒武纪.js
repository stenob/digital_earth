// Global variables
let currentEra = 'hadean';
let animationFrameId;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeParticles();
    initializeCounters();
    initializeTimeline();
    initializeEvolutionTree();
    initializeAtmosphereSimulator();
    initializeFossilGallery();
    initializeClimateChart();
    initializeScrollAnimations();
});

// Particle system
function initializeParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = window.innerWidth < 768 ? 30 : 60;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 8 + 3;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = (Math.random() * 6 + 6) + 's';
        
        particlesContainer.appendChild(particle);
    }
}

// Animated counters
function initializeCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateCounter = (element) => {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000;
        const startTime = performance.now();
        
        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const current = Math.floor(progress * target);
            
            element.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        };
        
        requestAnimationFrame(updateCounter);
    };
    
    // Start counters when they come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    });
    
    statNumbers.forEach(stat => observer.observe(stat));
}

// Timeline functionality
function initializeTimeline() {
    const timelineButtons = document.querySelectorAll('.timeline-btn');
    const eraDisplays = document.querySelectorAll('.era-display');
    
    timelineButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const era = btn.getAttribute('data-era');
            switchEra(era);
        });
    });
    
    function switchEra(era) {
        // Update buttons
        timelineButtons.forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-era="${era}"]`).classList.add('active');
        
        // Update displays
        eraDisplays.forEach(display => display.classList.remove('active'));
        document.getElementById(era).classList.add('active');
        
        currentEra = era;
    }
}

// Evolution tree interactions
function initializeEvolutionTree() {
    const treeNodes = document.querySelectorAll('.tree-node');
    const evolutionInfo = document.getElementById('evolution-info');
    
    const nodeDetails = {
        root: {
            title: "最后共同祖先 (LUCA)",
            description: "约38亿年前存在的所有现存生物的共同祖先。LUCA可能是一个简单的单细胞生物，具有基本的遗传机制和新陈代谢能力。",
            details: ["具有DNA/RNA遗传系统", "基本的蛋白质合成机制", "细胞膜结构", "基础代谢途径"]
        },
        bacteria: {
            title: "细菌域",
            description: "细菌是最早出现的生命形式之一，约35亿年前开始繁盛。它们是原核生物，没有细胞核，但具有复杂的生化机制。",
            details: ["无细胞核结构", "细胞壁含肽聚糖", "可进行光合作用", "适应性极强"]
        },
        archaea: {
            title: "古菌域",
            description: "古菌是另一类原核生物，通常生活在极端环境中。它们在分子生物学上与细菌和真核生物都有显著差异。",
            details: ["耐极端环境", "独特的细胞膜结构", "特殊的RNA聚合酶", "独特的代谢途径"]
        },
        eukaryote: {
            title: "真核生物域",
            description: "约20亿年前出现的真核生物具有细胞核和复杂的细胞器，为复杂生命的进化奠定了基础。",
            details: ["具有细胞核", "复杂的细胞器", "有性繁殖", "多细胞化潜能"]
        },
        plant: {
            title: "植物界",
            description: "植物是能够进行光合作用的真核生物，它们将太阳能转化为化学能，是地球生态系统的基础。",
            details: ["进行光合作用", "具有叶绿体", "细胞壁含纤维素", "固着生活方式"]
        },
        fungi: {
            title: "真菌界",
            description: "真菌是异养的真核生物，通过分解有机物获取营养，在生态系统中起重要的分解者作用。",
            details: ["异养生物", "细胞壁含几丁质", "孢子繁殖", "分泌酶分解有机物"]
        },
        animal: {
            title: "动物界",
            description: "动物是多细胞的异养真核生物，具有运动能力和感觉系统，在前寒武纪晚期开始出现。",
            details: ["多细胞异养", "具有运动能力", "感觉和神经系统", "复杂的发育过程"]
        }
    };
    
    treeNodes.forEach(node => {
        node.addEventListener('click', () => {
            const nodeType = Array.from(node.classList).find(cls => 
                cls !== 'tree-node' && nodeDetails[cls]
            );
            
            if (nodeType && nodeDetails[nodeType]) {
                const info = nodeDetails[nodeType];
                evolutionInfo.innerHTML = `
                    <h3>${info.title}</h3>
                    <p>${info.description}</p>
                    <ul style="text-align: left; margin-top: 1rem;">
                        ${info.details.map(detail => `<li>${detail}</li>`).join('')}
                    </ul>
                `;
            }
            
            // Visual feedback
            treeNodes.forEach(n => n.style.transform = 'scale(1)');
            node.style.transform = 'scale(1.2)';
        });
    });
}

// Atmosphere simulator
function initializeAtmosphereSimulator() {
    const timeSlider = document.getElementById('time-slider');
    const timeDisplay = document.getElementById('time-display');
    const atmosphereDescription = document.getElementById('atmosphere-description');
    
    // Atmospheric data for different time periods
    const atmosphereData = {
        1: { // 1亿年前 (现代参考)
            nitrogen: 78, oxygen: 21, co2: 0.04, methane: 0.0002, water: 1,
            title: "现代大气 (1亿年前至今)",
            description: "大气成分已经稳定，氧气和氮气占主导地位，为复杂生命提供了理想环境。"
        },
        5: { // 5亿年前 (寒武纪)
            nitrogen: 75, oxygen: 20, co2: 3, methane: 1, water: 1,
            title: "前寒武纪末期 (5亿年前)",
            description: "大气成分接近现代水平，为寒武纪生命大爆发奠定基础。氧气浓度已达到支持复杂生命的水平。"
        },
        10: { // 10亿年前 (元古宙中期)
            nitrogen: 65, oxygen: 18, co2: 12, methane: 2, water: 3,
            title: "元古宙中期 (10亿年前)",
            description: "大气成分逐渐稳定，氧气浓度继续上升，为复杂真核生物的出现创造条件。"
        },
        20: { // 20亿年前 (大氧化事件)
            nitrogen: 50, oxygen: 15, co2: 20, methane: 5, water: 10,
            title: "大氧化事件 (20亿年前)",
            description: "氧气浓度急剧上升，甲烷浓度下降，许多厌氧生物灭绝。这是地球历史上的重要转折点。"
        },
        25: { // 25亿年前 (大氧化事件前)
            nitrogen: 40, oxygen: 5, co2: 25, methane: 15, water: 15,
            title: "大氧化事件前 (25亿年前)",
            description: "氧气浓度开始上升，但大气中仍有大量甲烷和二氧化碳。蓝绿藻大量繁殖。"
        },
        35: { // 35亿年前 (太古宙早期)
            nitrogen: 20, oxygen: 1, co2: 30, methane: 25, water: 24,
            title: "太古宙早期 (35亿年前)",
            description: "蓝绿藻开始进行光合作用，大气中出现微量氧气，但浓度仍然很低。"
        },
        40: { // 40亿年前 (冥古宙晚期)
            nitrogen: 10, oxygen: 0, co2: 25, methane: 30, water: 35,
            title: "冥古宙晚期 (40亿年前)",
            description: "地壳开始稳定，大气中水蒸气减少，但仍然是无氧环境。二氧化碳和甲烷浓度较高。"
        },
        46: { // 46亿年前 (地球形成初期)
            nitrogen: 5, oxygen: 0, co2: 15, methane: 20, water: 60,
            title: "原始大气 (46亿年前)",
            description: "地球刚形成时的大气主要由水蒸气、甲烷、氨气等组成，几乎没有氧气。这是一个高度还原性的环境。"
        }
    };
    
    timeSlider.addEventListener('input', function() {
        const time = parseInt(this.value);
        timeDisplay.textContent = `${time}亿年前`;
        
        // Find closest data point
        const times = Object.keys(atmosphereData).map(t => parseInt(t)).sort((a, b) => b - a);
        let closestTime = times[0];
        
        for (let t of times) {
            if (time >= t) {
                closestTime = t;
                break;
            }
        }
        
        const data = atmosphereData[closestTime];
        updateAtmosphereViz(data);
    });
    
    function updateAtmosphereViz(data) {
        // Update gas bars
        document.getElementById('nitrogen-bar').style.width = `${data.nitrogen * 2}%`;
        document.getElementById('nitrogen-percent').textContent = `${data.nitrogen}%`;
        
        document.getElementById('oxygen-bar').style.width = `${data.oxygen * 5}%`;
        document.getElementById('oxygen-percent').textContent = `${data.oxygen}%`;
        
        document.getElementById('co2-bar').style.width = `${data.co2 * 3}%`;
        document.getElementById('co2-percent').textContent = `${data.co2}%`;
        
        document.getElementById('methane-bar').style.width = `${data.methane * 3}%`;
        document.getElementById('methane-percent').textContent = `${data.methane}%`;
        
        document.getElementById('water-bar').style.width = `${data.water * 1.5}%`;
        document.getElementById('water-percent').textContent = `${data.water}%`;
        
        // Update description
        atmosphereDescription.innerHTML = `
            <h4>${data.title}</h4>
            <p>${data.description}</p>
        `;
    }
    
    // Initialize with default values
    updateAtmosphereViz(atmosphereData[46]);
}

// Fossil gallery
function initializeFossilGallery() {
    const fossilItems = document.querySelectorAll('.fossil-item');
    const fossilDetail = document.getElementById('fossil-detail');
    
    const fossilData = {
        stromatolite: {
            title: "叠层石 (Stromatolites)",
            description: "叠层石是由蓝绿藻(蓝细菌)群落形成的层状岩石结构，是地球上最古老的生物化石证据。",
            details: [
                "形成时间：约35亿年前至今",
                "形成环境：浅海和湖泊环境",
                "生物成因：蓝绿藻垫层层叠加",
                "重要意义：证明早期光合作用的存在",
                "现代分布：澳大利亚、巴哈马等地仍有活体"
            ]
        },
        acritarch: {
            title: "疑源类 (Acritarchs)",
            description: "疑源类是一类早期真核生物的化石，通常呈球形或囊状，是研究早期真核生物演化的重要材料。",
            details: [
                "形成时间：约18-5亿年前",
                "生物特征：单细胞真核生物",
                "形态特征：球形、椭圆形或多角形",
                "保存方式：有机壁化石",
                "科学价值：真核生物演化的重要证据"
            ]
        },
        bif: {
            title: "条带状铁建造 (Banded Iron Formations)",
            description: "条带状铁建造是由铁矿物和硅质矿物交替形成的岩层，记录了地球早期氧气浓度的变化。",
            details: [
                "形成时间：约38-18亿年前",
                "形成机制：氧气与海水中Fe²⁺反应",
                "岩石特征：红色铁矿层与灰色硅质层交替",
                "环境指示：反映大气氧气浓度变化",
                "经济价值：重要的铁矿石资源"
            ]
        },
        ediacaran: {
            title: "埃迪卡拉生物群 (Ediacaran Biota)",
            description: "埃迪卡拉生物群是前寒武纪末期出现的最早的复杂多细胞生物群，为寒武纪生命大爆发奠定基础。",
            details: [
                "生存时间：约6.35-5.41亿年前",
                "生物特征：软体多细胞生物",
                "形态多样：盘状、叶状、管状等",
                "生活环境：浅海海底",
                "演化意义：复杂生物演化的重要阶段"
            ]
        }
    };
    
    fossilItems.forEach(item => {
        item.addEventListener('click', () => {
            const fossilType = item.getAttribute('data-fossil');
            const data = fossilData[fossilType];
            
            if (data) {
                fossilDetail.innerHTML = `
                    <h3>${data.title}</h3>
                    <p>${data.description}</p>
                    <ul style="text-align: left; margin-top: 1rem;">
                        ${data.details.map(detail => `<li>${detail}</li>`).join('')}
                    </ul>
                `;
            }
            
            // Visual feedback
            fossilItems.forEach(f => f.style.borderColor = 'transparent');
            item.style.borderColor = '#74b9ff';
        });
    });
}

// Climate chart
function initializeClimateChart() {
    const canvas = document.getElementById('temperature-chart');
    const ctx = canvas.getContext('2d');
    const climateButtons = document.querySelectorAll('.climate-btn');
    const climateEvents = document.getElementById('climate-events');
    
    let currentDataType = 'temperature';
    
    // Sample data for different metrics
    const climateData = {
        temperature: {
            title: "全球平均温度变化",
            data: [
                {time: 4600, value: 85, label: "地球形成初期"},
                {time: 4000, value: 70, label: "地壳稳定"},
                {time: 3500, value: 60, label: "早期生命"},
                {time: 2500, value: 45, label: "大氧化事件"},
                {time: 2000, value: 30, label: "雪球地球前"},
                {time: 1000, value: 25, label: "稳定期"},
                {time: 750, value: -5, label: "雪球地球"},
                {time: 540, value: 22, label: "前寒武纪末"}
            ],
            unit: "°C",
            color: "#ff6b6b",
            events: [
                "4600百万年前：地球形成，表面温度极高",
                "2400百万年前：大氧化事件导致全球降温",
                "750-580百万年前：雪球地球事件"
            ]
        },
        'sea-level': {
            title: "海平面相对变化",
            data: [
                {time: 4600, value: 0, label: "无海洋"},
                {time: 4000, value: -200, label: "原始海洋"},
                {time: 3500, value: -150, label: "海洋扩张"},
                {time: 2500, value: -100, label: "稳定海洋"},
                {time: 2000, value: -80, label: "海洋成熟"},
                {time: 1000, value: -50, label: "现代海洋雏形"},
                {time: 750, value: -300, label: "冰期锁水"},
                {time: 540, value: 0, label: "现代参考"}
            ],
            unit: "m",
            color: "#74b9ff",
            events: [
                "4000百万年前：第一批海洋形成",
                "2500百万年前：海洋化学成分稳定",
                "750百万年前：冰期导致海平面大幅下降"
            ]
        },
        oxygen: {
            title: "大气氧气浓度",
            data: [
                {time: 4600, value: 0, label: "无氧大气"},
                {time: 4000, value: 0, label: "还原性大气"},
                {time: 3500, value: 0.1, label: "光合作用开始"},
                {time: 2500, value: 1, label: "氧气积累"},
                {time: 2000, value: 8, label: "大氧化事件"},
                {time: 1000, value: 15, label: "氧气上升"},
                {time: 750, value: 18, label: "接近现代"},
                {time: 540, value: 21, label: "现代水平"}
            ],
            unit: "%",
            color: "#00b894",
            events: [
                "3500百万年前：蓝绿藻开始产氧",
                "2400百万年前：大氧化事件开始",
                "1800百万年前：氧气浓度稳定上升"
            ]
        }
    };
    
    function drawChart(dataType) {
        const data = climateData[dataType];
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Set up drawing parameters
        const padding = 60;
        const chartWidth = canvas.width - 2 * padding;
        const chartHeight = canvas.height - 2 * padding;
        
        // Find data range
        const times = data.data.map(d => d.time);
        const values = data.data.map(d => d.value);
        const minTime = Math.min(...times);
        const maxTime = Math.max(...times);
        const minValue = Math.min(...values);
        const maxValue = Math.max(...values);
        
        // Draw axes
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, canvas.height - padding);
        ctx.lineTo(canvas.width - padding, canvas.height - padding);
        ctx.stroke();
        
        // Draw grid lines
        ctx.strokeStyle = '#ddd';
        ctx.lineWidth = 1;
        for (let i = 1; i < 5; i++) {
            const y = padding + (chartHeight * i / 5);
            ctx.beginPath();
            ctx.moveTo(padding, y);
            ctx.lineTo(canvas.width - padding, y);
            ctx.stroke();
        }
        
        // Draw data line
        ctx.strokeStyle = data.color;
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        data.data.forEach((point, index) => {
            const x = padding + (chartWidth * (maxTime - point.time) / (maxTime - minTime));
            const y = canvas.height - padding - (chartHeight * (point.value - minValue) / (maxValue - minValue));
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        ctx.stroke();
        
        // Draw data points
        ctx.fillStyle = data.color;
        data.data.forEach(point => {
            const x = padding + (chartWidth * (maxTime - point.time) / (maxTime - minTime));
            const y = canvas.height - padding - (chartHeight * (point.value - minValue) / (maxValue - minValue));
            
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, 2 * Math.PI);
            ctx.fill();
        });
        
        // Draw labels
        ctx.fillStyle = '#333';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        
        // X-axis labels (time)
        for (let i = 0; i <= 4; i++) {
            const time = maxTime - (maxTime - minTime) * i / 4;
            const x = padding + chartWidth * i / 4;
            ctx.fillText(`${Math.round(time/100)/10}Ga`, x, canvas.height - padding + 20);
        }
        
        // Y-axis labels (values)
        ctx.textAlign = 'right';
        for (let i = 0; i <= 4; i++) {
            const value = minValue + (maxValue - minValue) * i / 4;
            const y = canvas.height - padding - chartHeight * i / 4;
            ctx.fillText(`${Math.round(value * 10) / 10}${data.unit}`, padding - 10, y + 4);
        }
        
        // Chart title
        ctx.textAlign = 'center';
        ctx.font = 'bold 16px Arial';
        ctx.fillText(data.title, canvas.width / 2, 30);
        
        // Update events
        const eventList = climateEvents.querySelector('.event-list');
        eventList.innerHTML = data.events.map(event => 
            `<div class="climate-event">${event}</div>`
        ).join('');
    }
    
    // Button event listeners
    climateButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            climateButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            currentDataType = btn.getAttribute('data-type');
            drawChart(currentDataType);
        });
    });
    
    // Initialize with temperature data
    drawChart(currentDataType);
}

// Scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll(
        '.detail-card, .evolution-card, .fossil-item, .tree-node'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Responsive handling
function handleResize() {
    // Reinitialize particles for mobile
    if (window.innerWidth < 768) {
        const particlesContainer = document.getElementById('particles');
        particlesContainer.innerHTML = '';
        initializeParticles();
    }
    
    // Resize canvas
    const canvas = document.getElementById('temperature-chart');
    if (canvas) {
        canvas.width = canvas.offsetWidth;
        canvas.height = 400;
        initializeClimateChart();
    }
}

window.addEventListener('resize', handleResize);

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Interactive timeline scrubber
function initializeTimelineScrubber() {
    const scrubber = document.getElementById('timeline-scrubber');
    const scrubberHandle = document.querySelector('.scrubber-handle');
    const timeDisplay = document.getElementById('scrubber-time');
    
    if (!scrubber) return;
    
    let isDragging = false;
    
    const timePoints = [
        { position: 0, time: '46亿年前', era: 'hadean', title: '冥古宙开始' },
        { position: 15, time: '40亿年前', era: 'hadean', title: '地壳稳定' },
        { position: 30, time: '35亿年前', era: 'archean', title: '太古宙-早期生命' },
        { position: 45, time: '25亿年前', era: 'archean', title: '大氧化事件' },
        { position: 60, time: '18亿年前', era: 'proterozoic', title: '元古宙开始' },
        { position: 75, time: '10亿年前', era: 'proterozoic', title: '真核生物繁盛' },
        { position: 90, time: '7亿年前', era: 'proterozoic', title: '雪球地球' },
        { position: 100, time: '5.4亿年前', era: 'phanerozoic', title: '显生宙开始' }
    ];
    
    function updateTimeDisplay(position) {
        // Find closest time point
        let closestPoint = timePoints[0];
        let minDistance = Math.abs(position - timePoints[0].position);
        
        timePoints.forEach(point => {
            const distance = Math.abs(position - point.position);
            if (distance < minDistance) {
                minDistance = distance;
                closestPoint = point;
            }
        });
        
        timeDisplay.textContent = `${closestPoint.time} - ${closestPoint.title}`;
        
        // Update era if changed
        if (closestPoint.era !== currentEra) {
            switchEra(closestPoint.era);
        }
    }
    
    function handleMouseMove(e) {
        if (!isDragging) return;
        
        const rect = scrubber.getBoundingClientRect();
        const position = Math.max(0, Math.min(100, 
            ((e.clientX - rect.left) / rect.width) * 100
        ));
        
        scrubberHandle.style.left = position + '%';
        updateTimeDisplay(position);
    }
    
    function handleTouchMove(e) {
        if (!isDragging) return;
        e.preventDefault();
        
        const rect = scrubber.getBoundingClientRect();
        const touch = e.touches[0];
        const position = Math.max(0, Math.min(100, 
            ((touch.clientX - rect.left) / rect.width) * 100
        ));
        
        scrubberHandle.style.left = position + '%';
        updateTimeDisplay(position);
    }
    
    scrubberHandle.addEventListener('mousedown', (e) => {
        isDragging = true;
        e.preventDefault();
    });
    
    scrubberHandle.addEventListener('touchstart', (e) => {
        isDragging = true;
        e.preventDefault();
    });
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    
    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
    
    document.addEventListener('touchend', () => {
        isDragging = false;
    });
    
    // Initialize
    updateTimeDisplay(0);
}

// Interactive 3D rock formations (simplified CSS-based)
function initializeRockFormations() {
    const rockContainer = document.querySelector('.rock-formations');
    if (!rockContainer) return;
    
    const rocks = [
        { type: 'igneous', name: '火成岩', description: '由岩浆冷却形成' },
        { type: 'sedimentary', name: '沉积岩', description: '由沉积物压实形成' },
        { type: 'metamorphic', name: '变质岩', description: '由高温高压变质形成' }
    ];
    
    rocks.forEach((rock, index) => {
        const rockElement = document.createElement('div');
        rockElement.className = `rock-formation ${rock.type}`;
        rockElement.innerHTML = `
            <div class="rock-surface"></div>
            <div class="rock-info">
                <h4>${rock.name}</h4>
                <p>${rock.description}</p>
            </div>
        `;
        
        rockElement.style.animationDelay = `${index * 0.5}s`;
        rockContainer.appendChild(rockElement);
        
        // Hover interactions
        rockElement.addEventListener('mouseenter', () => {
            rockElement.style.transform = 'rotateY(20deg) rotateX(10deg) scale(1.05)';
        });
        
        rockElement.addEventListener('mouseleave', () => {
            rockElement.style.transform = 'rotateY(0deg) rotateX(0deg) scale(1)';
        });
    });
}

// Geological process simulator
function initializeGeologySimulator() {
    const simulatorContainer = document.getElementById('geology-simulator');
    if (!simulatorContainer) return;
    
    const processes = {
        erosion: {
            title: '侵蚀作用',
            description: '风化和侵蚀逐渐改变地表形态',
            animation: 'erosion-animation'
        },
        sedimentation: {
            title: '沉积作用', 
            description: '沉积物在低洼地区堆积形成地层',
            animation: 'sedimentation-animation'
        },
        tectonics: {
            title: '构造运动',
            description: '地壳运动形成山脉和裂谷',
            animation: 'tectonics-animation'
        }
    };
    
    const processButtons = simulatorContainer.querySelectorAll('.process-btn');
    const animationArea = simulatorContainer.querySelector('.animation-area');
    
    processButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const processType = btn.getAttribute('data-process');
            const process = processes[processType];
            
            // Update active button
            processButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Update animation
            animationArea.className = `animation-area ${process.animation}`;
            
            // Update description
            const description = simulatorContainer.querySelector('.process-description');
            description.innerHTML = `
                <h4>${process.title}</h4>
                <p>${process.description}</p>
            `;
        });
    });
}

// Modal system for detailed information
function initializeModalSystem() {
    const modals = document.querySelectorAll('.modal');
    const modalTriggers = document.querySelectorAll('[data-modal]');
    const modalCloses = document.querySelectorAll('.modal-close');
    
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = trigger.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'flex';
                modal.style.opacity = '0';
                setTimeout(() => {
                    modal.style.opacity = '1';
                }, 10);
            }
        });
    });
    
    modalCloses.forEach(close => {
        close.addEventListener('click', () => {
            const modal = close.closest('.modal');
            modal.style.opacity = '0';
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        });
    });
    
    // Close modal on backdrop click
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.opacity = '0';
                setTimeout(() => {
                    modal.style.display = 'none';
                }, 300);
            }
        });
    });
}

// Performance optimization
function optimizePerformance() {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Throttle scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(() => {
            updateScrollProgress();
        }, 16); // ~60fps
    });
}

function updateScrollProgress() {
    const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) {
        progressBar.style.width = `${scrollPercent}%`;
    }
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    initializeTimelineScrubber();
    initializeRockFormations();
    initializeGeologySimulator();
    initializeModalSystem();
    optimizePerformance();
    
    // Set canvas size
    const canvas = document.getElementById('temperature-chart');
    if (canvas) {
        canvas.width = canvas.offsetWidth;
        canvas.height = 400;
    }
});

// Export functions for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeParticles,
        initializeCounters,
        initializeTimeline,
        initializeEvolutionTree,
        initializeAtmosphereSimulator,
        initializeFossilGallery,
        initializeClimateChart
    };
}
