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

    const year = document.getElementById('year');
    const season = document.getElementById('season');
    const schedule = document.getElementById('schedule');

    // 年別に試験日程を設定
    if (Number(year.value) === 2020) {
        season.innerHTML = `
                    <option value="a">秋</option>
        `;
    } else {
        season.innerHTML = `
                    <option value="a">秋</option>
                    <option value="h">春</option>
        `;
    }

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

    // 問題選択画面へ戻る機能追加
    const retBtn = clone.querySelector('.return');
    retBtn.addEventListener('click', () => {
        switchPage("menu");
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
    });

    container.appendChild(clone);

    switchPage("exam-container");

};

// 午前試験を生成
function createAmQs(cl, path) {
    const qsmax = new Map([
        ['am1', 30],
        ['am2', 25]
    ]);
    const ans = new Map([
        ["2025/a/am1",
            ["", "イ", "イ", "イ", "エ", "イ", "エ", "ア", "イ", "ア", "ウ",
                "ア", "イ", "ウ", "ア", "ア", "イ", "エ", "エ", "ウ", "ア",
                "エ", "イ", "ア", "エ", "ウ", "イ", "イ", "イ", "イ", "ア"]
        ],
        ["2025/a/am2",
            ["", "ウ", "イ", "エ", "エ", "ア", "イ", "ア", "ア", "エ",
                "イ", "ア", "ア", "イ", "エ", "イ", "エ", "ア", "ア", "イ", "ウ", "エ",
                "イ", "ウ", "ウ", "エ"]
        ],
        ["2025/h/am1",
            ["", "ア", "イ", "ウ", "ウ", "イ", "ウ", "ウ", "ウ", "イ", "ア",
                "イ", "ウ", "イ", "イ", "ウ", "ア", "イ", "イ", "エ", "イ",
                "ウ", "ウ", "イ", "エ", "イ", "ウ", "イ", "エ", "ウ", "イ"]
        ],
        ["2025/h/am2",
            ["", "ウ", "ア", "ウ", "エ", "ア", "イ", "エ", "ウ", "ウ", "エ",
                "ウ", "ウ", "ウ", "ア", "ア", "イ", "イ", "ア", "エ", "イ",
                "ウ", "エ", "イ", "ウ", "エ"]
        ],
        ["2024/a/am1",
            ["", "エ", "ウ", "イ", "イ", "エ", "エ", "ウ", "ウ", "エ", "ウ",
                "ウ", "ア", "ア", "ウ", "イ", "ア", "イ", "ウ", "エ", "エ",
                "ア", "ウ", "イ", "イ", "ア", "ウ", "ウ", "イ", "ウ", "ア"]
        ],
        ["2024/a/am2",
            ["", "ア", "イ", "イ", "エ", "ウ", "ア", "ア", "エ", "エ", "イ",
                "ア", "ア", "エ", "エ", "エ", "ア", "イ", "ア", "イ", "ア",
                "エ", "イ", "エ", "エ", "ウ"]
        ],
        ["2024/h/am1",
            ["", "エ", "エ", "エ", "ウ", "ウ", "イ", "ウ", "エ", "ア", "イ",
                "エ", "イ", "イ", "イ", "ア", "イ", "ウ", "ア", "ア", "エ",
                "ア", "ウ", "エ", "エ", "エ", "エ", "ア", "ア", "ウ", "ウ"]
        ],
        ["2024/h/am2",
            ["", "エ", "ア", "エ", "ア", "ア", "エ", "ウ", "エ", "エ", "ア",
                "イ", "エ", "エ", "エ", "エ", "ア", "ウ", "ア", "エ", "イ",
                "エ", "ア", "エ", "ウ", "ウ"]
        ],
        ["2023/a/am1",
            ["", "ア", "ア", "ウ", "ウ", "エ", "ア", "ア", "イ", "ア", "イ",
                "エ", "ウ", "ウ", "ア", "ア", "エ", "ア", "エ", "ア", "イ",
                "イ", "ウ", "イ", "エ", "エ", "イ", "ウ", "イ", "イ", "ア"]
        ],
        ["2023/a/am2",
            ["", "イ", "ア", "ウ", "ア", "ア", "エ", "ウ", "イ", "ウ", "イ",
                "エ", "イ", "エ", "イ", "エ", "イ", "イ", "エ", "エ", "ア",
                "ウ", "ウ", "ウ", "ウ", "ア"]
        ],
        ["2023/h/am1",
            ["", "ア", "ア", "ア", "イ", "イ", "エ", "イ", "ウ", "エ", "ウ",
                "イ", "ア", "イ", "エ", "エ", "ウ", "エ", "エ", "イ", "イ",
                "イ", "ア", "ア", "エ", "ア", "イ", "イ", "ウ", "ア", "エ"]
        ],
        ["2023/h/am2",
            ["", "ウ", "イ", "ア", "エ", "ウ", "イ", "ア", "エ", "イ", "ア",
                "ア", "エ", "ア", "エ", "ア", "イ", "エ", "イ", "イ", "ア",
                "ア", "エ", "ウ", "イ", "エ"]
        ],
        ["2022/a/am1",
            ["", "エ", "イ", "イ", "エ", "ウ", "イ", "ウ", "ア", "ウ", "イ",
                "ウ", "ウ", "イ", "イ", "ア", "ア", "ウ", "イ", "ウ", "イ",
                "エ", "ウ", "エ", "イ", "エ", "イ", "エ", "ウ", "ウ", "ウ"]
        ],
        ["2022/a/am2",
            ["", "ア", "エ", "ア", "イ", "ア", "ウ", "エ", "ア", "ア", "エ",
                "エ", "エ", "ア", "ウ", "ア", "ア", "イ", "エ", "エ", "エ",
                "ウ", "ア", "イ", "エ", "イ"]
        ],
        ["2022/h/am1",
            ["", "ア", "ア", "エ", "イ", "ウ", "イ", "ウ", "ウ", "ア", "イ",
                "エ", "ア", "エ", "ウ", "ウ", "イ", "ア", "エ", "ウ", "エ",
                "イ", "ア", "イ", "ウ", "ア", "ウ", "エ", "ウ", "イ", "エ"]
        ],
        ["2022/h/am2",
            ["", "イ", "エ", "イ", "ア", "イ", "エ", "エ", "イ", "イ", "ア",
                "イ", "ウ", "ア", "エ", "ウ", "イ", "イ", "ア", "ウ", "エ",
                "ウ", "ア", "イ", "ウ", "ウ"]
        ],
        ["2021/a/am1",
            ["", "エ", "ア", "ウ", "エ", "イ", "ア", "ア", "エ", "イ", "ア",
                "エ", "イ", "ア", "ア", "ア", "ア", "ア", "イ", "イ", "エ",
                "ウ", "イ", "ウ", "イ", "イ", "ア", "エ", "ア", "ア", "ア"]
        ],
        ["2021/a/am2",
            ["", "イ", "イ", "イ", "ア", "ウ", "ウ", "ア", "エ", "ア", "ウ",
                "ア", "エ", "ウ", "ア", "エ", "ウ", "エ", "エ", "ア", "ア",
                "ウ", "ウ", "ア", "ウ", "ウ"]
        ],
        ["2021/h/am1",
            ["", "ア", "ウ", "ウ", "イ", "エ", "エ", "エ", "ウ", "エ", "ウ",
                "エ", "ア", "ア", "ウ", "イ", "ア", "ア", "ア", "ア", "エ",
                "ア", "ウ", "ウ", "ア", "ウ", "ウ", "イ", "ウ", "イ", "イ"]
        ],
        ["2021/h/am2",
            ["", "イ", "ウ", "エ", "ア", "ア", "エ", "ア", "ウ", "エ", "エ",
                "エ", "ア", "エ", "イ", "ア", "イ", "ア", "ウ", "エ", "ウ",
                "エ", "ア", "エ", "エ", "ア"]
        ],
        ["2020/a/am1",
            ["", "ウ", "ウ", "ウ", "エ", "イ", "ア", "ウ", "ウ", "ウ", "エ",
                "ウ", "ア", "イ", "イ", "イ", "ア", "ウ", "ア", "ウ", "ウ",
                "ウ", "ア", "エ", "エ", "ア", "ウ", "エ", "ウ", "イ", "イ"]
        ],
        ["2020/a/am2",
            ["", "イ", "エ", "ア", "ア", "エ", "イ", "イ", "ア", "エ", "イ",
                "ウ", "ウ", "エ", "イ", "ア", "ウ", "ウ", "エ", "エ", "エ",
                "エ", "エ", "イ", "ウ", "エ"]
        ],
        ["2019/a/am1",
            ["", "ア", "イ", "ウ", "エ", "イ", "ウ", "イ", "ウ", "エ", "ア",
                "ウ", "エ", "エ", "ウ", "ウ", "ア", "エ", "ウ", "ウ", "エ",
                "ウ", "ア", "エ", "イ", "エ", "ア", "ウ", "ア", "ア", "エ"]
        ],
        ["2020/a/am2",
            ["", "イ", "イ", "ウ", "ア", "ウ", "エ", "イ", "ウ", "ア", "ア",
                "ウ", "ア", "イ", "エ", "ア", "ウ", "エ", "エ", "ア", "ウ",
                "ウ", "エ", "エ", "ウ", "エ"]
        ]
    ]);

    let qsnum = 1;

    cl.querySelector('.question img').src = `${path}/images/1.png`;
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
        const ret = document.getElementsByClassName('result');
        ret[0].innerHTML = `正解<br><embed src="${path}/images/a${num}.txt" type="text/plain" alt="解説なし">`;
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
            qs.src = qs.src.replace(/[^/]+$/, `${qsnum}.png`);

        },
        prevAmQs: function () {
            console.log(arguments.callee.name);

            const tval = schedule.value;
            const qs = document.querySelector('.question img');

            clearAmQs();

            qsnum--;

            /* 問題はトグルさせる */
            if (qsnum < 1) qsnum = qsmax.get(tval);
            qs.src = qs.src.replace(/[^/]+$/, `${qsnum}.png`);
        }
    };

}

// 午後試験を生成
const createPmQs = (cl, path) => {
    const qsInfos = new Map([
        ["2025/a/pm",
            [
                { qsCnt: 6, ansCnt: 1 },
                { qsCnt: 7, ansCnt: 1 },
                { qsCnt: 11, ansCnt: 1 },
                { qsCnt: 10, ansCnt: 1 }
            ]
        ],
        ["2025/h/pm",
            [
                { qsCnt: 8, ansCnt: 2 },
                { qsCnt: 10, ansCnt: 2 },
                { qsCnt: 9, ansCnt: 2 },
                { qsCnt: 9, ansCnt: 2 }
            ]
        ],
        ["2024/a/pm",
            [
                { qsCnt: 10, ansCnt: 2 },
                { qsCnt: 10, ansCnt: 2 },
                { qsCnt: 8, ansCnt: 2 },
                { qsCnt: 10, ansCnt: 2 }
            ]
        ],
        ["2024/h/pm",
            [
                { qsCnt: 10, ansCnt: 2 },
                { qsCnt: 9, ansCnt: 2 },
                { qsCnt: 9, ansCnt: 2 },
                { qsCnt: 11, ansCnt: 2 }
            ]
        ],
        ["2023/a/pm",
            [
                { qsCnt: 5, ansCnt: 2 },
                { qsCnt: 9, ansCnt: 2 },
                { qsCnt: 7, ansCnt: 2 },
                { qsCnt: 9, ansCnt: 3 }
            ]
        ],
        ["2023/h/pm1",
            [
                { qsCnt: 6, ansCnt: 2 },
                { qsCnt: 5, ansCnt: 2 },
                { qsCnt: 6, ansCnt: 2 }
            ]
        ],
        ["2023/h/pm2",
            [
                { qsCnt: 11, ansCnt: 3 },
                { qsCnt: 12, ansCnt: 3 }
            ]
        ],
        ["2022/a/pm1",
            [
                { qsCnt: 6, ansCnt: 2 },
                { qsCnt: 6, ansCnt: 2 },
                { qsCnt: 6, ansCnt: 2 }
            ]
        ],
        ["2022/a/pm2",
            [
                { qsCnt: 11, ansCnt: 2 },
                { qsCnt: 13, ansCnt: 2 }
            ]
        ],
        ["2022/h/pm1",
            [
                { qsCnt: 6, ansCnt: 2 },
                { qsCnt: 6, ansCnt: 2 },
                { qsCnt: 5, ansCnt: 2 }
            ]
        ],
        ["2022/h/pm2",
            [
                { qsCnt: 11, ansCnt: 2 },
                { qsCnt: 14, ansCnt: 2 }
            ]
        ],
        ["2021/a/pm1",
            [
                { qsCnt: 6, ansCnt: 2 },
                { qsCnt: 7, ansCnt: 2 },
                { qsCnt: 6, ansCnt: 2 }
            ]
        ],
        ["2021/a/pm2",
            [
                { qsCnt: 12, ansCnt: 2 },
                { qsCnt: 12, ansCnt: 2 }
            ]
        ],
        ["2021/h/pm1",
            [
                { qsCnt: 5, ansCnt: 2 },
                { qsCnt: 6, ansCnt: 2 },
                { qsCnt: 5, ansCnt: 2 }
            ]
        ],
        ["2021/h/pm2",
            [
                { qsCnt: 12, ansCnt: 2 },
                { qsCnt: 10, ansCnt: 2 }
            ]
        ],
        ["2020/a/pm1",
            [
                { qsCnt: 6, ansCnt: 2 },
                { qsCnt: 6, ansCnt: 2 },
                { qsCnt: 6, ansCnt: 2 }
            ]
        ],
        ["2020/a/pm2",
            [
                { qsCnt: 12, ansCnt: 2 },
                { qsCnt: 11, ansCnt: 2 }
            ]
        ],
        ["2019/a/pm1",
            [
                { qsCnt: 6, ansCnt: 2 },
                { qsCnt: 6, ansCnt: 2 },
                { qsCnt: 6, ansCnt: 2 }
            ]
        ],
        ["2019/a/pm2",
            [
                { qsCnt: 11, ansCnt: 2 },
                { qsCnt: 13, ansCnt: 3 }
            ]
        ]
    ]);

    const sel = path;
    const qsInfo = qsInfos.get(sel);

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