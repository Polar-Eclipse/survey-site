/**
 * client/scripts/tableSwitch.js
 *
 * Client-side script to switch between T/F and MC surveys
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
(function () {
    let tfForm = document.getElementById("TrueFalse");
    let mcForm = document.getElementById("MultipleChoice");
    let TableSwitcher = document.getElementById("TableSwitcher");
    let h2Title = document.getElementById("h2Title");
    let MCCreatorForm = document.getElementById("MCCreatorForm");
    let TFCreatorForm = document.getElementById("TFCreatorForm");

    /**
     * Show the appropriate form element based on which one is selected
     */
    function SwitchTables() {
        if (mcForm.checked) {
            MCCreatorForm.hidden = false;
            TFCreatorForm.hidden = true;
            h2Title.innerText = "Multiple Choice";
        } else if (tfForm.checked) {
            MCCreatorForm.hidden = true;
            TFCreatorForm.hidden = false;
            h2Title.innerText = "True Or False";
        }
    }

    function Start() {
        console.log("Start Works");
        TableSwitcher.addEventListener("click", SwitchTables);
    }

    window.addEventListener("load", Start);
})();
