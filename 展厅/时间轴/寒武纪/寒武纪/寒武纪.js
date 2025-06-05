// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initParticles();
    initScrollAnimations();
    initTimelineAnimations();
    initNavigation();
});

// 创建粒子背景
function initParticles() {
    const container = document.getElementById('particles-container');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 6 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
        
        container.appendChild(particle);
    }
}

// 导航栏初始化
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
}

// 滚动动画
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.timeline-item, .creature-card').forEach(el => {
        observer.observe(el);
    });
}

// 时间轴动画
function initTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.3 });
    
    timelineItems.forEach(item => observer.observe(item));
}

// 平滑滚动到指定区域
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// 显示时间轴详细信息
function showTimelineDetail(period) {
    const details = {
        'early': {
            title: '早寒武世 (541-521 Ma)',
            content: `
                <h3>生命大爆发的开端</h3>
                <p>早寒武世标志着显生宙的开始，这一时期发生了地球历史上最重要的生物演化事件。</p>
                <h4>主要事件：</h4>
                <ul>
                    <li><strong>三叶虫出现：</strong>成为寒武纪最具代表性的化石</li>
                    <li><strong>硬壳动物：</strong>许多动物开始发育矿化的外壳</li>
                    <li><strong>埃迪卡拉生物群衰落：</strong>前寒武纪软体生物逐渐消失</li>
                    <li><strong>复杂眼睛进化：</strong>复眼和简单眼睛结构快速发展</li>
                </ul>
                <h4>环境特征：</h4>
                <p>海平面上升，气候温暖湿润，大气含氧量增加，为生物大爆发创造了有利条件。</p>
            `
        },
        'middle': {
            title: '中寒武世 (521-514 Ma)',
            content: `
                <h3>生物多样性的黄金时代</h3>
                <p>中寒武世是寒武纪生物多样性的高峰期，出现了许多奇异而复杂的生物形态。</p>
                <h4>主要特征：</h4>
                <ul>
                    <li><strong>奇虾类繁盛：</strong>顶级捕食者奇虾达到鼎盛</li>
                    <li><strong>布尔吉斯页岩：</strong>保存了大量软体组织化石</li>
                    <li><strong>生态复杂化：</strong>食物链结构日趋复杂</li>
                    <li><strong>运动能力增强：</strong>主动游泳和爬行动物增多</li>
                </ul>
                <h4>重要化石产地：</h4>
                <p>加拿大布尔吉斯页岩和中国澄江化石群为我们提供了丰富的化石证据。</p>
            `
        },
        'late': {
            title: '晚寒武世 (514-485 Ma)',
            content: `
                <h3>生态系统的稳定与成熟</h3>
                <p>晚寒武世生物群落趋于稳定，现代动物门类的基本特征得到确立。</p>
                <h4>演化趋势：</h4>
                <ul>
                    <li><strong>三叶虫多样化：</strong>三叶虫种类达到最高峰</li>
                    <li><strong>生态位分化：</strong>不同生物占据特定的生态位</li>
                    <li><strong>大灭绝事件：</strong>发生数次小规模灭绝事件</li>
                    <li><strong>向奥陶纪过渡：</strong>为后续演化奠定基础</li>
                </ul>
                <h4>重要意义：</h4>
                <p>确立了现代生物界的基本框架，多数现存动物门类的基本体型在此时期已经出现。</p>
            `
        }
    };
    
    showModal(details[period].title, details[period].content);
}

// 显示生物详细信息
function showCreatureInfo(creature) {
    const creatures = {
        'trilobite': {
            title: '三叶虫 (Trilobita)',
            content: `
                <div style="text-align: center; margin-bottom: 1rem;">
                    <div style="font-size: 4rem;">🦂</div>
                </div>
                <h3>寒武纪的王者</h3>
                <p>三叶虫是寒武纪最成功和最具代表性的节肢动物，统治海洋长达2.7亿年。</p>
                <h4>主要特征：</h4>
                <ul>
                    <li><strong>三分构造：</strong>身体分为头部、胸部和尾部三个部分</li>
                    <li><strong>复合眼：</strong>拥有地球上最早的复眼系统</li>
                    <li><strong>外骨骼：</strong>碳酸钙质外壳提供保护</li>
                    <li><strong>分节身体：</strong>灵活的分节结构便于运动</li>
                </ul>
                <h4>生态角色：</h4>
                <p>多数为底栖生物，以有机碎屑和小型生物为食，部分种类可能具有滤食性。</p>
                <h4>演化意义：</h4>
                <p>三叶虫化石是重要的标准化石，用于地层对比和时代划分。</p>
            `
        },
        'anomalocaris': {
            title: '奇虾 (Anomalocaris)',
            content: `
                <div style="text-align: center; margin-bottom: 1rem;">
                    <div style="font-size: 4rem;">🦐</div>
                </div>
                <h3>寒武纪顶级捕食者</h3>
                <p>奇虾是寒武纪海洋中的超级捕食者，体长可达2米，是当时最大的动物。</p>
                <h4>形态特征：</h4>
                <ul>
                    <li><strong>巨大体型：</strong>身长可达2米，是寒武纪巨无霸</li>
                    <li><strong>抓握附肢：</strong>头部具有强大的抓握附肢</li>
                    <li><strong>复合眼：</strong>大型复眼提供优秀视力</li>
                    <li><strong>游泳能力：</strong>身体两侧的鳍状结构用于游泳</li>
                </ul>
                <h4>捕食方式：</h4>
                <p>使用头部的抓握附肢捕捉猎物，主要捕食三叶虫等较大的节肢动物。</p>
                <h4>发现历史：</h4>
                <p>最初被误认为是三个不同的生物，后来才确认是同一动物的不同部位。</p>
            `
        },
        'hallucigenia': {
            title: '怪诞虫 (Hallucigenia)',
            content: `
                <div style="text-align: center; margin-bottom: 1rem;">
                    <div style="font-size: 4rem;">🪱</div>
                </div>
                <h3>最奇异的寒武纪生物</h3>
                <p>怪诞虫因其奇特的外形而得名，长期以来困扰着古生物学家。</p>
                <h4>独特特征：</h4>
                <ul>
                    <li><strong>防御棘刺：</strong>背部长满尖锐的防御棘刺</li>
                    <li><strong>管足结构：</strong>腹部具有成对的管足用于行走</li>
                    <li><strong>头部谜团：</strong>头尾难以区分，曾引起激烈争论</li>
                    <li><strong>小型身躯：</strong>体长仅约5厘米</li>
                </ul>
                <h4>生活方式：</h4>
                <p>可能在海底缓慢爬行，以海底的有机物碎屑为食。</p>
                <h4>分类地位：</h4>
                <p>现被认为是有爪动物门的早期代表，与现代的天鹅绒虫有亲缘关系。</p>
            `
        },
        'wiwaxia': {
            title: '威瓦西亚虫 (Wiwaxia)',
            content: `
                <div style="text-align: center; margin-bottom: 1rem;">
                    <div style="font-size: 4rem;">🐚</div>
                </div>
                <h3>身覆鳞片的神秘生物</h3>
                <p>威瓦西亚虫是一种身体覆盖鳞片和棘刺的软体动物，具有独特的防御结构。</p>
                <h4>形态特征：</h4>
                <ul>
                    <li><strong>鳞片覆盖：</strong>全身覆盖重叠的鳞片</li>
                    <li><strong>背部棘刺：</strong>背部具有两排长棘刺</li>
                    <li><strong>椭圆形身体：</strong>身体呈椭圆形，长约5-7厘米</li>
                    <li><strong>腹足运动：</strong>依靠腹足在海底爬行</li>
                </ul>
                <h4>生态习性：</h4>
                <p>生活在海底，可能以藻类和有机碎屑为食，鳞片和棘刺提供有效防护。</p>
                <h4>系统分类：</h4>
                <p>分类地位长期存在争议，现多认为属于软体动物门或其姊妹群。</p>
            `
        }
    };
    
    showModal(creatures[creature].title, creatures[creature].content);
}

// 地球模型动画
function animateEarth() {
    const earth = document.getElementById('earthModel');
    const continents = document.querySelectorAll('.continent');
    
    earth.style.animation = 'none';
    earth.offsetHeight; // 触发重排
    earth.style.animation = 'rotate 20s infinite linear';
    
    continents.forEach((continent, index) => {
        continent.style.transform = `rotate(${index * 120}deg) translateX(80px) rotate(-${index * 120}deg)`;
        continent.style.transition = 'transform 2s ease-in-out';
    });
    
    showNotification('观察大陆如何在超大陆潘诺西亚分裂过程中漂移！');
}

// 显示海平面变化
function showOceanLevels() {
    const earth = document.getElementById('earthModel');
    const originalBg = earth.style.background;
    
    // 模拟海平面上升
    earth.style.background = 'radial-gradient(circle at 30% 30%, #87CEEB, #4682B4)';
    earth.style.transform = 'scale(1.1)';
    earth.style.transition = 'all 1.5s ease';
    
    setTimeout(() => {
        earth.style.background = originalBg;
        earth.style.transform = 'scale(1)';
    }, 3000);
    
    showNotification('寒武纪海平面比现在高出约200米，大部分陆地被浅海覆盖！');
}

// 显示气候条件
function showClimate() {
    const earth = document.getElementById('earthModel');
    
    // 添加温暖气候效果
    earth.style.boxShadow = '0 0 50px rgba(255, 215, 0, 0.6)';
    earth.style.transition = 'box-shadow 1s ease';
    
    setTimeout(() => {
        earth.style.boxShadow = 'none';
    }, 3000);
    
    showNotification('寒武纪气候温暖湿润，全球平均温度比现在高7-9°C，无极地冰盖！');
}

// 显示模态框
function showModal(title, content) {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    
    modalBody.innerHTML = `<h2>${title}</h2>${content}`;
    modal.style.display = 'block';
    
    // 点击模态框外部关闭
    modal.onclick = function(event) {
        if (event.target === modal) {
            closeModal();
        }
    };
}

// 关闭模态框
function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}

// 显示通知
function showNotification(message) {
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: rgba(52, 152, 219, 0.95);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        z-index: 3000;
        max-width: 300px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        animation: slideInRight 0.5s ease;
    `;
    
    document.body.appendChild(notification);
    
    // 3秒后自动移除
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 3000);
}

// 添加键盘事件监听
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// 添加滚动事件监听，实现导航栏背景变化
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.9)';
    }
});

// 添加生物卡片点击动画
document.querySelectorAll('.creature-card').forEach(card => {
    card.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    });
});

// 添加时间轴项目悬停效果
document.querySelectorAll('.timeline-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.querySelector('.timeline-marker').style.transform = 'scale(1.5)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.querySelector('.timeline-marker').style.transform = 'scale(1)';
    });
});

// 添加CSS动画样式到文档中
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .timeline-marker {
        transition: transform 0.3s ease;
    }
    
    .creature-card {
        transition: transform 0.15s ease;
    }
`;
document.head.appendChild(additionalStyles);
