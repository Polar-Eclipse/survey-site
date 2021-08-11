"use strict";
(function(){


    function chartDraw(option, tr, fl){

        let chart1 = new Chart(option, {
            type: 'pie',
            data:{
                labels:['True', 'False'],
                datasets:[{
                    label: 'Question 1',
                    data: [tr, fl],
                    backgroundColor: ['gray', 'black'],
                    borderWidth: 3,
                    borderColor: 'green',
                    hoverBorderWidth: 10,
                    hoverBorderColor: 'black'
                }],
            },
            options:{}
        });
    }

    function chart2Draw(option, A, B, C, D){

        let chart2 = new Chart(option, {
            type: 'pie',
            data:{
                labels:['A','B','C','D'],
                datasets:[{
                    label: 'Question 1',
                    data: [A, B, C, D],
                    backgroundColor: ['gray', 'black'],
                    borderWidth: 3,
                    borderColor: 'green',
                    hoverBorderWidth: 10,
                    hoverBorderColor: 'black'
                }],
            },
            options:{}
        });
    }

    function Start(){
        if (document.getElementById(`question${i}True`).innerText != null) {
            let surveyQuestion = document.getElementsByClassName('chartCanvas');

            for (let i = 1; i <  surveyQuestion.length + 1; i++)
            {
                let option = document.getElementById(`question${i}Canvas`).getContext('2d');
                let qTrue = document.getElementById(`question${i}True`).innerText;
                let qFalse = document.getElementById(`question${i}False`).innerText;
                chartDraw(option, qTrue, qFalse);
            }
        }
        else {
            let surveyQuestion = document.getElementsByClassName('chartCanvas');
    
            for (let i = 1; i <  surveyQuestion.length + 1; i++)
            {
                let option = document.getElementById(`question${i}Canvas`).getContext('2d');
                let qA = document.getElementById(`question${i}A`).innerText;
                let qB = document.getElementById(`question${i}B`).innerText;
                let qC = document.getElementById(`question${i}C`).innerText;
                let qD = document.getElementById(`question${i}D`).innerText;
                chart2Draw(option, qA, qB, qC, qD);
            }
        }

    }

    window.addEventListener('load', Start);

})();

