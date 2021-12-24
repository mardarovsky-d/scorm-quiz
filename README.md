# HTML&JS SCORM 2004 Compliant Quiz
This example represents SCORM-compliant question set (aka quiz) and was made with Bootstrap 5 and Vanilla JS.

You may use it as a blueprint for your projects. If you like the result you may give it a star :)
#USAGE
For testing purposes just download all files and add to archive (.zip). Then upload zip-file to any SCORM2004-compliant LMS (such as iSpring Learn, Learndash, Skillcast, Docebo etc.). Quiz was successfully tested on SCORM Cloud.

#Editing
All html markup is situated in index.html file. CSS folder contains only Bootstrap css files.

All quiz logic is located in ./js/quiz.js. Example texts in question, answers and feedback are in Russian (sorry, folks, I'll make English translation a bit later).

Variable 'questions' is an array. Each element is an object with question, answers, correct answer and score. You may change texts as you wish, remove some questions or add them from external file.

SCORM_API_wrapper.js is pipwerks SCORM Wrapper for JavaScript created by Philip Hutchison, January 2008-2018.

