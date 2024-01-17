/* global AFRAME */
AFRAME.registerComponent('event-manager', {
  init: function () {
    this.answered = false;

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
    if (!this.answered) {
      const targetEl = event.target;
      const wasPressed = targetEl.is('pressed');
      this.answersEl.setAttribute('visible', !wasPressed);
      if (wasPressed) {
        targetEl.removeState('pressed');
      } else {
        targetEl.addState('pressed');
      }
    }
  },

  onAnswer: function (event) {
    if (
      !this.answered &&
      this.answersEl.getAttribute('visible') !== false
    ) {
      const targetEl = event.target;
      const isCorrect = targetEl.getAttribute('data-answer') === 'correct';
      console.log('ANSWER:', targetEl.getAttribute('button').label, { isCorrect });

      Array.from(this.answerEls).forEach((answerEl) => {
        if (answerEl === targetEl) {
          answerEl.setAttribute('button', 'activeColour', isCorrect ? 'green' : 'red');
          answerEl.addState('pressed');
        } else {
          const answerIsCorrect = answerEl.getAttribute('data-answer') === 'correct';
          answerEl.setAttribute('button', 'inactiveColour', answerIsCorrect ? 'green' : 'gray');
          answerEl.addState('pressed');
          answerEl.removeState('pressed');
        }
      });

      this.questionEl.setAttribute('button', 'activeColour', isCorrect ? 'green' : 'red');
      this.questionEl.removeState('pressed');
      this.questionEl.addState('pressed');

      this.answered = true;
    }
  }
});
