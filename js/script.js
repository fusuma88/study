const year = document.querySelector('#year');
const season = document.querySelector('#season');
const time = document.querySelector('#time');
const btn = document.querySelector('#btn');

// Examination Category Changeing.
const createCategory = () => {

    const fourExam = `
            <option value="am1">午前１</option>
            <option value="am2">午前２</option>
            <option value="pm1">午後１</option>
            <option value="pm2">午後２</option>
    `;// before spring 2023.

    const threeExam = `
            <option value="am1">午前１</option>
            <option value="am2">午前２</option>
            <option value="pm">午後</option>
    `;// after automn 2023.

    if (Number(year.value) < 2023) {
        time.innerHTML = fourExam;
    } else if (Number(year.value) === 2023) {
        if (season.value === 'h') {
            time.innerHTML = fourExam;
        } else {
            time.innerHTML = threeExam;
        }
    } else {
        time.innerHTML = threeExam;
    }
};

year.addEventListener('change', createCategory);

season.addEventListener('change', createCategory);

btn.addEventListener('click', () => {
    const link = `${year.value}/${season.value}/${time.value}/index.html`;
    window.location.href = link;
});



