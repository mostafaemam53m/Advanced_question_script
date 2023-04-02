///global variables

const category_1 = document.querySelector("#category");
const app_info = document.querySelector(".app-info");
const count_of_questions = document.querySelector(".count span");
const difficulty_1 = document.querySelector(".difficulty select");
const bullets = document.querySelector(".bullets .spans");
let question_area = document.querySelector(".question-area");
let answers_area = document.querySelector(".answer-area");
let submit = document.getElementsByName("submit")[0];
// let the_shosen_answer = document.querySelector("input[checked='true']");
let index = 0; //this index is increase with +1 when press on submit answer button
let numbers_of_correct_ans = 0;
let numbers_of_worng_ans = 0;

// varibles of fech api function 
let url = `https://quizapi.io/api/v1/questions?`;
let api_key = "DFCMvsiNrsx7mxsb1JCTyRF7eHyaPIBMVV3c0jeW";
let category = "linux";
let difficulty = "Easy";
let n_of_questions = "20"

app_info.addEventListener("change", () => {

    const select_of_count = document.querySelector("#count_of_questions");
    // to remove current question and current answers and bullets spans
    // when change any thing in category, Difficulty or  number of questions and and new data

    question_area.innerHTML = "";
    answers_area.innerHTML = "";
    bullets.innerHTML = "";
    category = category_1.value;
    difficulty = difficulty_1.value;
    n_of_questions = select_of_count.value;
    console.log(category);
    console.log(difficulty);
    console.log(n_of_questions);


    get_data(url, api_key, category, difficulty, n_of_questions).then((object_data) => {
        // console.log(object_data);
        generat_span(object_data);
        //function to creat questions and answers
        add_Q_and_Ans(object_data, object_data.length);
        // console.log(object_data[0].correct_answers)
        // to get next question and next answers when press on submit
        get_next_Q(object_data, object_data.length);
    }).catch((r) => {
        console.log(Error("sorry there is worng with api connection"));
    })
})


//function to generate span of bullets
function generat_span(object_data) {




    for (let i = 0; i < object_data.length; i++) {

        let span = document.createElement("span");
        // check if it is frist span S
        if (i == 0) {
            span.className = "mark";


        }
        bullets.appendChild(span);

    }
    console.log(document.getElementsByClassName(".spans span").length);

}



//fech api function
async function get_data(url = "", api_key, Category, Difficulty, n_of_questions) {
    let all_api = `${url}apiKey=${api_key}&category=${Category}&difficulty=${Difficulty}&limit=${n_of_questions}`
    let myrequest = await fetch(all_api);
    let result = myrequest.json();


    return result;

};




///////////// functions area /////////

//function to generat number of questions
number_of_questions();

function number_of_questions() {
    let select = document.createElement("select");
    select.id = "count_of_questions";
    for (let i = 5; i <= 20; i++) {
        let option = document.createElement("option");
        option.value = `${i}`;
        option.innerHTML = `${i}`;
        select.appendChild(option);
    }

    count_of_questions.appendChild(select);

}
/// add quesion and answers

function add_Q_and_Ans(obj, objlength) {

    // if (index < objlength) {


    // }
    console.log(obj);
    console.log(`the index is = ${index} an the length is ${objlength}`);
    // console.log(objlength);
    // get question from object and append it it h2
    let questions = document.createElement("h2");
    questions.innerHTML = obj[index].question;
    question_area.appendChild(questions);
    // get answers from objectand put it in html

    // get answers length
    let answers_key = Object.keys(obj[index].answers);
    // console.log(Object.keys(obj[index].answers));

    let answers_value = Object.values(obj[index].answers);
    // console.log(answers_value[i]);

    // to get correct answers
    // compar_chosen_ans(index, object);


    // to add answers
    for (let i = 0; i < answers_key.length; i++) {
        // console.log(answers_value[i]);
        if (typeof(answers_value[i]) !== typeof(null)) {



            let answer = document.createElement("div");
            answer.className = "answer";
            let input = document.createElement("input");
            // type + name +id + dataset
            input.setAttribute("type", "radio");
            input.setAttribute("name", "questions");
            input.setAttribute("id", `${i}_answer`);
            input.dataset.answer = answers_value[i];
            answer.appendChild(input);
            // console.log(answers_key[i])

            // creat lables
            let label = document.createElement("label");
            label.setAttribute("for", `${i}_answer`);
            label.innerHTML = answers_value[i];
            answer.appendChild(label);
            // put all div in ansers area
            answers_area.appendChild(answer);
            // if (i == 0) {
            //     input.setAttribute("checked", "true");
            // }
            /////////////////////////////////////////////// to get the chosen answers
            let all_inputs = document.getElementsByName("questions");
            if (all_inputs[i].hasAttribute("checked")) {
                // console.log("befor the chosen ans");
                // console.log(i);
                // console.log(all_inputs[i].dataset.answer);
                // the_shosen_answer = all_inputs[i].dataset.answer;
                // console(`the chosen answers is ${the_shosen_answer}`);
            }


        }


    }
}
// function to get next question and next answers 
function get_next_Q(obj, objlength) {
    submit.addEventListener("click", () => {
        ++index

        question_area.innerHTML = "";
        answers_area.innerHTML = "";

        if (index >= objlength) {
            // at end of question
            console.log("the end of question and the result is ");

        }
        if (index < objlength) {

            add_Q_and_Ans(obj, objlength);

            console.log(`value of index is ${index}`);
            let points = document.querySelectorAll(".bullets .spans span");

            let arry_of_points = Array.from(points);
            // console.log(points);
            arry_of_points.forEach((ele, current_index) => {
                // console.log(current_index);
                // console.log(index);

                if (current_index === index) {
                    console.log(ele);
                    ele.className = "mark";
                }


            });
            // to get correct answers
            compar_chosen_ans(index, obj);
        }
        // function  to get numbers of correct and number of worng answers

        // the_correct_and_worng_ans(obj);


    })
}

// function to compare answers and get number of correct ansers and numbers of worng answers

function compar_chosen_ans(index, object) {


    // function to geto add answerst the correct answer
    let the_correct_ans_key = Object.values(object[index].correct_answer);
    let the_correct_ans_value = object[index].answers[the_correct_ans_key.join("")];
    let chosen_answers = "";

    console.log("the correct answers key  " + the_correct_ans_key.join(""));
    console.log("the correct answers is  " + the_correct_ans_value);
    document.getElementsByName("questions").forEach((radio) => {
        if (radio.checked = true) {
            // console.log(radio.attributes[3].nodeValue);
            chosen_answers = radio.attributes['data-answer'].value;
            console.log("the chosen answers is " + chosen_answers);

            if (the_correct_ans_value == chosen_answers) {
                ++numbers_of_correct_ans;
                console.log("is correct is " + numbers_of_correct_ans);
            } else {
                ++numbers_of_worng_ans;

                console.log("is not correct is " + numbers_of_worng_ans);

            }

        }


    });





}