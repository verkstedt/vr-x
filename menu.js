/* global AFRAME */
import { fetchQuestionsFromOpentdb } from "./fetchQuestionsFromOpentdb.js";
AFRAME.registerComponent("menu", {
  init: async function () {
    // var data = {
    //   question: "In the server hosting industry IaaS stands for ... ?",
    //   answers: [
    //     {
    //       text: "Infrastructure as a Service",
    //       value: true,
    //     },
    //     {
    //       text: "Internet as a Service",
    //       value: false,
    //     },
    //     {
    //       text: "Infrastructure and a Server",
    //       value: false,
    //     },
    //     {
    //       text: "Infrastructure as a Server",
    //       value: false,
    //     },
    //   ],
    // };
    var data = (await fetchQuestionsFromOpentdb())[0]; // Array
    console.log(data);
    var answers = [];
    answers.push(data.correct_answer);
    answers.push(...data.incorrect_answers);

    answers.sort(() => Math.random() - 0.5);

    var el = this.el;

    this.questionEl = this.el.querySelector("[data-question]");
    this.questionEl.setAttribute("button", {
      label: data.question,
      width: 0.5,
      height: 0.1,
    });

    this.answersEl = this.questionEl.querySelector("[data-answers]");
    this.answerEls = this.el.querySelectorAll("[data-answer]");
    var k = 0;
    Array.from(this.answerEls).forEach((answerEl) => {
      answerEl.setAttribute("button", {
        label: answers[k],
        width: 0.5,
        height: 0.1,
      });
      answerEl.setAttribute(
        "data-answer",
        answers[k] === data.correct_answer ? "correct" : "incorrect"
      );
      k++;
    });
    var menuBackGroundEl = document.createElement("a-entity");
    menuBackGroundEl.setAttribute("geometry", {
      primitive: "box",
      width: 0.6,
      height: 0.4,
      depth: 0.01,
    });
    menuBackGroundEl.setAttribute("material", {
      color: "gray",
    });
    menuBackGroundEl.setAttribute("position", "0 0 -0.025");
    el.appendChild(menuBackGroundEl);
  },
});
