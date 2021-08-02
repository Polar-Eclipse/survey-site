"use strict";
(function(){


    function chart1Draw(){
        let option1 = document.getElementById('question1Canvas').getContext('2d');
        let q1True = document.getElementById("question1True").innerText;
        let q1False = document.getElementById("question1False").innerText;

        //Global Options
        //Chart.defaults.global.font.size = 12;

        let chart1 = new Chart(option1, {
            type: 'pie',
            data:{
                labels:['True', 'False'],
                datasets:[{
                    label: 'Question 1',
                    data: [q1True, q1False],
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

    function chart2Draw(){
        let option1 = document.getElementById('question2Canvas').getContext('2d');
        let q1True = document.getElementById("question2True").innerText;
        let q1False = document.getElementById("question2False").innerText;

        //Global Options
        //Chart.defaults.global.font.size = 12;

        let chart1 = new Chart(option1, {
            type: 'pie',
            data:{
                labels:['True', 'False'],
                datasets:[{
                    label: 'Question 1',
                    data: [q1True, q1False],
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
    function chart3Draw(){
        let option1 = document.getElementById('question3Canvas').getContext('2d');
        let q1True = document.getElementById("question3True").innerText;
        let q1False = document.getElementById("question3False").innerText;

        //Global Options
        //Chart.defaults.global.font.size = 12;

        let chart1 = new Chart(option1, {
            type: 'pie',
            data:{
                labels:['True', 'False'],
                datasets:[{
                    label: 'Question 1',
                    data: [q1True, q1False],
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
    function chart4Draw(){
        let option1 = document.getElementById('question4Canvas').getContext('2d');
        let q1True = document.getElementById("question4True").innerText;
        let q1False = document.getElementById("question4False").innerText;

        //Global Options
        //Chart.defaults.global.font.size = 12;

        let chart1 = new Chart(option1, {
            type: 'pie',
            data:{
                labels:['True', 'False'],
                datasets:[{
                    label: 'Question 1',
                    data: [q1True, q1False],
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
    function chart5Draw(){
        let option1 = document.getElementById('question5Canvas').getContext('2d');
        let q1True = document.getElementById("question5True").innerText;
        let q1False = document.getElementById("question5False").innerText;

        //Global Options
        //Chart.defaults.global.font.size = 12;

        let chart1 = new Chart(option1, {
            type: 'pie',
            data:{
                labels:['True', 'False'],
                datasets:[{
                    label: 'Question 1',
                    data: [q1True, q1False],
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
        chart1Draw();
        chart2Draw();
        chart3Draw();
        chart4Draw();
        chart5Draw();
    }

    window.addEventListener('load', Start);

})();

