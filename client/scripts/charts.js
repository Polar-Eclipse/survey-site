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

    function Start()
    {
        let surveyQuestion = document.getElementsByClassName('chartCanvas');

        for (let i = 1; i <  surveyQuestion.length + 1; i++)
        {
            let option = document.getElementById(`question${i}Canvas`).getContext('2d');
            let qTrue = document.getElementById(`question${i}True`).innerText;
            let qFalse = document.getElementById(`question${i}False`).innerText;
            chartDraw(option, qTrue, qFalse);
        }
    }

    window.addEventListener('load', Start);

})();

