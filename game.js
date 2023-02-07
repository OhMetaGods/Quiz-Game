const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");

let currentQuestion = {}
let acceptingAnswer = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: "日本首都在哪?",
        choice1: "日本憲法沒有訂立首都",
        choice2: "東京",
        choice3: "京都",
        choice4: "以天皇留有的歷史建築位置為主",
        answer: 1,
    },
    {
        question: "近年來科學家發現狗可以聞出人類有什麼疾病?",
        choice1: "阿茲海默症",
        choice2: "癌症",
        choice3: "慢性病",
        choice4: "帕金森氏症",
        answer: 2,
    },
    {
        question: "法律面前人人平等，這個概念最早起源於?",
        choice1: "禮記‧曲禮",
        choice2: "雅典人伯里克利",
        choice3: "法國人權宣言",
        choice4: "波斯人歐塔涅斯",
        answer: 4,
    },
    {
        question: "人類的五感中，哪個部位感覺反應最快?",
        choice1: "嗅覺",
        choice2: "視覺",
        choice3: "味覺",
        choice4: "聽覺",
        answer: 3,
    },
    {
        question: "下列哪種物品在美國的監獄裡面被當成貨幣使用?",
        choice1: "菸",
        choice2: "泡麵",
        choice3: "紙",
        choice4: "牛奶",
        answer: 2,
    },
    {
        question: "世界最早的銀行起源於哪裡?",
        choice1: "波蘭",
        choice2: "瑞士",
        choice3: "義大利",
        choice4: "日本",
        answer: 3,
    },
    {
        question: "促進人體腸胃吸收鈣的重要物質是?",
        choice1: "維生素D",
        choice2: "維生素C",
        choice3: "維生素B",
        choice4: "維生素A",
        answer: 1,
    },
    {
        question: "企鵝產卵的季節一般是?",
        choice1: "春季",
        choice2: "夏季",
        choice3: "秋季",
        choice4: "冬季",
        answer: 3,
    },
    {
        question: "有 小提琴之王 之稱的的作曲家是?",
        choice1: "貝多芬",
        choice2: "巴哈",
        choice3: "莫札特",
        choice4: "帕格尼尼",
        answer: 4,
    },
    {
        question: "避雷針的發明者是?",
        choice1: "富蘭克林",
        choice2: "愛迪生",
        choice3: "伏打",
        choice4: "莫爾斯",
        answer: 1,
    },
    {
        question: "牛奶巧克力最先出現於哪個國家?",
        choice1: "西班牙",
        choice2: "瑞士",
        choice3: "英國",
        choice4: "芬蘭",
        answer: 2,
    },
    {
        question: "從抹香鯨體內提煉出來的香料是?",
        choice1: "抹香",
        choice2: "沉水香",
        choice3: "麝香",
        choice4: "龍涎香",
        answer: 4,
    },
    {
        question: "人們最早是從哪個動物身上得知咖啡的作用?",
        choice1: "豬",
        choice2: "馬",
        choice3: "羊",
        choice4: "牛",
        answer: 3,
    },
    {
        question: "穿什麼顏色的衣服容易被蚊子叮?",
        choice1: "黑色",
        choice2: "白色",
        choice3: "淡黃色",
        choice4: "深藍色",
        answer: 1,
    },
    {
        question: "世界上哪個國家有 黃金海岸 之稱?",
        choice1: "西班牙",
        choice2: "迦納",
        choice3: "祕魯",
        choice4: "夏威夷",
        answer: 2,
    },
    {
        question: "提出著名的韋達公式的數學家韋達，是哪國人?",
        choice1: "英國",
        choice2: "法國",
        choice3: "德國",
        choice4: "俄國",
        answer: 2,
    },
    {
        question: "哪個城市有 世界花都 的稱號?",
        choice1: "巴比倫",
        choice2: "布拉格",
        choice3: "巴黎",
        choice4: "溫哥華",
        answer: 3,
    },
    {
        question: "請問 禪 是哪一種宗教的概念?",
        choice1: "道教",
        choice2: "佛教",
        choice3: "印度教",
        choice4: "猶太教",
        answer: 2,
    },
    {
        question: "下列哪座山為世界死亡之峰之首?",
        choice1: "埃佛勒斯",
        choice2: "安納布爾納峰",
        choice3: "K2",
        choice4: "南迦帕爾巴特峰",
        answer: 2,
    },
    {
        question: "於1932年舉行世界上第一個影展的城市是?",
        choice1: "莫斯科",
        choice2: "柏林",
        choice3: "威尼斯",
        choice4: "坎城",
        answer: 3,
    },
    {
        question: "哪一種化學元素的名字，是來自躲在地底下的小矮人?",
        choice1: "鈷 cobalt",
        choice2: "碲 Tellurium",
        choice3: "鉿 Hafnium",
        choice4: "鈹 Beryllium",
        answer: 1,
    },
    {
        question: "在古希臘，女人不可以參加奧林匹克，除了某個項目以外。請問是哪個項目?",
        choice1: "射箭",
        choice2: "戰車賽馬",
        choice3: "游泳",
        choice4: "賽跑",
        answer: 2,
    },
    {
        question: "關於瘦肉精的敘述，下列何者正確?",
        choice1: "最常使用的為萊克多巴胺，為甲型腎上腺素受器的作用劑",
        choice2: "分為1型和2型受器，其中1型廣泛存在於體內",
        choice3: "萊克多巴胺受1型受器影響大於2型",
        choice4: "1型受器活化後可當作氣喘藥物",
        answer: 3,
    },
    {
        question: "大象不會得癌症的主要原因為何?",
        choice1: "TP53基因所產生的P53蛋白可以促進DNA修復，並誘導異常細胞自殺",
        choice2: "體內產生的特殊蛋白酶會抑制癌細胞增生",
        choice3: "P53蛋白合成後活化LIF6基因",
        choice4: "席夫曼團隊的皮托悖論",
        answer: 3,
    },
    {
        question: "關於車諾比核災，下列何者正確?",
        choice1: "過舊的RBMK反應爐使能量超載，導致嚴重核洩漏",
        choice2: "蒸氣渦輪測試計畫的機組功率過高，使區域性用電供給超載",
        choice3: "人為疏失導致反應爐毒化，加上RBMK設計不良導致意外發生",
        choice4: "測試計畫的4號機輸出功率大於7000MW，使反應爐毒化並產生爆炸",
        answer: 3,
    },
    {
        question: "關於地震波的敘述，下列何者正確?",
        choice1: "P波比S波早到達，而S波較晚且破壞力較強",
        choice2: "S波呈水平運動，進行時會以上下或左右的方向震動",
        choice3: "表面波為地震波產生的波動，好發於地底或是斷層面，破壞力比S波強",
        choice4: "尾波是一種因地球內部的不均勻性、對地震波散射而產生的地震波，此波動數據難以被收集",
        answer: 1,
    },
    {
        question: "關於新冠肺炎和SARS的敘述，下列何者正確?",
        choice1: "新冠肺炎的和SARS的病源都源於蝙蝠",
        choice2: "新冠肺炎的病毒基因序列屬於RNA種，序列排序上易突變",
        choice3: "SARS的R0值大於新冠肺炎，因為DNA病毒型不易突變",
        choice4: "新冠肺炎的病毒型態演化較一般的RNA型脆弱",
        answer: 2,
    },
    {
        question: "關於麝香貓咖啡的敘述，下列何者正確?",
        choice1: "源自於東南亞的特有種白香貓，在當地屬於有害動物",
        choice2: "麝香貓咖啡其實會於特殊貓種的消化系統中，將咖啡好的酸值和風味去除掉",
        choice3: "此咖啡最先起源於象糞咖啡，透過大象體內獨有的酶反應產出絕佳風味",
        choice4: "在越南非常盛行",
        answer: 2,
    },
    {
        question: "有關宮崎駿動畫作品的敘述，下列何者正確?",
        choice1: "宮崎駿很早就開始計畫要製作動畫 風起",
        choice2: "波妞曾因為311大地震的原因遭到日本多個電視台禁播兩個季度",
        choice3: "黑貓宅急便在魔女宅急便的製作初期就有投資贊助",
        choice4: "霍爾的第一次獻給了蘇菲",
        answer: 3,
    },
    {
        question: "有關迪士尼動畫故事的原型，下列何者正確?",
        choice1: "白雪公主的結局其實是被王子姦殺，小矮人是幫兇",
        choice2: "小飛俠的原著中，彼得潘會殺死在永無島長大的孩子",
        choice3: "阿拉丁其實是拿到詛咒的神燈，然後被分屍在沙漠中",
        choice4: "灰姑娘其實甘願被繼母控制，私底下和農莊的男人亂倫",
        answer: 2,
    },
    {
        question: "微軟創辦人是?",
        choice1: "比爾·蓋茲",
        choice2: "李斯·凱特",
        choice3: "鮑勃·大衛",
        choice4: "海倫·凱勒",
        answer: 1,
    },
    {
        question: "歷史紀錄以來，侵襲台灣最強的颱風名稱是?",
        choice1: "蘇迪勒",
        choice2: "提姆",
        choice3: "賀伯",
        choice4: "韋恩",
        answer: 3,
    },
    {
        question: "下列哪種液體可以代替生理食鹽水，作為點滴液?",
        choice1: "可樂",
        choice2: "氣泡水",
        choice3: "西瓜汁",
        choice4: "椰子水",
        answer: 4,
    },
    {
        question: "在18世紀的倫敦動物園門票，可以用什麼來交換?",
        choice1: "小孩",
        choice2: "貓狗",
        choice3: "大石頭",
        choice4: "衣服",
        answer: 2,
    },
    {
        question: "在台灣夜市常看到轉轉棉花糖，請問是誰發明的?",
        choice1: "急診醫生史密斯",
        choice2: "艾倫．狄爾",
        choice3: "依麗莎白．布萊克威爾",
        choice4: "美國牙醫威廉·莫里斯",
        answer: 4,
    },
    {
        question: "人類在發生哪個事件後，才將行李箱裝上輪子?",
        choice1: "第一次世界大戰",
        choice2: "滑鐵盧戰役",
        choice3: "成功登入月球後",
        choice4: "英法戰爭結束後",
        answer: 3,
    },
    {
        question: "吃燒烤的時候，在食用前滴上什麼可以達到解毒的作用?",
        choice1: "鹽巴水",
        choice2: "檸檬汁",
        choice3: "葡萄柚汁",
        choice4: "蘋果汁",
        answer: 2,
    },
    {
        question: "下列哪個動物的糞便是方形的?",
        choice1: "袋鼠",
        choice2: "袋狸",
        choice3: "馬來膜",
        choice4: "袋熊",
        answer: 4,
    },
    {
        question: "下列哪部作品是龍貓的前身?",
        choice1: "天空之城",
        choice2: "魔法公主",
        choice3: "風之谷",
        choice4: "貓的報恩",
        answer: 2,
    },
    {
        question: "如果灰塵跑進眼睛，怎麼做就可以讓眼睛裡的灰塵跑出來?",
        choice1: "閉上眼睛咳嗽",
        choice2: "閉上眼睛轉動眼球",
        choice3: "閉上眼睛搖頭",
        choice4: "閉上眼睛頭往下",
        answer: 1,
    },
    {
        question: "宮崎駿動畫裡面的霍爾，他的第一次獻給了誰?",
        choice1: "卡西法",
        choice2: "蘇菲",
        choice3: "莎莉曼夫人",
        choice4: "荒野女巫",
        answer: 4,
    },
    {
        question: "嗅覺疲勞的時候，什麼味道可以緩解?",
        choice1: "柚子皮",
        choice2: "咖啡渣",
        choice3: "檜木",
        choice4: "亞麻",
        answer: 2,
    },
    {
        question: "根據犯罪心理學的研究，為什麼反社會人格的殺人犯，在犯罪時會沒有悔意或自責感",
        choice1: "缺乏同理心基因",
        choice2: "先天具有反社會人格基因",
        choice3: "生活中缺少與人的羈絆",
        choice4: "童年時期遭受重大心理創傷",
        answer: 3,
    },
    {
        question: "在水裡倒入什麼可以除去臭味，還可以殺菌?",
        choice1: "醬油",
        choice2: "威猛先生",
        choice3: "白醋",
        choice4: "小蘇打粉",
        answer: 3,
    },
    {
        question: "利用什麼來洗手可以去除手上的魚腥味?",
        choice1: "豬油",
        choice2: "橘子水",
        choice3: "鹽水",
        choice4: "檸檬水",
        answer: 4,
    },
    {
        question: "把什麼東西放進食物櫃裡面，蟑螂就不敢靠近?",
        choice1: "香皂",
        choice2: "鮮黃瓜",
        choice3: "鹽巴加糖",
        choice4: "熊寶貝芳香袋",
        answer: 2,
    },
    {
        question: "什麼動物不敢自己睡覺?",
        choice1: "斑馬",
        choice2: "長頸鹿",
        choice3: "水牛",
        choice4: "蹬羚",
        answer: 1,
    },
    {
        question: "下列哪個食物不屬於抗性澱粉?",
        choice1: "香蕉",
        choice2: "玉米",
        choice3: "薏仁",
        choice4: "仙草",
        answer: 4,
    },
    {
        question: "炒菜時不小心加太多醬油，加入什麼食材可以中和味道?",
        choice1: "蜂蜜",
        choice2: "蘋果",
        choice3: "牛奶",
        choice4: "洋蔥",
        answer: 3,
    },
    {
        question: "地板清理不掉的陳年汙垢，用什麼可以清理乾淨?",
        choice1: "氣泡水",
        choice2: "牛奶",
        choice3: "白醋",
        choice4: "椰子水",
        answer: 1,
    },
    {
        question: "如何快速剝水煮蛋的殼?",
        choice1: "放入冷水裡",
        choice2: "滾一滾",
        choice3: "泡醋",
        choice4: "塗沙拉油",
        answer: 1,
    },
    {
        question: "法國的香水盛行是什麼原因導致的結果?",
        choice1: "鼠疫",
        choice2: "黑死病",
        choice3: "貴族文化",
        choice4: "封建制度",
        answer: 2,
    },
    {
        question: "牛排切開後流出的紅色液體是什麼?",
        choice1: "血",
        choice2: "肌紅蛋白",
        choice3: "鐵",
        choice4: "鈣",
        answer: 2,
    },
    {
        question: "阿拉伯數字是誰發明的?",
        choice1: "阿拉伯人",
        choice2: "波斯人",
        choice3: "印度人",
        choice4: "埃及人",
        answer: 3,
    },
    {
        question: "病毒疣現在最好的治療方式是什麼?",
        choice1: "雷射治療",
        choice2: "手術治療",
        choice3: "氧化治療",
        choice4: "冷凍治療",
        answer: 4,
    },
    {
        question: "哪個動物會產卵但卻是哺乳類動物?",
        choice1: "鴨嘴獸",
        choice2: "穿山甲",
        choice3: "澳洲刺蝟",
        choice4: "美洲袋鼬",
        answer: 1,
    },
    {
        question: "下列何者被法國人稱為民族英雄?",
        choice1: "拿破崙",
        choice2: "伊莉莎白二世",
        choice3: "貝查德爵士",
        choice4: "聖女貞德",
        answer: 4,
    },
    {
        question: "香蕉會是彎月形狀的原因為何?",
        choice1: "向光性",
        choice2: "基因",
        choice3: "種植方式",
        choice4: "營養不良",
        answer: 1,
    },
    {
        question: "那些不能殺死我的，都使我更堅強，這句話是出自於?",
        choice1: "黑格爾",
        choice2: "尼采",
        choice3: "孟德斯鳩",
        choice4: "邊沁",
        answer: 2,
    },
    {
        question: "NASA 2020 火星任務的執行機器名稱是?",
        choice1: "好奇號",
        choice2: "堅強號",
        choice3: "探險號",
        choice4: "毅力號",
        answer: 4,
    },
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 60

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore',score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' :
        'incorrect'

        if(classToApply === 'correct'){
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score 
}

startGame()
