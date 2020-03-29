// JavaScript source code

let resetBtn = document.getElementById("resetBtn"),
    delBtn = document.getElementById("delBtn"),
    scores = JSON.parse(localStorage.getItem("scores") || "[]"),
    scoreList = document.getElementById("listOfScores");

scores.sort(function (a, b) {
    return b.score - a.score;
})

for (let s = 0; s < scores.length; s++) {
    let createLi = document.createElement("li");
    createLi.textContent = scores[s].name + " : " + scores[s].score;
    scoreList.appendChild(createLi);
}

delBtn.addEventListener("click", function () {
    localStorage.clear();
});

resetBtn.addEventListener("click", function () {
    window.location.href = './index.html';
});