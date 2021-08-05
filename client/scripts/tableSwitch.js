"use strict";
(function () {

    let tfForm = document.getElementById("TrueFalse");
    let mcForm = document.getElementById("MultipleChoice");
    let TableSwitcher = document.getElementById("TableSwitcher");
    let h2Title = document.getElementById("h2Title");
    let MCCreatorForm = document.getElementById("MCCreatorForm");
    let TFCreatorForm = document.getElementById("TFCreatorForm");


    function SwitchTables()
    {
        if( mcForm.checked)
        {
            MCCreatorForm.hidden = false;
            TFCreatorForm.hidden = true;
            h2Title.innerText = "Multiple Choice";

        } else if (tfForm.checked)
        {
            MCCreatorForm.hidden = true;
            TFCreatorForm.hidden = false;
            h2Title.innerText = "True Or False"
        }

    }

    function Start()
    {
        console.log("Start Works");
        TableSwitcher.addEventListener('click', SwitchTables);
        //surveyType.addEventListener("click", SwitchTables);
    }

    window.addEventListener("load", Start);
})();
