/* global AFRAME */
AFRAME.registerComponent('button', {
  schema: {
    label: {default: 'label'},
    width: {default: 1},
    height: {default: 0.5},
    toggable: {default: true},
    inactiveColour: {default: '#3a50c5'},
    activeColour: {default: 'green'}
  },
  init: function () {
    var el = this.el;
    var labelEl = this.labelEl = document.createElement('a-entity');

    this.color = this.data.inactiveColour;
    el.setAttribute('geometry', {
      primitive: 'box',
      width: this.data.width,
      height: this.data.height,
      depth: 0.04
    });

    el.setAttribute('material', {color: this.data.inactiveColour});
    el.setAttribute('pressable', '');

    labelEl.setAttribute('position', '0 0 0.02');
    labelEl.setAttribute('text', {
      value: this.data.label,
      color: 'white',
      align: 'center',
      wrapCount: 20 / this.data.width,
    });

    labelEl.setAttribute('scale', '0.75 0.75 0.75');
    this.el.appendChild(labelEl);

    this.bindMethods();
    this.el.addEventListener('stateadded', this.stateChanged);
    this.el.addEventListener('stateremoved', this.stateChanged);
    this.el.addEventListener('pressedstarted', this.onPressedStarted);
    this.el.addEventListener('pressedended', this.onPressedEnded);
  },

  bindMethods: function () {
    this.stateChanged = this.stateChanged.bind(this);
    this.onPressedStarted = this.onPressedStarted.bind(this);
    this.onPressedEnded = this.onPressedEnded.bind(this);
  },

  update: function (oldData) {
    if (oldData.label !== this.data.label) {
      this.labelEl.setAttribute('text', 'value', this.data.label);
    }
  },

  stateChanged: function () {
    var color = this.el.is('pressed') ? this.data.activeColour : this.data.inactiveColour;
    this.el.setAttribute('material', {color: color});
  },

  onPressedStarted: function () {
    var el = this.el;
    el.setAttribute('material', {color: this.data.activeColour});
    el.emit('click');
    if (this.data.togabble) {
      if (el.is('pressed')) {
        el.removeState('pressed');
      } else {
        el.addState('pressed');
      }
    }
  },

  onPressedEnded: function () {
    if (this.el.is('pressed')) { return; }
    this.el.setAttribute('material', {color: this.data.inactiveColour});
  }
});
