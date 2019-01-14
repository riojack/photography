function stator(nextState) {
  this.state = Object.assign({}, this.state, nextState);
  return this.state;
}

function statorWithReset(nextState, reset) {
  if (!this.state) {
    this.originalState = Object.assign({}, nextState);
  }

  if (reset) {
    this.state = Object.assign({}, this.originalState, nextState);
  } else {
    this.state = Object.assign({}, this.state, nextState);
  }

  return this.state;
}

export { stator, statorWithReset };
