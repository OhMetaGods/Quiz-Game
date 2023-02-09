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
        question: "以下哪一個不是元天神賦能?",
        choice1: "祈福點燈",
        choice2: "福地回饋",
        choice3: "超跑租賃折扣",
        choice4: "禮儀服務",
        answer: 3,
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
        question: "Azuki 項目採用哪種新的智能合約，讓 NFT 可以大量鑄造卻只消耗一次 Gas Fee?",
        choice1: "ERC721A",
        choice2: "ERC155",
        choice3: "ERC1155",
        choice4: "ERC721",
        answer: 1,
    },
    {
        question: "元天神的主要核心目的是以哪個領域為發展?",
        choice1: "殯葬業",
        choice2: "科技業",
        choice3: "娛樂業",
        choice4: "信仰宗教",
        answer: 4,
    },
    {
        question: "關於冷錢包和熱錢包，下列哪一個是錯的?",
        choice1: "冷錢包就像隨身碟，是不需要網路連線的錢包",
        choice2: "冷錢包只能保護資產，無法連結交易所進行交易",
        choice3: "熱錢包需要連結網路才能使用，且風險比冷錢包大",
        choice4: "熱錢包的資產只能透過多重加密的方式保護",
        answer: 2,
    },
    {
        question: "關於加密貨幣 Vechain 的介紹，下列哪一個是對的?",
        choice1: "Vechain 是解決網路安全問題而產生的加密貨幣",
        choice2: "Vechain 的母公司在中國北京",
        choice3: "Vechain 透過區塊鏈技術來解決物流和資訊記錄的問題",
        choice4: "Vechain 曾被中國禁止發展，後來到海外和 Verasity 聯合合作",
        answer: 3,
    },
    {
        question: "關於 NFT 的資訊，下列哪一個是對的?",
        choice1: "NFT 目前技術還不成熟，但已經開始有很多現實層面的應用",
        choice2: "NFT 的形式除了藝術品以外，也可以作為數位會員卡、證書或資產權狀等功能",
        choice3: "NFT 不僅讓藝術家可以獲得版權，也可以獲得交易平台的抽成作為收入",
        choice4: "NFT 不能被分割，且每一個 NFT 都有自己專屬的代碼，是獨一無二的",
        answer: 2,
    },
    {
        question: "關於 NFT 的資訊，下列哪一個是錯的?",
        choice1: "NFT 充滿許多詐騙，所以資產放在熱錢包是最安全的方式",
        choice2: "NFT 目前還無法用租借的方式取得，技術上還沒被突破",
        choice3: "NFT 和加密貨幣的性質相同，都是數位代幣的一種",
        choice4: "NFT 可以透過分割的形式，來進行資產的分潤，類似股權分配",
        answer: 4,
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
        question: "關於 NASA 2021 年的成就，下列哪個是對的?",
        choice1: "發射露西號升空，並且成為歷史上首次探索木星特洛伊小行星的飛行器",
        choice2: "毅力號於火星上鑽孔取樣，發現新型元素",
        choice3: "與 SpaceX 合作，完成太空旅遊任務，第一次送 5 位非太空員上太空",
        choice4: "韋伯望遠鏡發現類似太陽系結構的星系",
        answer: 1,
    },
    {
        question: "為什麼煮焦糖的時候不能攪拌?",
        choice1: "焦糖會結晶化，產生一粒一粒的塊狀",
        choice2: "攪拌會讓焦糖變更苦",
        choice3: "糖會無法順利融化",
        choice4: "甜度會大幅提升",
        answer: 1,
    },
    {
        question: "關於火烈鳥這個動物，下面哪個是對的?",
        choice1: "原本是白色的，但吃蝦子逐漸變成紅色的",
        choice2: "體內組織佔比最高的是角黃素",
        choice3: "紅色的外觀是因為體內會分泌天然色素的類胡蘿蔔素",
        choice4: "蝦青素只有在非洲紅鶴發現",
        answer: 2,
    },
    {
        question: "動物知識下面哪一個是對的?",
        choice1: "企鵝性慾很強，但不會和近親發生關係",
        choice2: "無尾熊的游泳時速可以高達 60 公里",
        choice3: "大象會舉辦葬禮，而且是由公象來主持",
        choice4: "黑天鵝這個物種有 25% 是同性戀",
        answer: 4,
    },
    {
        question: "什麼是鱷魚效應?",
        choice1: "形容一個人被欺騙之後，還是選擇相信對方",
        choice2: "形容一個人的悲傷情緒都是在說謊",
        choice3: "形容一個人陷入困境的時候，越想掙脫，受的傷害越大",
        choice4: "形容一個人陷入困境的時候，往往會欺騙自己",
        answer: 3,
    },
    {
        question: "下面哪一句話可以形容巴納姆效應?",
        choice1: "你是一個有責任心的人，雖然有時候會想放棄，但還是會堅持",
        choice2: "吊橋就像戀愛關係，如果一邊沒有穩固好，另一邊就會無法支撐",
        choice3: "你的人生要由自己去定義",
        choice4: "在哪跌倒就在哪躺下",
        answer: 1,
    },
    {
        question: "下列哪個藝術家是以「點點」為創作核心?",
        choice1: "艾密利·卡爾",
        choice2: "草間彌生",
        choice3: "森山大道",
        choice4: "湯瑪斯·舒特",
        answer: 2,
    },
    {
        question: "下列哪個哲學家有仇女心理?",
        choice1: "魏寧格",
        choice2: "叔本華",
        choice3: "黑格爾",
        choice4: "尼采",
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
        question: "有關迪士尼動畫故事的原型，下列何者正確?",
        choice1: "白雪公主的結局其實是被王子姦殺，小矮人是幫兇",
        choice2: "小飛俠的原著中，彼得潘會殺死在永無島長大的孩子",
        choice3: "阿拉丁其實是拿到詛咒的神燈，然後被分屍在沙漠中",
        choice4: "灰姑娘其實甘願被繼母控制，私底下和農莊的男人亂倫",
        answer: 2,
    },
    {
        question: "下列哪種液體可以代替生理食鹽水，作為點滴液?",
        choice1: "可樂",
        choice2: "氣泡水",
        choice3: "西瓜汁",
        choice4: "椰子水",
        answer: 4,
    },
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 20

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore',score)

        return window.location.assign('./end.html')
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
