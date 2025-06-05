// 题目数据
const quizData = [
    {
        question: "地球形成于约多少年前？",
        options: ["13.8亿年", "46亿年", " 5.4亿年", "1亿年"],
        correct: 1,
        score: 4
    },
    {
        question: "显生宙开始的标志是？",
        options: ["恐龙出现", "寒武纪生命大爆发", "大氧化事件", "大陆漂移"],
        correct: 1,
        score: 4
    },
    {
        question: "二叠纪末期大灭绝事件的主要原因可能是？",
        options: ["小行星撞击", "西伯利亚大规模火山喷发", "全球变冷", "氧气浓度骤降"],
        correct: 1,
        score: 4
    },
    {
        question: "恐龙灭绝发生在哪个地质时期之交？",
        options: ["三叠纪-侏罗纪", "侏罗纪-白垩纪", " 白垩纪-古近纪", "古近纪-新近纪"],
        correct: 2,
        score: 4
    },
    {
        question: "煤炭主要形成于哪个时期？",
        options: ["寒武纪", "石炭纪", "侏罗纪", "第四纪"],
        correct: 1,
        score: 4
    },
    {
        question: "盘古大陆（Pangaea）形成于哪个时期？",
        options: ["寒武纪", "泥盆纪", "二叠纪", "白垩纪"],
        correct: 2,
        score: 4
    },
    {
        question: "青藏高原隆升的主要动力是？",
        options: ["火山活动", "印度板块与欧亚板块碰撞", "地幔柱上涌", "冰川侵蚀"],
        correct: 1,
        score: 4
    },
    {
        question: "第四纪最显著的特征是？",
        options: ["恐龙繁盛", "多次冰期与间冰期交替", "海洋无氧事件", "超大陆裂解"],
        correct: 1,
        score: 4
    },
    {
        question: "生命最早出现于哪个宙？",
        options: ["显生宙", "元古宙", "太古宙", "冥古宙"],
        correct: 1,
        score: 4
    },
    {
        question: "大氧化事件发生于哪个时期？",
        options: ["寒武纪", "二叠纪", "元古宙（24亿年前）", "新生代"],
        correct: 1,
        score: 4
    },
    {
        question: "侏罗纪的典型代表生物是？",
        options: ["三叶虫", "猛犸象", "巨型恐龙（如腕龙）", "原始鱼类"],
        correct: 2,
        score: 4
    },
    {
        question: "哪次灭绝事件导致三叶虫消失？",
        options: ["奥陶纪末大灭绝", "泥盆纪末大灭绝", "二叠纪末大灭绝", "三叠纪末大灭绝"],
        correct: 2,
        score: 4
    },
    {
        question: "金伯利岩筒中的钻石形成于？",
        options: ["地表沉积", "浅海环境", "地幔深处（>150公里）", "陨石撞击"],
        correct: 2,
        score: 4
    },
    {
        question: "地球历史上最大规模的火山喷发发生在？",
        options: ["西伯利亚暗色岩（二叠纪末）", "德干玄武岩（白垩纪末）", "黄石超级火山（新生代）", "冰岛裂谷（现代）"],
        correct: 0,
        score: 4
    },
    {
        question: "人类祖先最早出现的时期是？",
        options: ["白垩纪", "古近纪", "新近纪", "第四纪"],
        correct: 2,
        score: 4
    },
    {
        question: " 哪个时期被称为‘鱼类时代’？",
        options: ["寒武纪", "泥盆纪", "石炭纪", "三叠纪"],
        correct: 1,
        score: 4
    },
    {
        question: "白垩纪结束的标志性沉积物是？",
        options: ["煤炭层", "冰川漂砾", "铱异常粘土层", "红色砂岩"],
        correct: 2,
        score: 4
    },
    {
        question: " 哪一事件导致奥陶纪末生物大灭绝？",
        options: [" 火山喷发", "全球变暖", "冈瓦纳大陆冰川作用", "海洋酸化"],
        correct: 2,
        score: 4
    },
    {
        question: "现代板块构造运动开始于？",
        options: ["太古宙", "元古宙中期", "显生宙初", "中生代"],
        correct: 1,
        score: 4
    },
    {
        question: "马里亚纳海沟的形成机制是？",
        options: ["大陆碰撞", "海底扩张", "大洋板块俯冲", "地幔热柱"],
        correct: 2,
        score: 4
    },
    {
        question: "寒武纪之前的地质时代统称为？",
        options: ["元古代", "前寒武纪", "冥古代", "隐生宙"],
        correct: 1,
        score: 4
    },
    {
        question: "哪一时期大气氧气浓度接近现代水平？",
        options: ["太古宙末", "元古宙中期", "泥盆纪", "侏罗纪"],
        correct: 2,
        score: 4
    },
    {
        question: "石油主要形成于哪种地质环境？",
        options: ["浅海或湖泊沉积", "火山喷发区", "冰川作用区", "沙漠盆地"],
        correct: 0,
        score: 4
    },
    {
        question: "地球历史上最长的单一地质时期是？",
        options: ["寒武纪", "侏罗纪", "前寒武纪", "新生代"],
        correct: 2,
        score: 4
    },
    {
        question: "成冰纪最著名的全球性事件是？",
        options: ["超级火山喷发导致生物灭绝", "泛大陆（Rodinia）开始裂解", "“雪球地球”事件（全球冰川覆盖至赤道）", "氧气爆发引发真核生物辐射演化"],
        correct: 2,
        score: 4
    }
];

let userAnswers = {};
let isSubmitted = false;

// 初始化页面
document.addEventListener('DOMContentLoaded', function() {
    renderQuestions();
    updateScoreDisplay();
    
    document.getElementById('submit-btn').addEventListener('click', submitQuiz);
    document.getElementById('reset-btn').addEventListener('click', resetQuiz);
});

// 渲染题目
function renderQuestions() {
    const container = document.getElementById('questions-container');
    container.innerHTML = '';
    
    quizData.forEach((question, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question-block';
        questionDiv.id = `question-${index}`;
        
        questionDiv.innerHTML = `
            <div class="question-title">
                ${index + 1}. ${question.question}
            </div>
            <div class="question-score">
                分值: ${question.score}分
            </div>
            <div class="options">
                ${question.options.map((option, optIndex) => `
                    <div class="option" onclick="selectOption(${index}, ${optIndex})">
                        <input type="radio" name="question-${index}" value="${optIndex}" id="q${index}-opt${optIndex}">
                        <label for="q${index}-opt${optIndex}">${String.fromCharCode(65 + optIndex)}. ${option}</label>
                    </div>
                `).join('')}
            </div>
        `;
        
        container.appendChild(questionDiv);
    });
}

// 选择选项
function selectOption(questionIndex, optionIndex) {
    if (isSubmitted) return;
    
    // 清除同一题目的其他选项
    const questionDiv = document.getElementById(`question-${questionIndex}`);
    const options = questionDiv.querySelectorAll('.option');
    options.forEach(opt => opt.classList.remove('selected'));
    
    // 选中当前选项
    const selectedOption = options[optionIndex];
    selectedOption.classList.add('selected');
    
    // 选中单选框
    const radio = document.getElementById(`q${questionIndex}-opt${optionIndex}`);
    radio.checked = true;
    
    // 记录用户答案
    userAnswers[questionIndex] = optionIndex;
}

// 更新分数显示
function updateScoreDisplay() {
    const totalScore = quizData.reduce((sum, question) => sum + question.score, 0);
    document.getElementById('total-score').textContent = `总分: ${totalScore}`;
}

// 提交答题
function submitQuiz() {
    if (Object.keys(userAnswers).length < quizData.length) {
        alert('请完成所有题目后再提交！');
        return;
    }
    
    isSubmitted = true;
    
    let score = 0;
    const results = [];
    
    quizData.forEach((question, index) => {
        const userAnswer = userAnswers[index];
        const isCorrect = userAnswer === question.correct;
        
        if (isCorrect) {
            score += question.score;
        }
        
        results.push({
            questionIndex: index,
            question: question.question,
            userAnswer: userAnswer,
            correctAnswer: question.correct,
            isCorrect: isCorrect,
            score: question.score,
            options: question.options
        });
        
        // 更新题目显示
        updateQuestionDisplay(index, userAnswer, question.correct, isCorrect);
    });
    
    // 显示结果
    showResults(score, results);
    
    // 更新按钮
    document.getElementById('submit-btn').style.display = 'none';
    document.getElementById('reset-btn').style.display = 'inline-block';
    
    // 更新当前得分
    document.getElementById('current-score').textContent = `当前得分: ${score}`;
}

// 更新题目显示
function updateQuestionDisplay(questionIndex, userAnswer, correctAnswer, isCorrect) {
    const questionDiv = document.getElementById(`question-${questionIndex}`);
    const options = questionDiv.querySelectorAll('.option');
    
    options.forEach((option, optIndex) => {
        option.style.pointerEvents = 'none'; // 禁用点击
        
        if (optIndex === userAnswer) {
            // 用户选择的答案
            option.classList.add(isCorrect ? 'correct' : 'incorrect');
        }
        
        if (optIndex === correctAnswer && !isCorrect) {
            // 正确答案（当用户答错时显示）
            option.classList.add('correct-answer');
        }
    });
}

// 显示详细结果
function showResults(totalScore, results) {
    const resultContainer = document.getElementById('result-container');
    const finalScoreDiv = document.getElementById('final-score');
    const detailedResultsDiv = document.getElementById('detailed-results');
    
    const totalPossible = quizData.reduce((sum, q) => sum + q.score, 0);
    const percentage = Math.round((totalScore / totalPossible) * 100);
    
    finalScoreDiv.innerHTML = `
        <div style="color: ${percentage >= 60 ? '#28a745' : '#dc3545'};">
            您的得分: ${totalScore} / ${totalPossible} (${percentage}%)
        </div>
        <div style="margin-top: 10px; font-size: 1em;">
            ${percentage >= 90 ? '优秀！' : percentage >= 80 ? '良好！' : percentage >= 60 ? '及格！' : '需要加油！'}
        </div>
    `;
    
    detailedResultsDiv.innerHTML = results.map(result => `
        <div class="result-question">
            <h4>${result.questionIndex + 1}. ${result.question}</h4>
            <div class="result-option result-user-answer ${result.isCorrect ? 'result-correct' : 'result-incorrect'}">
                您的答案: ${String.fromCharCode(65 + result.userAnswer)}. ${result.options[result.userAnswer]}
                ${result.isCorrect ? '✓' : '✗'}
            </div>
            ${!result.isCorrect ? `
                <div class="result-option result-correct-answer">
                    正确答案: ${String.fromCharCode(65 + result.correctAnswer)}. ${result.options[result.correctAnswer]}
                </div>
            ` : ''}
            <div style="margin-top: 10px; font-weight: bold; color: ${result.isCorrect ? '#28a745' : '#dc3545'};">
                得分: ${result.isCorrect ? result.score : 0} / ${result.score}
            </div>
        </div>
    `).join('');
    
    resultContainer.style.display = 'block';
    resultContainer.scrollIntoView({ behavior: 'smooth' });
}

// 重新开始
function resetQuiz() {
    userAnswers = {};
    isSubmitted = false;
    
    // 重置题目显示
    const questions = document.querySelectorAll('.question-block');
    questions.forEach(question => {
        const options = question.querySelectorAll('.option');
        options.forEach(option => {
            option.classList.remove('selected', 'correct', 'incorrect', 'correct-answer');
            option.style.pointerEvents = 'auto';
        });
        
        const radios = question.querySelectorAll('input[type="radio"]');
        radios.forEach(radio => radio.checked = false);
    });
    
    // 重置按钮
    document.getElementById('submit-btn').style.display = 'inline-block';
    document.getElementById('reset-btn').style.display = 'none';
    
    // 隐藏结果
    document.getElementById('result-container').style.display = 'none';
    
    // 重置分数显示
    document.getElementById('current-score').textContent = '当前得分: 0';
    
    // 滚动到顶部
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
