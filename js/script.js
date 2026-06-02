// 年度に対応した試験日程を選択肢にする
const createCategory = () => {

    // ２０２３年春以前の試験日程
    const fourExam = `
            <option value="am1">午前Ⅰ</option>
            <option value="am2">午前Ⅱ</option>
            <option value="pm1">午後Ⅰ</option>
            <option value="pm2">午後Ⅱ</option>
    `;

    // ２０２３年秋以降の試験日程
    const threeExam = `
            <option value="am1">午前Ⅰ</option>
            <option value="am2">午前Ⅱ</option>
            <option value="pm">午後</option>
    `;

    if (Number(year.value) < 2023) {
        schedule.innerHTML = fourExam;
    } else if (Number(year.value) === 2023) {
        if (season.value === 'h') {
            schedule.innerHTML = fourExam;
        } else {
            schedule.innerHTML = threeExam;
        }
    } else {
        schedule.innerHTML = threeExam;
    }
};

year.addEventListener('change', createCategory);

season.addEventListener('change', createCategory);

// コンテンツ切り替え
// 指定されたidのセクションのみ表示する
const switchPage = (pid) => {
    const sections = document.getElementsByTagName('section');

    for (let sect of sections) {
        if (sect.id === pid) {
            sect.className = 'disp';
        } else {
            sect.className = 'hide';
        }
    }
};



// 試験問題のページへ移動
const switchExamPage = () => {
    // 選択されている試験の年度、季節、区分を取得
    const Lists = document.querySelectorAll('#menu select');
    const [yList, sList, tList] = [
        Lists[0],
        Lists[1],
        Lists[2]
    ];
    // 選択されている試験の文字列を取得
    const [ystr, sstr, tstr] = [
        yList[yList.selectedIndex].text,
        sList[sList.selectedIndex].text,
        tList[tList.selectedIndex].text
    ];
    // 選択されている試験の表示位置を取得
    const [yval, sval, tval] = [
        yList[yList.selectedIndex].value,
        sList[sList.selectedIndex].value,
        tList[tList.selectedIndex].value
    ];

    const template = document.getElementById('exam-tamplate');
    const clone = template.content.cloneNode(true);
    const container = document.getElementById('exam-container');

    console.log(ystr);

    document.title = `${ystr}　${sstr}期　${tstr}　問題`;
    clone.querySelector('h2').textContent = `${ystr}　${sstr}期　${tstr}　問題`;
    const nextbtn = clone.querySelector('.next');
    const prevbtn = clone.querySelector('.prev');

    if (tval === "am1" | tval === "am2") {
        const chgAmQs = createAmQs(clone, `${yval}/${sval}/${tval}`);
        nextbtn.addEventListener('click', chgAmQs.nextAmQs);
        prevbtn.addEventListener('click', chgAmQs.prevAmQs);
    } else {
        const chgPmQs = createPmQs(clone, `${yval}/${sval}/${tval}`);
        nextbtn.addEventListener('click', chgPmQs.nextPmQs);
        prevbtn.addEventListener('click', chgPmQs.prevPmQs);
    }
    container.appendChild(clone);

    switchPage("exam-container");

};

// 午前試験を生成
function createAmQs(cl, path) {
    const qsmax = new Map([
        ['am1', 30],
        ['am2', 25]
    ]);
    // const ans = new Map([
    //     ["2025/a/am1",
    //         ["", "イ", "イ", "イ", "エ", "イ", "エ", "ア", "イ", "ア", "ウ",
    //             "ア", "イ", "ウ", "ア", "ア", "イ", "エ", "エ", "ウ", "ア",
    //             "エ", "イ", "ア", "エ", "ウ", "イ", "イ", "イ", "イ", "ア"]
    //     ],
    //     ["2025/a/am2",
    //         ["", "ウ", "イ", "エ", "エ", "ア", "イ", "ア", "ア", "エ",
    //             "イ", "ア", "ア", "イ", "エ", "イ", "エ", "ア", "ア", "イ", "ウ", "エ",
    //             "イ", "ウ", "ウ", "エ"]
    //     ]
    // ]);
    import {ans} from './answers.js';

    let qsnum = 1;

    cl.querySelector('.question img').src = `${path}/images/q1.png`;
    cl.querySelector('.answer').innerHTML = `
                    <form name="answer">
                        <label><input type="radio" name="sel" value="ア">ア</label>
                        <label><input type="radio" name="sel" value="イ">イ</label>
                        <label><input type="radio" name="sel" value="ウ">ウ</label>
                        <label><input type="radio" name="sel" value="エ">エ</label>
                    </form>
`;
    // 解答を生成する
    function createAns(path, num) {
        const ans = document.getElementsByClassName('result');
        ans[0].innerHTML = `正解<br><embed src="${path}/images/a${num}.txt" type="text/plain" alt="解説なし">`;
    }

    // 回答の正誤をチェックする
    function chkResult() {
        const sel = `${year.value}/${season.value}/${schedule.value}`;
        const ret = document.answer.sel.value;

        console.log(ret);
        console.log(ans.get(sel)[qsnum]);
        if (ans.get(sel)[qsnum] === ret) {
            createAns(sel, qsnum);
        }
    }

    cl.querySelector('.answer').addEventListener('change', (event) => {
        // 変更された要素が name="sel" のラジオボタンか確認
        if (event.target && event.target.name === 'sel') {
            chkResult(); // 実行したい関数を呼び出す
        }
    });

    // 問題と解答を消去する
    function clearAmQs() {

        for (let i = 0; i < document.answer.sel.length; i++) {
            document.answer.sel[i].checked = false;
        }

        const res = document.getElementsByClassName('result');
        res[0].innerHTML = "";
    }

    return {
        nextAmQs: function () {
            console.log(arguments.callee.name);
            const tval = schedule.value;
            const qs = document.querySelector('.question img');

            clearAmQs();

            qsnum++;

            /* 問題はトグルさせる */
            if (qsnum > qsmax.get(tval)) qsnum = 1;
            qs.src = qs.src.replace(/[^/]+$/, `q${qsnum}.png`);

        },
        prevAmQs: function () {
            console.log(arguments.callee.name);

            const tval = schedule.value;
            const qs = document.querySelector('.question img');

            clearAmQs();

            qsnum--;

            /* 問題はトグルさせる */
            if (qsnum < 1) qsnum = qsmax.get(tval);
            qs.src = qs.src.replace(/[^/]+$/, `q${qsnum}.png`);
        }
    };

}

// 午後試験を生成
const createPmQs = (cl, path) => {
    const qsInfo = [
        { qsCnt: 6, ansCnt: 1 },
        { qsCnt: 7, ansCnt: 1 },
        { qsCnt: 11, ansCnt: 1 },
        { qsCnt: 10, ansCnt: 1 }
    ];

    let cnt = 0;

    const qsElement = cl.querySelector('.question');
    qsElement.innerHTML = "";
    for (let i = 0; i < qsInfo[cnt].qsCnt; i++) {
        qsElement.innerHTML += `<img src="${path}/images/${cnt + 1}/${i + 1}.png" alt="">`;
    }
    const res = cl.querySelector('.result');
    res.innerHTML = "";
    for (let i = 0; i < qsInfo[cnt].ansCnt; i++) {
        res.innerHTML += `<img src="${path}/images/${cnt + 1}/a${i + 1}.png" alt="">`;
    }

    // 問題を生成する
    function createQs() {
        qsElement.innerHTML = "";
        for (let i = 0; i < qsInfo[cnt].qsCnt; i++) {
            qsElement.innerHTML += `<img src="${path}/images/${cnt + 1}/${i + 1}.png" alt="">`;
        }
        res.innerHTML = "";
        for (let i = 0; i < qsInfo[cnt].ansCnt; i++) {
            res.innerHTML += `<img src="${path}/images/${cnt + 1}/a${i + 1}.png" alt="">`;
        }
    }

    return {
        nextPmQs: function () {
            console.log(arguments.callee.name);
            cnt++;
            if (cnt > (qsInfo.length - 1)) cnt = 0;
            createQs();
        },
        prevPmQs: function () {
            console.log(arguments.callee.name);
            cnt--;
            if (cnt < 0) cnt = qsInfo.length - 1;
            createQs();
        }
    };
};
