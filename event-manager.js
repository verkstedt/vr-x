/* global AFRAME */
AFRAME.registerComponent('event-manager', {

  init: function () {
    this.bindMethods();

    this.questionEl = this.el.querySelector('[data-question]');
    this.questionEl.addEventListener('click', this.onQuestion);

    this.answersEl = this.el.querySelector('[data-answers]');
    this.answerEls = this.el.querySelectorAll('[data-answer]');
    Array.from(this.answerEls).forEach((answerEl) => {
      answerEl.addEventListener('click', this.onAnswer);
    });
  },

  bindMethods: function () {
    this.onQuestion = this.onQuestion.bind(this);
    this.onAnswer = this.onAnswer.bind(this);
  },

  onQuestion: function (event) {
    const targetEl = event.target;
    const wasPressed = targetEl.is('pressed');
    this.answersEl.setAttribute('visible', !wasPressed);
    if (wasPressed) {
      targetEl.removeState('pressed');
    } else {
      targetEl.addState('pressed');
    }
  },

  onAnswer: function (event) {
    if (this.answersEl.getAttribute('visible') !== false) {
      const targetEl = event.target;
      console.log('ANSWER:', targetEl.getAttribute('button').label);
      const isCorrect = targetEl.getAttribute('data-answer') === 'correct';
      targetEl.setAttribute('button', 'activeColour', isCorrect ? 'green' : 'red');
      const wasPressed = targetEl.is('pressed');
      if (wasPressed) {
        targetEl.removeState('pressed');
      } else {
        targetEl.addState('pressed');
      }
    }
  }
});
