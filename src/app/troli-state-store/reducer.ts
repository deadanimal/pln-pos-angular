import { createReducer, on, ActionReducer, INIT, UPDATE } from '@ngrx/store';
import { addTroliState, clearTroliState } from 'src/app/troli-state-store/action';
import { TroliState } from 'src/app/troli-state-store/model';
import { initialState } from 'src/app/troli-state-store/state';

export const troliReducer = createReducer(
  initialState,

  on(addTroliState, (entries, next_state) => {
    const entriesClone: TroliState[] = JSON.parse(JSON.stringify(entries));
    entriesClone.push(next_state);
    return entriesClone;
  }),

  on(clearTroliState, _ => [] ),

)

export const metaReducerLocalStorageTroli = (reducer: ActionReducer<any>): ActionReducer<any> => {
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
