// DOM 元素加载完成后执行
document.addEventListener('DOMContentLoaded', function()
{
    // 导航栏滚动效果
    window.addEventListener('scroll', function()
     {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) 
        {
            navbar.classList.add('scrolled');
        } 
        else 
        {
            navbar.classList.remove('scrolled');
        }
    });
    document.addEventListener('DOMContentLoaded', function() {
    // 确保地图容器结构正确
    const plateMapContainer = document.querySelector('.plate-section');
    if (plateMapContainer) {
        // 检查是否已经有正确的结构
        let plateMap = plateMapContainer.querySelector('.plate-map');
        let mapControls = plateMapContainer.querySelector('.map-controls');
        
        // 如果没有正确的结构，重新创建
        if (!plateMap || !mapControls) {
            plateMapContainer.innerHTML = `
                <div class="plate-map">
                    <div class="map-info">
                        <p>点击按钮查看不同时期的板块分布</p>
                    </div>
                </div>
                <div class="map-controls">
                    <button class="map-control active" data-time="early" onclick="changeMapTime('early')">早奥陶世 (485-470 Ma)</button>
                    <button class="map-control" data-time="middle" onclick="changeMapTime('middle')">中奥陶世 (470-458 Ma)</button>
                    <button class="map-control" data-time="late" onclick="changeMapTime('late')">晚奥陶世 (458-443 Ma)</button>
                </div>
            `;
        } else {
            // 确保按钮有正确的属性和事件
            const buttons = mapControls.querySelectorAll('.map-control');
            const times = ['early', 'middle', 'late'];
            const labels = ['早奥陶世 (485-470 Ma)', '中奥陶世 (470-458 Ma)', '晚奥陶世 (458-443 Ma)'];
            
            buttons.forEach((button, index) => {
                button.setAttribute('data-time', times[index]);
                button.setAttribute('onclick', `changeMapTime('${times[index]}')`);
                button.textContent = labels[index];
                if (index === 0) button.classList.add('active');
            });
        }
        
        // 初始化地图为早奥陶世
        changeMapTime('early');
    }
});




    // 移动端导航菜单
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle)
    {
        navToggle.addEventListener('click', function() 
        {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // 导航链接点击关闭菜单
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // 时间轴初始化
    initTimeline();

    // 初始化物种轮播
    initSpeciesCarousel();

    // 初始化标签页
    initTabs();
});

// 英雄区域时间旅行动画
let timelineAnimationInterval;
function toggleTimelineAnimation()
 {
    const timeCounter = document.getElementById('time-counter');
    const button = document.querySelector('.secondary-button i');
    
    if (timelineAnimationInterval) 
    {
        clearInterval(timelineAnimationInterval);
        timelineAnimationInterval = null;
        button.className = 'fas fa-play';
    } 
    else 
    {
        let time = 485000000;
        button.className = 'fas fa-pause';
        
        timelineAnimationInterval = setInterval(() => 
        {
            time -= 10000000;
            if (time <= 443000000) 
            {
                time = 485000000;
            }
            timeCounter.textContent = time.toLocaleString();
        }, 100);
    }
}

// 滚动到指定部分
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// 时间轴功能
let currentTimelineIndex = 0;
const timelineEvents = document.querySelectorAll('.timeline-event');

function initTimeline() {
    updateTimelineProgress();
    
    document.getElementById('timeline-prev').addEventListener('click', prevTimelineEvent);
    document.getElementById('timeline-next').addEventListener('click', nextTimelineEvent);
}

function prevTimelineEvent() {
    if (currentTimelineIndex > 0) {
        currentTimelineIndex--;
        updateTimelineDisplay();
    }
}

function nextTimelineEvent() {
    if (currentTimelineIndex < timelineEvents.length - 1) {
        currentTimelineIndex++;
        updateTimelineDisplay();
    }
}

function updateTimelineDisplay() {
    timelineEvents.forEach((event, index) => {
        if (index === currentTimelineIndex) {
            event.classList.add('active');
        } else {
            event.classList.remove('active');
        }
    });
    
    updateTimelineProgress();
}

function updateTimelineProgress() {
    const progressBar = document.querySelector('.timeline-progress-bar');
    const progress = (currentTimelineIndex / (timelineEvents.length - 1)) * 100;
    progressBar.style.width = `${progress}%`;
}

// 板块地图时间切换
function changeMapTime(time) {
    const plateMap = document.getElementById('plate-map');
    const buttons = document.querySelectorAll('.map-control');
    
    // 移除所有按钮的active类
    buttons.forEach(button => button.classList.remove('active'));
    
    // 为当前按钮添加active类
    document.querySelector(`[data-time="${time}"]`).classList.add('active');

//保存原始内容，包括提示文字
    const orifinalText="点击按钮查看不同时期的板块分布";
    let mapHTML=`<div class="map-info"><p>${originalText}</p>`;

    
    // 根据时间更改地图背景
    switch(time) {
        case 'early':
            plateMap.style.background = "linear-gradient(135deg, #1A535C, #4ECDC4)";
            mapHTML += `<h3>早奥陶世 (485-470 Ma)</h3>
                       <p>这一时期，冈瓦纳大陆位于南极地区，劳伦大陆靠近赤道。</p>`;
            break;
        case 'middle':
            plateMap.style.background = "linear-gradient(135deg, #4ECDC4, #FFD166)";
            mapHTML += `<h3>中奥陶世 (470-458 Ma)</h3>
                       <p>这一时期，大陆漂移速度加快，板块构造活动活跃。</p>`;
            break;
        case 'late':
            plateMap.style.background = "linear-gradient(135deg, #FF6B6B, #FFD166)";
            mapHTML += `<h3>晚奥陶世 (458-443 Ma)</h3>
                       <p>这一时期，冈瓦纳大陆向南极漂移，全球气候开始变冷。</p>`;
            break;
    }
        // 关闭div标签
    mapHTML += `</div>`;
    
    // 更新地图内容，但不影响按钮
    plateMap.innerHTML = mapHTML;
}

// 海平面动画
function animateSeaLevel(period) {
    const sea = document.querySelector('.sea');
    const buttons = document.querySelectorAll('.sea-control');
    
    // 移除所有按钮的active类
    buttons.forEach(button => button.classList.remove('active'));
    
    // 为当前按钮添加active类
    document.querySelector(`[onclick="animateSeaLevel('${period}')"]`).classList.add('active');
    
    switch(period) {
        case 'early':
            sea.style.height = '40%';
            sea.style.bottom = '30%';
            break;
        case 'middle':
            sea.style.height = '50%';
            sea.style.bottom = '30%';
            break;
        case 'late':
            sea.style.height = '60%';
            sea.style.bottom = '30%';
            break;
        case 'hirnantian':
            sea.style.height = '20%';
            sea.style.bottom = '30%';
            break;
    }
}

// 物种轮播
let currentSpeciesIndex = 0;
const speciesCards = document.querySelectorAll('.species-card');
const indicators = document.querySelectorAll('.indicator');

function initSpeciesCarousel() {
    updateSpeciesDisplay();
}

function prevSpecies() {
    if (currentSpeciesIndex > 0) {
        currentSpeciesIndex--;
        updateSpeciesDisplay();
    } else {
        currentSpeciesIndex = speciesCards.length - 1;
        updateSpeciesDisplay();
    }
}

function nextSpecies() {
    if (currentSpeciesIndex < speciesCards.length - 1) {
        currentSpeciesIndex++;
        updateSpeciesDisplay();
    } else {
        currentSpeciesIndex = 0;
        updateSpeciesDisplay();
    }
}

function showSpecies(index) {
    currentSpeciesIndex = index;
    updateSpeciesDisplay();
}

function updateSpeciesDisplay() {
    speciesCards.forEach((card, index) => {
        if (index === currentSpeciesIndex) {
            card.classList.add('active');
        } else {
            card.classList.remove('active');
        }
    });
    
    indicators.forEach((indicator, index) => {
        if (index === currentSpeciesIndex) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

// 灭绝阶段展示
function showExtinctionStage(stage) {
    const stages = ['normal', 'first', 'second'];
    const buttons = document.querySelectorAll('.extinction-btn');
    
    stages.forEach(s => {
        const stageElement = document.getElementById(`stage-${s}`);
        if (s === stage) {
            stageElement.querySelector('.stage-visual').style.zIndex = 10;
        } else {
            stageElement.querySelector('.stage-visual').style.zIndex = 1;
        }
    });
    
    // 移除所有按钮的active类
    buttons.forEach(button => button.classList.remove('active'));
    
    // 为当前按钮添加active类
    document.querySelector(`[onclick="showExtinctionStage('${stage}')"]`).classList.add('active');
}

// 标签页功能
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // 移除所有按钮和内容的active类
            document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
            
            // 为当前按钮和内容添加active类
            this.classList.add('active');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });
}

// 化石挖掘游戏
function digFossil(layer) {
    const fossil = layer.querySelector('.fossil');
    const fossilType = fossil.getAttribute('data-fossil');
    
    if (fossil.classList.contains('hidden')) {
        fossil.classList.remove('hidden');
        
        const foundFossils = document.getElementById('found-fossils');
        const emptyCollection = foundFossils.querySelector('.empty-collection');
        
        if (emptyCollection) {
            emptyCollection.remove();
        }
        
        const fossilEmoji = fossil.textContent;
        const foundFossil = document.createElement('div');
        foundFossil.className = 'found-fossil';
        foundFossil.textContent = fossilEmoji;
        foundFossil.setAttribute('data-fossil', fossilType);
        foundFossil.addEventListener('click', function() {
            showFossilInfo(fossilType);
        });
        
        foundFossils.appendChild(foundFossil);
    }
}

function showFossilInfo(fossilType) {
    const fossilInfo = {
        trilobite: {
            name: '三叶虫',
            description: '奥陶纪的霸主，种类达到历史巅峰，拥有复杂的复眼结构。三叶虫是古生代海洋中最具代表性的节肢动物，在奥陶纪达到了多样性的顶峰。'
        },
        brachiopod: {
            name: '腕足动物',
            description: '奥陶纪海底的主要居民，双壳结构，固着生活。腕足动物在奥陶纪大辐射中迅速繁盛，成为海底生态系统的重要组成部分。'
        },
        graptolite: {
            name: '笔石',
            description: '重要的奥陶纪标准化石，群体生活，浮游生活方式。笔石是奥陶纪地层划分的重要标志化石，其快速演化和广泛分布使其成为地质年代对比的理想工具。'
        },
        cephalopod: {
            name: '头足类',
            description: '直角石等巨型头足类是奥陶纪海洋中的顶级捕食者。奥陶纪的头足类动物体型巨大，有些可达10米长，是当时海洋生态系统的顶级捕食者。'
        },
        coral: {
            name: '四射珊瑚',
            description: '古代珊瑚礁的建造者，固着生活，形成石灰岩礁体。四射珊瑚在奥陶纪开始繁盛，它们构建的珊瑚礁为众多海洋生物提供了栖息地。'
        }
    };
    
    const info = fossilInfo[fossilType];
    
    if (info) {
        const modalBody = document.getElementById('modal-body');
        modalBody.innerHTML = `
            <h2>${info.name}</h2>
            <p>${info.description}</p>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Trilobite_Fossil.jpg/800px-Trilobite_Fossil.jpg" alt="${info.name}" style="max-width: 100%; border-radius: 8px; margin-top: 1rem;">
        `;
        
        openModal();
    }
}

// 知识问答
const questions = [
    {
        question: '奥陶纪大约持续了多长时间？',
        options: ['约2000万年', '约4200万年', '约6000万年', '约1000万年'],
        correctIndex: 1
    },
    {
        question: '奥陶纪末期发生的生物大灭绝事件是地球历史上第几次大灭绝？',
        options: ['第一次', '第二次', '第三次', '第四次'],
        correctIndex: 0
    },
    {
        question: '奥陶纪时期，哪个大陆板块位于南极地区？',
        options: ['劳伦板块', '波罗的板块', '冈瓦纳板块', '西伯利亚板块'],
        correctIndex: 2
    },
    {
        question: '奥陶纪末期生物大灭绝中，约有多少比例的海洋生物物种消失？',
        options: ['约25%', '约50%', '约85%', '约95%'],
        correctIndex: 2
    },
    {
        question: '以下哪种生物在奥陶纪生物大辐射中达到了多样性的顶峰？',
        options: ['三叶虫', '恐龙', '哺乳动物', '被子植物'],
        correctIndex: 0
    }
];

let currentQuestionIndex = 0;

function checkAnswer(button, isCorrect) {
    const options = document.querySelectorAll('.quiz-option');
    const result = document.getElementById('quiz-result');
    const nextButton = document.getElementById('next-question');
    
    options.forEach(option => {
        option.disabled = true;
    });
    
    if (isCorrect) {
        button.classList.add('correct');
        result.textContent = '回答正确！';
        result.style.color = '#4CAF50';
    } else {
        button.classList.add('incorrect');
        result.textContent = '回答错误！正确答案是：' + questions[currentQuestionIndex].options[questions[currentQuestionIndex].correctIndex];
        result.style.color = '#F44336';
        
        options[questions[currentQuestionIndex].correctIndex].classList.add('correct');
    }
    
    nextButton.style.display = 'block';
}

function nextQuestion() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex >= questions.length) {
        currentQuestionIndex = 0;
    }
    
    const questionText = document.getElementById('question-text');
    const options = document.querySelectorAll('.quiz-option');
    const result = document.getElementById('quiz-result');
    const nextButton = document.getElementById('next-question');
    
    questionText.textContent = questions[currentQuestionIndex].question;
    
    options.forEach((option, index) => {
        option.textContent = questions[currentQuestionIndex].options[index];
        option.classList.remove('correct', 'incorrect');
        option.disabled = false;
        option.onclick = function() {
            checkAnswer(this, index === questions[currentQuestionIndex].correctIndex);
        };
    });
    
    result.textContent = '';
    nextButton.style.display = 'none';
}

// 时间线构建
document.addEventListener('DOMContentLoaded', function() {
    const draggableEvents = document.querySelectorAll('.draggable-event');
    const dropZone = document.querySelector('.timeline-drop-zone');
    
    draggableEvents.forEach(event => {
        event.addEventListener('dragstart', function(e) {
            e.dataTransfer.setData('text/plain', e.target.getAttribute('data-year'));
            e.target.classList.add('dragging');
        });
        
        event.addEventListener('dragend', function() {
            event.classList.remove('dragging');
        });
    });
    
    dropZone.addEventListener('dragover', function(e) {
        e.preventDefault();
    });
    
    dropZone.addEventListener('drop', function(e) {
        e.preventDefault();
        const year = e.dataTransfer.getData('text/plain');
        const draggingEvent = document.querySelector(`.draggable-event[data-year="${year}"]`);
        
        if (draggingEvent) {
            const clone = draggingEvent.cloneNode(true);
            clone.setAttribute('draggable', 'false');
            
            // 计算放置位置
            const dropX = e.clientX - dropZone.getBoundingClientRect().left;
            const zoneWidth = dropZone.offsetWidth;
            const position = (dropX / zoneWidth) * 100;
            
            clone.style.position = 'absolute';
            clone.style.left = `${position}%`;
            clone.style.top = '50%';
            clone.style.transform = 'translate(-50%, -50%)';
            
            dropZone.appendChild(clone);
            draggingEvent.style.opacity = '0.5';
            draggingEvent.setAttribute('draggable', 'false');
            
            // 检查位置是否正确
            const yearNum = parseInt(year);
            let correctPosition;
            
            if (yearNum === 485) correctPosition = 0;
            else if (yearNum === 470) correctPosition = 25;
            else if (yearNum === 445) correctPosition = 75;
            else if (yearNum === 444) correctPosition = 85;
            else if (yearNum === 443) correctPosition = 100;
            
            const tolerance = 10; // 允许的误差范围
            const isCorrect = Math.abs(position - correctPosition) <= tolerance;
            
            if (isCorrect) {
                clone.style.backgroundColor = '#4CAF50';
                clone.style.color = 'white';
                document.getElementById('timeline-feedback').textContent = '位置正确！';
            } else {
                clone.style.backgroundColor = '#F44336';
                clone.style.color = 'white';
                document.getElementById('timeline-feedback').textContent = '位置不正确，请重试。';
                
                setTimeout(() => {
                    dropZone.removeChild(clone);
                    draggingEvent.style.opacity = '1';
                    draggingEvent.setAttribute('draggable', 'true');
                    document.getElementById('timeline-feedback').textContent = '';
                }, 2000);
            }
        }
    });
});

// 模态框功能
function openModal() {
    document.getElementById('modal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// 点击模态框外部关闭
window.addEventListener('click', function(event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        closeModal();
    }
});
