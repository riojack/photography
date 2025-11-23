import { expect } from 'chai';

import { stator, statorWithReset } from '../src/state-utilities';

describe('State utilities Tests', () => {
  let state;
  let statorImpl;
  let statorWithResetImpl;

  beforeEach('set up', () => {
    state = { propertyA: 'valueA' };

    statorImpl = stator.bind({ state });
    statorWithResetImpl = statorWithReset.bind({ state: false });
  });

  describe('basic stators', () => {
    it('should return the state that the stator implementation was initially bound to', () => {
      expect(statorImpl()).to.eql(state);
    });

    it('should merge the next state with the current state and return the updated state', () => {
      const nextState = { propertyB: 'valueB' };
      const expectedState = Object.assign({}, state, nextState);

      expect(statorImpl(nextState)).to.eql(expectedState);
    });
  });

  describe('stators with reset', () => {
    it('should progressively merge the next state into the last when not resetting', () => {
      const oneState = { propertyB: 'valueB' };
      const twoState = { propertyC: 'valueC' };
      const threeState = { propertyA: 'newValueA' };

      const expectedFinalState = Object.assign({}, oneState, twoState, threeState);

      statorWithResetImpl(state);
      statorWithResetImpl(oneState);
      statorWithResetImpl(twoState);
      statorWithResetImpl(threeState);

      expect(statorWithResetImpl()).to.eql(expectedFinalState);
    });

    it('should reset back to the first state given when resetting with an empty next state', () => {
      const oneState = { propertyB: 'valueB' };
      statorWithResetImpl(state);
      statorWithResetImpl(oneState);

      expect(statorWithResetImpl({}, true)).to.eql(state);
    });

    it('should reset back to the first state merged with the next state when resetting', () => {
      const oneState = { propertyB: 'valueB' };
      const twoState = { propertyC: 'valueC' };

      const expectedFinalState = Object.assign({}, state, twoState);
      statorWithResetImpl(state);
      statorWithResetImpl(oneState);

      expect(statorWithResetImpl(twoState, true)).to.eql(expectedFinalState);
    });
  });
});
