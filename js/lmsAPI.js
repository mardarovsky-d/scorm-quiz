'use strict';

const scorm = pipwerks.SCORM;
let lmsConnected;

function handleError(msg){
    alert(msg);
    //window.close();
}

function initCourse(){
    lmsConnected = scorm.init();
    if (lmsConnected) {
        const completionStatus = scorm.get("cmi.completion_status");
        const successStatus = scorm.get("cmi.success_status");
        completionStatus === "completed" && successStatus === "passed" ?
            handleError("Вы уже прошли этот курс.") :
            handleError("Ошибка: Курс не может связаться с LMS");
    }
}

function setComplete(){
    if (lmsConnected) {
        // All these parameters are needed for SCORM 2004 compliant LMS
        let scaled = scorm.set("cmi.score.scaled", result / maximum * 100);
        let min = scorm.set("cmi.score.min", "0");
        let max = scorm.set("cmi.score.max", maximum);
        let raw = scorm.set("cmi.score.raw", result);
        let completion = scorm.set("cmi.completion_status", "completed");
        let success;

        result >= minimum ?
            success = scorm.set("cmi.success_status", "passed") :
            success = scorm.set("cmi.success_status", "failed");

        // If the course was successfully set to "completed"...
        completion ?
            scorm.quit() :
            handleError("Ошибка: Курс не может быть отмечен как пройденный!");

    } else {
        handleError("Ошибка: Курс не подключён к LMS");
    }
}

function initFinishButton() {
    let completeButton = document.getElementById("complete-button");
    completeButton.addEventListener('click', function onClick(e) {
        e.preventDefault();
        setComplete();
        completeButton.removeEventListener('click', onClick);
        window.close();
    });
}

window.onload = function () {
    initCourse();
    initFinishButton();
}
