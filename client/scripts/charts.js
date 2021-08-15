/**
 * client/scripts/charts.js
 *
 * Client-side script to draw the results charts
 *
 * Polar Survey
 * @author Aun Raza (301074590)
 * @author Jamee Kim (301058465)
 * @author Jerome Ching (300817930)
 * @author Sophie Xu (301098127)
 * @author Tien Sang Nguyen (301028223)
 * @author Eunju Jo (301170731)
 */

"use strict";
(function() {
    function disapear () {
        let disaparingLable = document.getElementById("disapearingText");
        disaparingLable.hidden = false;
        setTimeout(disaparingLable.hidden = true, 4000);
    }

    function chartDraw(option, tr, fl) {
        let chart1 = new Chart(option, {
            type: "pie",
            data: {
                labels: ["True", "False"],
                datasets: [{
                    label: "Question 1",
                    data: [tr, fl],
                    backgroundColor: ["gray", "black"],
                    borderWidth: 3,
                    borderColor: "green",
                    hoverBorderWidth: 10,
                    hoverBorderColor: "black",
                }],
            },
            options: {},
        });
    }

    function chart2Draw(option, A, B, C, D) {
        let chart2 = new Chart(option, {
            type: "pie",
            data: {
                labels: ["A", "B", "C", "D"],
                datasets: [{
                    label: "Question 1",
                    data: [A, B, C, D],
                    backgroundColor: ["gray", "black", "skyblue", "slateblue"],
                    borderWidth: 3,
                    borderColor: "green",
                    hoverBorderWidth: 10,
                    hoverBorderColor: "black",
                }],
            },
            options: {},
        });
    }

    function Start() {
        disapear();

        if (document.getElementById("question1True")) {
            let surveyQuestion = document.getElementsByClassName("chartCanvas");

            for (let i = 1; i <  surveyQuestion.length + 1; i++) {
                let option = document.getElementById(`question${i}Canvas`).getContext("2d");
                let qTrue = document.getElementById(`question${i}True`).innerText;
                let qFalse = document.getElementById(`question${i}False`).innerText;
                chartDraw(option, qTrue, qFalse);
            }
        } else {
            let surveyQuestion = document.getElementsByClassName("chartCanvas");

            for (let i = 1; i <  surveyQuestion.length + 1; i++) {
                let option = document.getElementById(`question${i}Canvas`).getContext("2d");
                let qA = document.getElementById(`question${i}A`).innerText;
                let qB = document.getElementById(`question${i}B`).innerText;
                let qC = document.getElementById(`question${i}C`).innerText;
                let qD = document.getElementById(`question${i}D`).innerText;
                chart2Draw(option, qA, qB, qC, qD);
            }
        }
    }

    window.addEventListener("load", Start);
})();
