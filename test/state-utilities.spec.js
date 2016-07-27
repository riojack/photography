import {expect} from 'chai';
import Chance from 'chance';

import {stator, statorWithReset} from '../src/state-utilities';

describe('State utilities Tests', () => {
  let chance,
    state,
    statorImpl,
    statorWithResetImpl;

  beforeEach('set up', () => {
    chance = new Chance();
    state = {propertyA: chance.word()};

    statorImpl = stator.bind({state: state});
    statorWithResetImpl = statorWithReset.bind({state: false});
  });

  describe('basic stators', () => {
    it('should return the state that the stator implementation was initially bound to', () => {
      expect(statorImpl()).to.eql(state);
    });

    it('should merge the next state with the current state and return the updated state', () => {
      let nextState = {propertyB: chance.word()},
        expectedState = Object.assign({}, state, nextState);

      expect(statorImpl(nextState)).to.eql(expectedState);
    });
  });

  describe('stators with reset', () => {
    it('should progressively merge the next state into the last when not resetting', () => {
      let oneState = {propertyB: chance.word()},
        twoState = {propertyC: chance.word()},
        threeState = {propertyA: chance.word()},
        expectedFinalState = Object.assign({}, oneState, twoState, threeState);

      statorWithResetImpl(state);
      statorWithResetImpl(oneState);
      statorWithResetImpl(twoState);
      statorWithResetImpl(threeState);

      expect(statorWithResetImpl()).to.eql(expectedFinalState);
    });

    it('should reset back to the first state given when resetting with an empty next state', () => {
      let oneState = {propertyB: chance.word()};
      statorWithResetImpl(state);
      statorWithResetImpl(oneState);

      expect(statorWithResetImpl({}, true)).to.eql(state);
    });

    it('should reset back to the first state merged with the next state when resetting', () => {
      let oneState = {propertyB: chance.word()},
        twoState = {propertyC: chance.word()},
        expectedFinalState = Object.assign({}, state, twoState);
      statorWithResetImpl(state);
      statorWithResetImpl(oneState);

      expect(statorWithResetImpl(twoState, true)).to.eql(expectedFinalState);
    });
  });
});
