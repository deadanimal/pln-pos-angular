import { createReducer, on, ActionReducer, INIT, UPDATE } from '@ngrx/store';
import { addCheckoutState, clearCheckoutState } from 'src/app/checkout-state-store/action';
import { CheckoutState } from 'src/app/checkout-state-store/model';
import { initialState } from 'src/app/checkout-state-store/state';

export const checkoutReducer = createReducer(
  initialState,

  on(addCheckoutState, (entries, next_state) => {
    const entriesClone: CheckoutState[] = JSON.parse(JSON.stringify(entries));
    entriesClone.push(next_state);
    return entriesClone;
  }),

  on(clearCheckoutState, _ => [] ),

)

export const metaReducerLocalStorage = (reducer: ActionReducer<any>): ActionReducer<any> => {
  return (state, action) => {
    if (action.type === INIT || action.type == UPDATE) {
      const storageValue = localStorage.getItem("state");
      if (storageValue) {
        try {
          return JSON.parse(storageValue);
        } catch {
          localStorage.removeItem("state");
        }
      }
    }
    const nextState = reducer(state, action);
    localStorage.setItem("state", JSON.stringify(nextState));
    return nextState;
  };
};
